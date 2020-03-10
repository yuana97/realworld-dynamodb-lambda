const Util = require('./Util');
const User = require('./User');
const articlesTable = Util.getTableName('articles');
const slugify = require('slugify');

/**
 * @module Article
 */
module.exports = {

  /** Create article */
  // create article handler
  async create(event) {
    // authenticate and get user based off event
    const authenticatedUser = await User.authenticateAndGetUser(event);
    // not authenticated => return error
    if (!authenticatedUser) {
      return Util.envelop('Must be logged in.', 422);
    }
    // get body from request
    const body = JSON.parse(event.body);
    // body doesn't have article => return error
    if (!body.article) {
      return Util.envelop('Article must be specified.', 422);
    }
    // get article from body
    const articleData = body.article;
    // for each expect field of title, desc, body
    for (const expectedField of ['title', 'description', 'body']) {
      // if we have empty field return error
      if (!articleData[expectedField]) {
        return Util.envelop(`${expectedField} must be specified.`, 422);
      }
    }
    // get new date
    const timestamp = (new Date()).getTime();
    // create slug based on title
    const slug = slugify(articleData.title) + '-' +
      (Math.random() * Math.pow(36, 6) | 0).toString(36);
    // create article object with slug, title, desc, body, 
    const article = {
      slug,
      title: articleData.title,
      description: articleData.description,
      body: articleData.body,
      createdAt: timestamp,
      updatedAt: timestamp,
      author: authenticatedUser.username,
      dummy: 'OK',
    };
    // if article has a taglist attach it as a set to article.
    if (articleData.tagList) {
      article.tagList = Util.DocumentClient.createSet(articleData.tagList);
    }
    // put article into ddb table, await return
    await Util.DocumentClient.put({
      TableName: articlesTable,
      Item: article,
    }).promise();
    // delete article dummy, add favorited, favoritesCount, author fields.
    delete article.dummy;
    article.tagList = articleData.tagList || [];
    article.favorited = false;
    article.favoritesCount = 0;
    article.author = {
      username: authenticatedUser.username,
      bio: authenticatedUser.bio || '',
      image: authenticatedUser.image || '',
      following: false,
    };
    // return article
    return Util.envelop({ article });
  },

  /** Get article */
  // article get handler
  async get(event) {
    // get slug from request
    const slug = event.pathParameters.slug;

    /* istanbul ignore if  */
    // no slug => error. envelop error with header, statuscode, return error
    if (!slug) {
      return Util.envelop('Slug must be specified.', 422);
    }
    // get article from articlestable with slug as key. Use documentclient to access ddb table
    const article = (await Util.DocumentClient.get({
      TableName: articlesTable,
      Key: { slug },
    }).promise()).Item;
    // no article => error
    if (!article) {
      return Util.envelop(`Article not found: [${slug}]`, 422);
    }
    // get authenticated user from request
    const authenticatedUser = await User.authenticateAndGetUser(event);
    // 
    return Util.envelop({
      // decorate retrieved article and return with headers, status
      article: await transformRetrievedArticle(article, authenticatedUser)
    });
  },

  /** Update article */
  // update article handler
  async update(event) {
    // get body from request, get mutation from body
    const body = JSON.parse(event.body);
    const articleMutation = body.article;
    // no mutation => error
    if (!articleMutation) {
      return Util.envelop('Article mutation must be specified.', 422);
    }

    // Ensure at least one mutation is requested
    // ensure we have mutation for at least one of title, description or body
    if (!articleMutation.title &&
      !articleMutation.description && !articleMutation.body) {
      return Util.envelop(
        'At least one field must be specified: [title, description, article].',
        422);
    }
    // get authenticated user from request
    const authenticatedUser = await User.authenticateAndGetUser(event);
    if (!authenticatedUser) {
      return Util.envelop('Must be logged in.', 422);
    }
    // get slug from event pathparameters
    const slug = event.pathParameters.slug;

    /* istanbul ignore if  */
    if (!slug) {
      return Util.envelop('Slug must be specified.', 422);
    }
    // get article from ddb based on slug
    const article = (await Util.DocumentClient.get({
      TableName: articlesTable,
      Key: { slug },
    }).promise()).Item;
    // no article => error
    if (!article) {
      return Util.envelop(`Article not found: [${slug}]`, 422);
    }

    // Ensure article is authored by authenticatedUser
    // ensure update request comes from author
    if (article.author !== authenticatedUser.username) {
      return Util.envelop('Article can only be updated by author: ' +
        `[${article.author}]`, 422);
    }

    // Apply mutations to retrieved article
    // for each field, apply mutations
    ['title', 'description', 'body'].forEach(field => {
      if (articleMutation[field]) {
        article[field] = articleMutation[field];
      }
    });
    // put mutated article into table
    await Util.DocumentClient.put({
      TableName: articlesTable,
      Item: article,
    }).promise();
    // get mutated article
    const updatedArticle = (await Util.DocumentClient.get({
      TableName: articlesTable,
      Key: { slug },
    }).promise()).Item;
    // return decorate article with status and headers
    return Util.envelop({
      article: await transformRetrievedArticle(
        updatedArticle, authenticatedUser),
    });
  },

  /** Delete article */
  // delete article
  async delete(event) {
    // authenticate and get user from event
    const authenticatedUser = await User.authenticateAndGetUser(event);
    // no authenticated user => error
    if (!authenticatedUser) {
      return Util.envelop('Must be logged in.', 422);
    }

    // get slug from pathparams
    const slug = event.pathParameters.slug;

    /* istanbul ignore if  */
    // no slug => error
    if (!slug) {
      return Util.envelop('Slug must be specified.', 422);
    }
    // get article from articlestable based on slug with (await documentclient.get(...).promise()).Item
    const article = (await Util.DocumentClient.get({
      TableName: articlesTable,
      Key: { slug },
    }).promise()).Item;
    // no article => error
    if (!article) {
      return Util.envelop(`Article not found: [${slug}]`, 422);
    }

    // Ensure article is authored by authenticatedUser
    // ensure article author is same as deleter, else error
    if (article.author !== authenticatedUser.username) {
      return Util.envelop('Article can only be deleted by author: ' +
        `[${article.author}]`, 422);
    }
    // delete slug from ddb
    await Util.DocumentClient.delete({
      TableName: articlesTable,
      Key: { slug },
    }).promise();

    return Util.envelop({});
  },

  /** Favorite/unfavorite article */
  // fav/unfav article
  async favorite(event) {
    // get authenticated user from event
    const authenticatedUser = await User.authenticateAndGetUser(event);
    if (!authenticatedUser) {
      return Util.envelop('Must be logged in.', 422);
    }

    // get slug from pathparams
    const slug = event.pathParameters.slug;

    /* istanbul ignore if  */
    if (!slug) {
      return Util.envelop('Slug must be specified.', 422);
    }

    // get article keyed by slug
    let article = (await Util.DocumentClient.get({
      TableName: articlesTable,
      Key: { slug },
    }).promise()).Item;
    if (!article) {
      return Util.envelop(`Article not found: [${slug}]`, 422);
    }

    // Set/unset favorite bit and count for article
    // extract if its a favorite or an unfavorite
    const shouldFavorite = !(event.httpMethod === 'DELETE');
    // should favorite => add to favoritedBy
    if (shouldFavorite) {
      /* istanbul ignore next */
      if (!article.favoritedBy) {
        article.favoritedBy = [];
      }
      article.favoritedBy.push(authenticatedUser.username);
      article.favoritesCount = 1;
    } else {
      // unfavorite => remove user from favoritedBy
      article.favoritedBy = article.favoritedBy.filter(
        e => (e !== authenticatedUser.username));
      /* istanbul ignore next */
      if (article.favoritedBy.length === 0) {
        delete article.favoritedBy;
      }
    }
    // set favoritesCount
    article.favoritesCount = article.favoritedBy ?
      article.favoritedBy.length : 0;
    // put updated article in articles table
    await Util.DocumentClient.put({
      TableName: articlesTable,
      Item: article,
    }).promise();

    // get back article, set favorited field, return article
    article = await transformRetrievedArticle(article);
    article.favorited = shouldFavorite;
    return Util.envelop({ article });
  },

  /** List articles */
  // list all articles
  async list(event) {
    // get user from event
    const authenticatedUser = await User.authenticateAndGetUser(event);
    // get qs params, limit, offset
    const params = event.queryStringParameters || {};
    const limit = parseInt(params.limit) || 20;
    const offset = parseInt(params.offset) || 0;
    // too many filter fields => error
    if ((params.tag && params.author) ||
      (params.author && params.favorited) || (params.favorited && params.tag)) {
      return Util.envelop(
        'Only one of these can be specified: [tag, author, favorited]', 422);
    }
    // query builder
    const queryParams = {
      TableName: articlesTable,
      IndexName: 'updatedAt',
      KeyConditionExpression: 'dummy = :dummy',
      ExpressionAttributeValues: {
        ':dummy': 'OK',
      },
      ScanIndexForward: false,
    };
    // add filterexpression and expression attribute values based on filter
    if (params.tag) {
      queryParams.FilterExpression = 'contains(tagList, :tag)';
      queryParams.ExpressionAttributeValues[':tag'] = params.tag;
    } else if (params.author) {
      queryParams.FilterExpression = 'author = :author';
      queryParams.ExpressionAttributeValues[':author'] = params.author;
    } else if (params.favorited) {
      queryParams.FilterExpression = 'contains(favoritedBy, :favorited)';
      queryParams.ExpressionAttributeValues[':favorited'] = params.favorited;
    }
    // query for top LIMIT 
    return Util.envelop({
      articles: await queryEnoughArticles(queryParams, authenticatedUser,
        limit, offset)
    });
  },

  /** Get Articles feed */
  // get articles feed
  async getFeed(event) {
    // get authenticated user from event
    const authenticatedUser = await User.authenticateAndGetUser(event);
    if (!authenticatedUser) {
      return Util.envelop('Must be logged in.', 422);
    }
    // get params from qsParams, limit + offset from params
    const params = event.queryStringParameters || {};
    const limit = parseInt(params.limit) || 20;
    const offset = parseInt(params.offset) || 0;

    // Get followed users
    // get followed users with api call
    const followed = await User.getFollowedUsers(authenticatedUser.username);
    if (!followed.length) {
      return Util.envelop({ articles: [] });
    }

    // ddb query obj
    const queryParams = {
      TableName: articlesTable,
      IndexName: 'updatedAt',
      KeyConditionExpression: 'dummy = :dummy',
      FilterExpression: 'author IN ',
      ExpressionAttributeValues: {
        ':dummy': 'OK',
      },
      ScanIndexForward: false,
    };

    // Query articlesTable to filter only authored by followed users
    // This results in:
    //   FilterExpression:
    //      'author IN (:author0, author1, ...)',
    //   ExpressionAttributeValues:
    //      { ':dummy': 'OK', ':author0': 'authoress-kly3oz', ':author1': ... },
    // put followef authors into query obj
    for (let i = 0; i < followed.length; ++i) {
      queryParams.ExpressionAttributeValues[`:author${i}`] = followed[i];
    }
    // append followed authors to filterexpression
    queryParams.FilterExpression += '(' +
      Object.keys(queryParams.ExpressionAttributeValues)
      .filter(e => e !== ':dummy').join(",") +
      ')';
    console.log(`FilterExpression: [${queryParams.FilterExpression}]`);
    // return article list matching feed params
    return Util.envelop({
      articles: await queryEnoughArticles(queryParams, authenticatedUser,
        limit, offset),
    });
  },

  /** Get list of tags */
  async getTags() {
    const uniqTags = {};

    let lastEvaluatedKey = null;
    do {
      // scan ddb for taglist
      const scanParams = {
        TableName: articlesTable,
        AttributesToGet: ['tagList'],
      };
      /* istanbul ignore next */
      if (lastEvaluatedKey) {
        scanParams.ExclusiveStartKey = lastEvaluatedKey;
      }
      // scan for tags
      const data = await Util.DocumentClient.scan(scanParams).promise();
      // for each taglist for each tag add it to uniqTags
      data.Items.forEach(item => {
        /* istanbul ignore next */
        if (item.tagList && item.tagList.values) {
          item.tagList.values.forEach(tag => uniqTags[tag] = 1);
        }
      });
      lastEvaluatedKey = data.LastEvaluatedKey;
    } while (lastEvaluatedKey);
    // extract tags from uniqtags and return it with headers
    const tags = Object.keys(uniqTags);

    return Util.envelop({ tags });
  },

};

/**
 * Given queryParams, repeatedly call query until we have enough records
 * to satisfy (limit + offset)
 */
// queries for queryParams until we hit limit
async function queryEnoughArticles(queryParams, authenticatedUser,
  limit, offset) {

  // Call query repeatedly, until we have enough records, or there are no more
  // init query result
  const queryResultItems = [];
  // while we still have items to query for
  while (queryResultItems.length < (offset + limit)) {
    // documentclient.query with queryparams and push result.items to queryresult.
    const queryResult = await Util.DocumentClient.query(queryParams)
      .promise();
    queryResultItems.push(...queryResult.Items);
    /* istanbul ignore next */
    // set startkey at lastevaluatedkey for next iteration
    if (queryResult.LastEvaluatedKey) {
      queryParams.ExclusiveStartKey = queryResult.LastEvaluatedKey;
    } else {
      break;
    }
  }

  // Decorate last "limit" number of articles with author data
  // for each result article, decorate it and push to articlePromises
  const articlePromises = [];
  queryResultItems.slice(offset, offset + limit).forEach(a =>
    articlePromises.push(transformRetrievedArticle(a, authenticatedUser)));
  // return articles as a promise
  const articles = await Promise.all(articlePromises);
  return articles;
}

/**
 * Given an article retrieved from table,
 * decorate it with extra information like author, favorite, following etc.
 */
// decorate article object with taglist, favoritesCount, favorites, author
async function transformRetrievedArticle(article, authenticatedUser) {
  delete article.dummy;
  article.tagList = article.tagList ? article.tagList.values : [];
  article.favoritesCount = article.favoritesCount || 0;
  article.favorited = false;
  if (article.favoritedBy && authenticatedUser) {
    article.favorited = article.favoritedBy
      .includes(authenticatedUser.username);
    delete article.favoritedBy;
  }
  article.author = await User.getProfileByUsername(article.author,
    authenticatedUser);
  return article;
}
