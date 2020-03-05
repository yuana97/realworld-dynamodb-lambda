```
DELETE /__TESTUTILS__/purge
```
```
200 OK

"Purged all data!"
```
# Article
```
POST /users

{
  "user": {
    "email": "author--zd653v@email.com",
    "username": "author--zd653v",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "author--zd653v@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF1dGhvci0temQ2NTN2IiwiaWF0IjoxNTgzNDQ4ODk5LCJleHAiOjE1ODM2MjE2OTl9.vx4CcAEY8ZCWZztaZ_cD85ZCI8sP-DLiOMQWp8qnhGE",
    "username": "author--zd653v",
    "bio": "",
    "image": ""
  }
}
```
```
POST /users

{
  "user": {
    "email": "authoress-s94m1g@email.com",
    "username": "authoress-s94m1g",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "authoress-s94m1g@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF1dGhvcmVzcy1zOTRtMWciLCJpYXQiOjE1ODM0NDg4OTksImV4cCI6MTU4MzYyMTY5OX0.LETmw5Wcaww99u9noNlH7W5F28xq7VwRGl8Ffxw_GGk",
    "username": "authoress-s94m1g",
    "bio": "",
    "image": ""
  }
}
```
```
POST /users

{
  "user": {
    "email": "non-author-8qm0vw@email.com",
    "username": "non-author-8qm0vw",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "non-author-8qm0vw@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vbi1hdXRob3ItOHFtMHZ3IiwiaWF0IjoxNTgzNDQ4ODk5LCJleHAiOjE1ODM2MjE2OTl9.f6E-qn1paSMn5h5b5Ioz6Sp8E9WQZD4PkwjJjtcpBNE",
    "username": "non-author-8qm0vw",
    "bio": "",
    "image": ""
  }
}
```
## Create
### should create article
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body"
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-m8xl4o",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448899412,
    "updatedAt": 1583448899412,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
### should create article with tags
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "tag_a",
      "tag_b"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-s99spz",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448899471,
    "updatedAt": 1583448899471,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "tag_a",
      "tag_b"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
### should disallow unauthenticated user
```
POST /articles

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
### should enforce required fields
```
POST /articles

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article must be specified."
    ]
  }
}
```
```
POST /articles

{
  "article": {}
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "title must be specified."
    ]
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "description must be specified."
    ]
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "body must be specified."
    ]
  }
}
```
## Get
### should get article by slug
```
GET /articles/title-m8xl4o
```
```
200 OK

{
  "article": {
    "createdAt": 1583448899412,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "description",
    "title": "title",
    "body": "body",
    "slug": "title-m8xl4o",
    "updatedAt": 1583448899412,
    "tagList": [],
    "favoritesCount": 0,
    "favorited": false
  }
}
```
### should get article with tags by slug
```
GET /articles/title-s99spz
```
```
200 OK

{
  "article": {
    "tagList": [
      "tag_a",
      "tag_b"
    ],
    "createdAt": 1583448899471,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "description",
    "title": "title",
    "body": "body",
    "slug": "title-s99spz",
    "updatedAt": 1583448899471,
    "favoritesCount": 0,
    "favorited": false
  }
}
```
### should disallow unknown slug
```
GET /articles/bxx6ea
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article not found: [bxx6ea]"
    ]
  }
}
```
## Update
### should update article
```
PUT /articles/title-s99spz

{
  "article": {
    "title": "newtitle"
  }
}
```
```
200 OK

{
  "article": {
    "tagList": [
      "tag_a",
      "tag_b"
    ],
    "createdAt": 1583448899471,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "description",
    "title": "newtitle",
    "body": "body",
    "slug": "title-s99spz",
    "updatedAt": 1583448899471,
    "favoritesCount": 0,
    "favorited": false
  }
}
```
```
PUT /articles/title-s99spz

{
  "article": {
    "description": "newdescription"
  }
}
```
```
200 OK

{
  "article": {
    "tagList": [
      "tag_a",
      "tag_b"
    ],
    "createdAt": 1583448899471,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "newdescription",
    "title": "newtitle",
    "body": "body",
    "slug": "title-s99spz",
    "updatedAt": 1583448899471,
    "favoritesCount": 0,
    "favorited": false
  }
}
```
```
PUT /articles/title-s99spz

{
  "article": {
    "body": "newbody"
  }
}
```
```
200 OK

{
  "article": {
    "tagList": [
      "tag_a",
      "tag_b"
    ],
    "createdAt": 1583448899471,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "newdescription",
    "title": "newtitle",
    "body": "newbody",
    "slug": "title-s99spz",
    "updatedAt": 1583448899471,
    "favoritesCount": 0,
    "favorited": false
  }
}
```
### should disallow missing mutation
```
PUT /articles/title-s99spz

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article mutation must be specified."
    ]
  }
}
```
### should disallow empty mutation
```
PUT /articles/title-s99spz

{
  "article": {}
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "At least one field must be specified: [title, description, article]."
    ]
  }
}
```
### should disallow unauthenticated update
```
PUT /articles/title-s99spz

{
  "article": {
    "title": "newtitle"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
### should disallow updating non-existent article
```
PUT /articles/foo-title-s99spz

{
  "article": {
    "title": "newtitle"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article not found: [foo-title-s99spz]"
    ]
  }
}
```
### should disallow non-author from updating
```
PUT /articles/title-s99spz

{
  "article": {
    "title": "newtitle"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article can only be updated by author: [author--zd653v]"
    ]
  }
}
```
## Favorite
### should favorite article
```
POST /articles/title-m8xl4o/favorite

{}
```
```
200 OK

{
  "article": {
    "createdAt": 1583448899412,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "description",
    "title": "title",
    "body": "body",
    "slug": "title-m8xl4o",
    "updatedAt": 1583448899412,
    "favoritedBy": [
      "non-author-8qm0vw"
    ],
    "favoritesCount": 1,
    "tagList": [],
    "favorited": true
  }
}
```
```
GET /articles/title-m8xl4o
```
```
200 OK

{
  "article": {
    "createdAt": 1583448899412,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "description",
    "title": "title",
    "body": "body",
    "favoritesCount": 1,
    "slug": "title-m8xl4o",
    "updatedAt": 1583448899412,
    "tagList": [],
    "favorited": true
  }
}
```
### should disallow favoriting by unauthenticated user
```
POST /articles/title-m8xl4o/favorite

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
### should disallow favoriting unknown article
```
POST /articles/title-m8xl4o_foo/favorite

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article not found: [title-m8xl4o_foo]"
    ]
  }
}
```
### should unfavorite article
```
DELETE /articles/title-m8xl4o/favorite
```
```
200 OK

{
  "article": {
    "createdAt": 1583448899412,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "description",
    "title": "title",
    "body": "body",
    "favoritesCount": 0,
    "slug": "title-m8xl4o",
    "updatedAt": 1583448899412,
    "tagList": [],
    "favorited": false
  }
}
```
## Delete
### should delete article
```
DELETE /articles/title-m8xl4o
```
```
200 OK

{}
```
```
GET /articles/title-m8xl4o
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article not found: [title-m8xl4o]"
    ]
  }
}
```
### should disallow deleting by unauthenticated user
```
DELETE /articles/foo
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
### should disallow deleting unknown article
```
DELETE /articles/foobar
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article not found: [foobar]"
    ]
  }
}
```
### should disallow deleting article by non-author
```
DELETE /articles/title-s99spz
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article can only be deleted by author: [author--zd653v]"
    ]
  }
}
```
## List
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "5m1mtq",
      "tag_0",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-o3y2nq",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900617,
    "updatedAt": 1583448900617,
    "author": {
      "username": "authoress-s94m1g",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "5m1mtq",
      "tag_0",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "9df8tt",
      "tag_1",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-alw1nl",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900657,
    "updatedAt": 1583448900657,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "9df8tt",
      "tag_1",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "6vc8es",
      "tag_2",
      "tag_mod_2_0",
      "tag_mod_3_2"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-4dt2m3",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900683,
    "updatedAt": 1583448900683,
    "author": {
      "username": "authoress-s94m1g",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "6vc8es",
      "tag_2",
      "tag_mod_2_0",
      "tag_mod_3_2"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "-z583od",
      "tag_3",
      "tag_mod_2_1",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-pcuwyl",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900712,
    "updatedAt": 1583448900712,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "-z583od",
      "tag_3",
      "tag_mod_2_1",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "w5l5r",
      "tag_4",
      "tag_mod_2_0",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-te81ar",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900738,
    "updatedAt": 1583448900738,
    "author": {
      "username": "authoress-s94m1g",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "w5l5r",
      "tag_4",
      "tag_mod_2_0",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "ntu8la",
      "tag_5",
      "tag_mod_2_1",
      "tag_mod_3_2"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-3z0mi6",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900761,
    "updatedAt": 1583448900761,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "ntu8la",
      "tag_5",
      "tag_mod_2_1",
      "tag_mod_3_2"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "b43yts",
      "tag_6",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-d1khjm",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900786,
    "updatedAt": 1583448900786,
    "author": {
      "username": "authoress-s94m1g",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "b43yts",
      "tag_6",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "d4gby0",
      "tag_7",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-k011r8",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900809,
    "updatedAt": 1583448900809,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "d4gby0",
      "tag_7",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "pjmszh",
      "tag_8",
      "tag_mod_2_0",
      "tag_mod_3_2"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-fqlb2",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900838,
    "updatedAt": 1583448900838,
    "author": {
      "username": "authoress-s94m1g",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "pjmszh",
      "tag_8",
      "tag_mod_2_0",
      "tag_mod_3_2"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "3g2dc6",
      "tag_9",
      "tag_mod_2_1",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-7wwcmq",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900868,
    "updatedAt": 1583448900868,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "3g2dc6",
      "tag_9",
      "tag_mod_2_1",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "ojfpjo",
      "tag_10",
      "tag_mod_2_0",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-lqpfpo",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900901,
    "updatedAt": 1583448900901,
    "author": {
      "username": "authoress-s94m1g",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "ojfpjo",
      "tag_10",
      "tag_mod_2_0",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "xo2fs7",
      "tag_11",
      "tag_mod_2_1",
      "tag_mod_3_2"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-h31lcl",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900924,
    "updatedAt": 1583448900924,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "xo2fs7",
      "tag_11",
      "tag_mod_2_1",
      "tag_mod_3_2"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "quzh9p",
      "tag_12",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-ync55m",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900950,
    "updatedAt": 1583448900950,
    "author": {
      "username": "authoress-s94m1g",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "quzh9p",
      "tag_12",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "dbkhes",
      "tag_13",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-myou07",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900974,
    "updatedAt": 1583448900974,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "dbkhes",
      "tag_13",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "n36zu1",
      "tag_14",
      "tag_mod_2_0",
      "tag_mod_3_2"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-42jr7u",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448900998,
    "updatedAt": 1583448900998,
    "author": {
      "username": "authoress-s94m1g",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "n36zu1",
      "tag_14",
      "tag_mod_2_0",
      "tag_mod_3_2"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "uuc91i",
      "tag_15",
      "tag_mod_2_1",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-3drijq",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448901032,
    "updatedAt": 1583448901032,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "uuc91i",
      "tag_15",
      "tag_mod_2_1",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "le7z8h",
      "tag_16",
      "tag_mod_2_0",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-t8gqi7",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448901056,
    "updatedAt": 1583448901056,
    "author": {
      "username": "authoress-s94m1g",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "le7z8h",
      "tag_16",
      "tag_mod_2_0",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "2i14gr",
      "tag_17",
      "tag_mod_2_1",
      "tag_mod_3_2"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-7grapy",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448901088,
    "updatedAt": 1583448901088,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "2i14gr",
      "tag_17",
      "tag_mod_2_1",
      "tag_mod_3_2"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "fgj3vh",
      "tag_18",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-apxw06",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448901121,
    "updatedAt": 1583448901121,
    "author": {
      "username": "authoress-s94m1g",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "fgj3vh",
      "tag_18",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "dqlne9",
      "tag_19",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-32e6yr",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448901172,
    "updatedAt": 1583448901172,
    "author": {
      "username": "author--zd653v",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "dqlne9",
      "tag_19",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
### should list articles
```
GET /articles
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "dqlne9",
        "tag_19",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448901172,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-32e6yr",
      "updatedAt": 1583448901172,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "fgj3vh",
        "tag_18",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448901121,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-apxw06",
      "updatedAt": 1583448901121,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "2i14gr",
        "tag_17",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448901088,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-7grapy",
      "updatedAt": 1583448901088,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "le7z8h",
        "tag_16",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448901056,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-t8gqi7",
      "updatedAt": 1583448901056,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_15",
        "tag_mod_2_1",
        "tag_mod_3_0",
        "uuc91i"
      ],
      "createdAt": 1583448901032,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-3drijq",
      "updatedAt": 1583448901032,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "n36zu1",
        "tag_14",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900998,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-42jr7u",
      "updatedAt": 1583448900998,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "dbkhes",
        "tag_13",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900974,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-myou07",
      "updatedAt": 1583448900974,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "quzh9p",
        "tag_12",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900950,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-ync55m",
      "updatedAt": 1583448900950,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_11",
        "tag_mod_2_1",
        "tag_mod_3_2",
        "xo2fs7"
      ],
      "createdAt": 1583448900924,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-h31lcl",
      "updatedAt": 1583448900924,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "ojfpjo",
        "tag_10",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900901,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-lqpfpo",
      "updatedAt": 1583448900901,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "3g2dc6",
        "tag_9",
        "tag_mod_2_1",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900868,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-7wwcmq",
      "updatedAt": 1583448900868,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "pjmszh",
        "tag_8",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900838,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-fqlb2",
      "updatedAt": 1583448900838,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "d4gby0",
        "tag_7",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900809,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-k011r8",
      "updatedAt": 1583448900809,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "b43yts",
        "tag_6",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900786,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-d1khjm",
      "updatedAt": 1583448900786,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "ntu8la",
        "tag_5",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900761,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-3z0mi6",
      "updatedAt": 1583448900761,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_4",
        "tag_mod_2_0",
        "tag_mod_3_1",
        "w5l5r"
      ],
      "createdAt": 1583448900738,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-te81ar",
      "updatedAt": 1583448900738,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "-z583od",
        "tag_3",
        "tag_mod_2_1",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900712,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-pcuwyl",
      "updatedAt": 1583448900712,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "6vc8es",
        "tag_2",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900683,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-4dt2m3",
      "updatedAt": 1583448900683,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "9df8tt",
        "tag_1",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900657,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-alw1nl",
      "updatedAt": 1583448900657,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5m1mtq",
        "tag_0",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900617,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-o3y2nq",
      "updatedAt": 1583448900617,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
### should list articles with tag
```
GET /articles?tag=tag_7
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "d4gby0",
        "tag_7",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900809,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-k011r8",
      "updatedAt": 1583448900809,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
```
GET /articles?tag=tag_mod_3_2
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "2i14gr",
        "tag_17",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448901088,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-7grapy",
      "updatedAt": 1583448901088,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "n36zu1",
        "tag_14",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900998,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-42jr7u",
      "updatedAt": 1583448900998,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_11",
        "tag_mod_2_1",
        "tag_mod_3_2",
        "xo2fs7"
      ],
      "createdAt": 1583448900924,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-h31lcl",
      "updatedAt": 1583448900924,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "pjmszh",
        "tag_8",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900838,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-fqlb2",
      "updatedAt": 1583448900838,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "ntu8la",
        "tag_5",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900761,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-3z0mi6",
      "updatedAt": 1583448900761,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "6vc8es",
        "tag_2",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900683,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-4dt2m3",
      "updatedAt": 1583448900683,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
### should list articles by author
```
GET /articles?author=authoress-s94m1g
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "fgj3vh",
        "tag_18",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448901121,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-apxw06",
      "updatedAt": 1583448901121,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "le7z8h",
        "tag_16",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448901056,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-t8gqi7",
      "updatedAt": 1583448901056,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "n36zu1",
        "tag_14",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900998,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-42jr7u",
      "updatedAt": 1583448900998,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "quzh9p",
        "tag_12",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900950,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-ync55m",
      "updatedAt": 1583448900950,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "ojfpjo",
        "tag_10",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900901,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-lqpfpo",
      "updatedAt": 1583448900901,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "pjmszh",
        "tag_8",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900838,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-fqlb2",
      "updatedAt": 1583448900838,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "b43yts",
        "tag_6",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900786,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-d1khjm",
      "updatedAt": 1583448900786,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_4",
        "tag_mod_2_0",
        "tag_mod_3_1",
        "w5l5r"
      ],
      "createdAt": 1583448900738,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-te81ar",
      "updatedAt": 1583448900738,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "6vc8es",
        "tag_2",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900683,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-4dt2m3",
      "updatedAt": 1583448900683,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5m1mtq",
        "tag_0",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900617,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-o3y2nq",
      "updatedAt": 1583448900617,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
### should list articles favorited by user
```
GET /articles?favorited=non-author-8qm0vw
```
```
200 OK

{
  "articles": []
}
```
### should list articles by limit/offset
```
GET /articles?author=author--zd653v&limit=2
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "dqlne9",
        "tag_19",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448901172,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-32e6yr",
      "updatedAt": 1583448901172,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "2i14gr",
        "tag_17",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448901088,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-7grapy",
      "updatedAt": 1583448901088,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
```
GET /articles?author=author--zd653v&limit=2&offset=2
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "tag_15",
        "tag_mod_2_1",
        "tag_mod_3_0",
        "uuc91i"
      ],
      "createdAt": 1583448901032,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-3drijq",
      "updatedAt": 1583448901032,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "dbkhes",
        "tag_13",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900974,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-myou07",
      "updatedAt": 1583448900974,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
### should list articles when authenticated
```
GET /articles
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "dqlne9",
        "tag_19",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448901172,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-32e6yr",
      "updatedAt": 1583448901172,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "fgj3vh",
        "tag_18",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448901121,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-apxw06",
      "updatedAt": 1583448901121,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "2i14gr",
        "tag_17",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448901088,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-7grapy",
      "updatedAt": 1583448901088,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "le7z8h",
        "tag_16",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448901056,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-t8gqi7",
      "updatedAt": 1583448901056,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_15",
        "tag_mod_2_1",
        "tag_mod_3_0",
        "uuc91i"
      ],
      "createdAt": 1583448901032,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-3drijq",
      "updatedAt": 1583448901032,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "n36zu1",
        "tag_14",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900998,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-42jr7u",
      "updatedAt": 1583448900998,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "dbkhes",
        "tag_13",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900974,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-myou07",
      "updatedAt": 1583448900974,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "quzh9p",
        "tag_12",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900950,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-ync55m",
      "updatedAt": 1583448900950,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_11",
        "tag_mod_2_1",
        "tag_mod_3_2",
        "xo2fs7"
      ],
      "createdAt": 1583448900924,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-h31lcl",
      "updatedAt": 1583448900924,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "ojfpjo",
        "tag_10",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900901,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-lqpfpo",
      "updatedAt": 1583448900901,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "3g2dc6",
        "tag_9",
        "tag_mod_2_1",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900868,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-7wwcmq",
      "updatedAt": 1583448900868,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "pjmszh",
        "tag_8",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900838,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-fqlb2",
      "updatedAt": 1583448900838,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "d4gby0",
        "tag_7",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900809,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-k011r8",
      "updatedAt": 1583448900809,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "b43yts",
        "tag_6",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900786,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-d1khjm",
      "updatedAt": 1583448900786,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "ntu8la",
        "tag_5",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900761,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-3z0mi6",
      "updatedAt": 1583448900761,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_4",
        "tag_mod_2_0",
        "tag_mod_3_1",
        "w5l5r"
      ],
      "createdAt": 1583448900738,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-te81ar",
      "updatedAt": 1583448900738,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "-z583od",
        "tag_3",
        "tag_mod_2_1",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900712,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-pcuwyl",
      "updatedAt": 1583448900712,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "6vc8es",
        "tag_2",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900683,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-4dt2m3",
      "updatedAt": 1583448900683,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "9df8tt",
        "tag_1",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900657,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-alw1nl",
      "updatedAt": 1583448900657,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5m1mtq",
        "tag_0",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900617,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-o3y2nq",
      "updatedAt": 1583448900617,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
### should disallow multiple of author/tag/favorited
```
GET /articles?tag=foo&author=bar
```
```
GET /articles?author=foo&favorited=bar
```
```
GET /articles?favorited=foo&tag=bar
```
## Feed
### should get feed
```
GET /articles/feed
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Only one of these can be specified: [tag, author, favorited]"
    ]
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Only one of these can be specified: [tag, author, favorited]"
    ]
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Only one of these can be specified: [tag, author, favorited]"
    ]
  }
}
```
```
200 OK

{
  "articles": []
}
```
```
POST /profiles/authoress-s94m1g/follow

{}
```
```
200 OK

{
  "profile": {
    "username": "authoress-s94m1g",
    "bio": "",
    "image": "",
    "following": true
  }
}
```
```
GET /articles/feed
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "fgj3vh",
        "tag_18",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448901121,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-apxw06",
      "updatedAt": 1583448901121,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "le7z8h",
        "tag_16",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448901056,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-t8gqi7",
      "updatedAt": 1583448901056,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "n36zu1",
        "tag_14",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900998,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-42jr7u",
      "updatedAt": 1583448900998,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "quzh9p",
        "tag_12",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900950,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-ync55m",
      "updatedAt": 1583448900950,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "ojfpjo",
        "tag_10",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900901,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-lqpfpo",
      "updatedAt": 1583448900901,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "pjmszh",
        "tag_8",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900838,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-fqlb2",
      "updatedAt": 1583448900838,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "b43yts",
        "tag_6",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900786,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-d1khjm",
      "updatedAt": 1583448900786,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_4",
        "tag_mod_2_0",
        "tag_mod_3_1",
        "w5l5r"
      ],
      "createdAt": 1583448900738,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-te81ar",
      "updatedAt": 1583448900738,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "6vc8es",
        "tag_2",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900683,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-4dt2m3",
      "updatedAt": 1583448900683,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5m1mtq",
        "tag_0",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900617,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-o3y2nq",
      "updatedAt": 1583448900617,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
```
POST /profiles/author--zd653v/follow

{}
```
```
200 OK

{
  "profile": {
    "username": "author--zd653v",
    "bio": "",
    "image": "",
    "following": true
  }
}
```
```
GET /articles/feed
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "dqlne9",
        "tag_19",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448901172,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-32e6yr",
      "updatedAt": 1583448901172,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "fgj3vh",
        "tag_18",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448901121,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-apxw06",
      "updatedAt": 1583448901121,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "2i14gr",
        "tag_17",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448901088,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-7grapy",
      "updatedAt": 1583448901088,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "le7z8h",
        "tag_16",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448901056,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-t8gqi7",
      "updatedAt": 1583448901056,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_15",
        "tag_mod_2_1",
        "tag_mod_3_0",
        "uuc91i"
      ],
      "createdAt": 1583448901032,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-3drijq",
      "updatedAt": 1583448901032,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "n36zu1",
        "tag_14",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900998,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-42jr7u",
      "updatedAt": 1583448900998,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "dbkhes",
        "tag_13",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900974,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-myou07",
      "updatedAt": 1583448900974,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "quzh9p",
        "tag_12",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900950,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-ync55m",
      "updatedAt": 1583448900950,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_11",
        "tag_mod_2_1",
        "tag_mod_3_2",
        "xo2fs7"
      ],
      "createdAt": 1583448900924,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-h31lcl",
      "updatedAt": 1583448900924,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "ojfpjo",
        "tag_10",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900901,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-lqpfpo",
      "updatedAt": 1583448900901,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "3g2dc6",
        "tag_9",
        "tag_mod_2_1",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900868,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-7wwcmq",
      "updatedAt": 1583448900868,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "pjmszh",
        "tag_8",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900838,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-fqlb2",
      "updatedAt": 1583448900838,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "d4gby0",
        "tag_7",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900809,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-k011r8",
      "updatedAt": 1583448900809,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "b43yts",
        "tag_6",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900786,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-d1khjm",
      "updatedAt": 1583448900786,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "ntu8la",
        "tag_5",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900761,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-3z0mi6",
      "updatedAt": 1583448900761,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_4",
        "tag_mod_2_0",
        "tag_mod_3_1",
        "w5l5r"
      ],
      "createdAt": 1583448900738,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-te81ar",
      "updatedAt": 1583448900738,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "-z583od",
        "tag_3",
        "tag_mod_2_1",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900712,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-pcuwyl",
      "updatedAt": 1583448900712,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "6vc8es",
        "tag_2",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1583448900683,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-4dt2m3",
      "updatedAt": 1583448900683,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "9df8tt",
        "tag_1",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1583448900657,
      "author": {
        "username": "author--zd653v",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-alw1nl",
      "updatedAt": 1583448900657,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5m1mtq",
        "tag_0",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1583448900617,
      "author": {
        "username": "authoress-s94m1g",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-o3y2nq",
      "updatedAt": 1583448900617,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
### should disallow unauthenticated feed
```
GET /articles/feed
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
## Tags
### should get tags
```
GET /tags
```
```
200 OK

{
  "tags": [
    "tag_11",
    "tag_mod_2_1",
    "tag_mod_3_2",
    "xo2fs7",
    "tag_15",
    "tag_mod_3_0",
    "uuc91i",
    "dqlne9",
    "tag_19",
    "tag_mod_3_1",
    "tag_4",
    "tag_mod_2_0",
    "w5l5r",
    "dbkhes",
    "tag_13",
    "n36zu1",
    "tag_14",
    "tag_a",
    "tag_b",
    "5m1mtq",
    "tag_0",
    "ntu8la",
    "tag_5",
    "ojfpjo",
    "tag_10",
    "2i14gr",
    "tag_17",
    "le7z8h",
    "tag_16",
    "3g2dc6",
    "tag_9",
    "-z583od",
    "tag_3",
    "6vc8es",
    "tag_2",
    "b43yts",
    "tag_6",
    "fgj3vh",
    "tag_18",
    "d4gby0",
    "tag_7",
    "9df8tt",
    "tag_1",
    "quzh9p",
    "tag_12",
    "pjmszh",
    "tag_8"
  ]
}
```
# Comment
```
POST /users

{
  "user": {
    "email": "author-ioae0c@email.com",
    "username": "author-ioae0c",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "author-ioae0c@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF1dGhvci1pb2FlMGMiLCJpYXQiOjE1ODM0NDg5MDIsImV4cCI6MTU4MzYyMTcwMn0.a2_SiK0-YKUPMznTiLIualmkHpSuBFMX655NcoOo4Hg",
    "username": "author-ioae0c",
    "bio": "",
    "image": ""
  }
}
```
```
POST /users

{
  "user": {
    "email": "commenter-wlm2az@email.com",
    "username": "commenter-wlm2az",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "commenter-wlm2az@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbW1lbnRlci13bG0yYXoiLCJpYXQiOjE1ODM0NDg5MDIsImV4cCI6MTU4MzYyMTcwMn0.rQ9_KeBgte_R4C1yxF1fyEpzu6g3FL8w9ON6YFX2NSk",
    "username": "commenter-wlm2az",
    "bio": "",
    "image": ""
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body"
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-466h5j",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1583448902615,
    "updatedAt": 1583448902615,
    "author": {
      "username": "author-ioae0c",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
## Create
### should create comment
```
POST /articles/title-466h5j/comments

{
  "comment": {
    "body": "test comment ijcd1t"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "f607f257-8b96-45a0-9f53-428b3dc226d0",
    "slug": "title-466h5j",
    "body": "test comment ijcd1t",
    "createdAt": 1583448902650,
    "updatedAt": 1583448902650,
    "author": {
      "username": "commenter-wlm2az",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-466h5j/comments

{
  "comment": {
    "body": "test comment 3732b9"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "66493ce8-0d8a-4d3c-acb3-02d2e51537af",
    "slug": "title-466h5j",
    "body": "test comment 3732b9",
    "createdAt": 1583448902685,
    "updatedAt": 1583448902685,
    "author": {
      "username": "commenter-wlm2az",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-466h5j/comments

{
  "comment": {
    "body": "test comment 3cxpof"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "dd969715-2704-4fea-a1c4-872675dddc0e",
    "slug": "title-466h5j",
    "body": "test comment 3cxpof",
    "createdAt": 1583448902713,
    "updatedAt": 1583448902713,
    "author": {
      "username": "commenter-wlm2az",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-466h5j/comments

{
  "comment": {
    "body": "test comment b6mb6k"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "260df409-ff88-4b23-a1e5-dee7d588ff59",
    "slug": "title-466h5j",
    "body": "test comment b6mb6k",
    "createdAt": 1583448902742,
    "updatedAt": 1583448902742,
    "author": {
      "username": "commenter-wlm2az",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-466h5j/comments

{
  "comment": {
    "body": "test comment 5h3jlp"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "93b204f3-93b9-44b6-8e98-6a7fdf62d2c0",
    "slug": "title-466h5j",
    "body": "test comment 5h3jlp",
    "createdAt": 1583448902768,
    "updatedAt": 1583448902768,
    "author": {
      "username": "commenter-wlm2az",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-466h5j/comments

{
  "comment": {
    "body": "test comment c724fn"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "070f84b1-bb8e-4bb6-980c-04b53d6358fb",
    "slug": "title-466h5j",
    "body": "test comment c724fn",
    "createdAt": 1583448902798,
    "updatedAt": 1583448902798,
    "author": {
      "username": "commenter-wlm2az",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-466h5j/comments

{
  "comment": {
    "body": "test comment to9bmr"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "82b1b003-e03a-4069-8fe6-e5fb6b914c2e",
    "slug": "title-466h5j",
    "body": "test comment to9bmr",
    "createdAt": 1583448902832,
    "updatedAt": 1583448902832,
    "author": {
      "username": "commenter-wlm2az",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-466h5j/comments

{
  "comment": {
    "body": "test comment 7ktu50"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "36304325-eafc-473d-8db0-c75606f48443",
    "slug": "title-466h5j",
    "body": "test comment 7ktu50",
    "createdAt": 1583448902860,
    "updatedAt": 1583448902860,
    "author": {
      "username": "commenter-wlm2az",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-466h5j/comments

{
  "comment": {
    "body": "test comment xbhwy4"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "bc4d8e74-dac2-4cf6-859a-871f7e56884d",
    "slug": "title-466h5j",
    "body": "test comment xbhwy4",
    "createdAt": 1583448902903,
    "updatedAt": 1583448902903,
    "author": {
      "username": "commenter-wlm2az",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-466h5j/comments

{
  "comment": {
    "body": "test comment 6u3sbk"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "fc08655a-5f8e-42f5-89c7-579fda06bd7c",
    "slug": "title-466h5j",
    "body": "test comment 6u3sbk",
    "createdAt": 1583448902933,
    "updatedAt": 1583448902933,
    "author": {
      "username": "commenter-wlm2az",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
### should disallow unauthenticated user
```
POST /articles/title-466h5j/comments

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
### should enforce comment body
```
POST /articles/title-466h5j/comments

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Comment must be specified."
    ]
  }
}
```
### should disallow non-existent article
```
POST /articles/foobar/comments

{
  "comment": {
    "body": "test comment ed1gin"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article not found: [foobar]"
    ]
  }
}
```
## Get
### should get all comments for article
```
GET /articles/title-466h5j/comments
```
```
200 OK

{
  "comments": [
    {
      "createdAt": 1583448902933,
      "id": "fc08655a-5f8e-42f5-89c7-579fda06bd7c",
      "body": "test comment 6u3sbk",
      "slug": "title-466h5j",
      "author": {
        "username": "commenter-wlm2az",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1583448902933
    },
    {
      "createdAt": 1583448902768,
      "id": "93b204f3-93b9-44b6-8e98-6a7fdf62d2c0",
      "body": "test comment 5h3jlp",
      "slug": "title-466h5j",
      "author": {
        "username": "commenter-wlm2az",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1583448902768
    },
    {
      "createdAt": 1583448902650,
      "id": "f607f257-8b96-45a0-9f53-428b3dc226d0",
      "body": "test comment ijcd1t",
      "slug": "title-466h5j",
      "author": {
        "username": "commenter-wlm2az",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1583448902650
    },
    {
      "createdAt": 1583448902742,
      "id": "260df409-ff88-4b23-a1e5-dee7d588ff59",
      "body": "test comment b6mb6k",
      "slug": "title-466h5j",
      "author": {
        "username": "commenter-wlm2az",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1583448902742
    },
    {
      "createdAt": 1583448902798,
      "id": "070f84b1-bb8e-4bb6-980c-04b53d6358fb",
      "body": "test comment c724fn",
      "slug": "title-466h5j",
      "author": {
        "username": "commenter-wlm2az",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1583448902798
    },
    {
      "createdAt": 1583448902685,
      "id": "66493ce8-0d8a-4d3c-acb3-02d2e51537af",
      "body": "test comment 3732b9",
      "slug": "title-466h5j",
      "author": {
        "username": "commenter-wlm2az",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1583448902685
    },
    {
      "createdAt": 1583448902860,
      "id": "36304325-eafc-473d-8db0-c75606f48443",
      "body": "test comment 7ktu50",
      "slug": "title-466h5j",
      "author": {
        "username": "commenter-wlm2az",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1583448902860
    },
    {
      "createdAt": 1583448902832,
      "id": "82b1b003-e03a-4069-8fe6-e5fb6b914c2e",
      "body": "test comment to9bmr",
      "slug": "title-466h5j",
      "author": {
        "username": "commenter-wlm2az",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1583448902832
    },
    {
      "createdAt": 1583448902713,
      "id": "dd969715-2704-4fea-a1c4-872675dddc0e",
      "body": "test comment 3cxpof",
      "slug": "title-466h5j",
      "author": {
        "username": "commenter-wlm2az",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1583448902713
    },
    {
      "createdAt": 1583448902903,
      "id": "bc4d8e74-dac2-4cf6-859a-871f7e56884d",
      "body": "test comment xbhwy4",
      "slug": "title-466h5j",
      "author": {
        "username": "commenter-wlm2az",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1583448902903
    }
  ]
}
```
## Delete
### should delete comment
```
DELETE /articles/title-466h5j/comments/f607f257-8b96-45a0-9f53-428b3dc226d0
```
```
200 OK

{}
```
### only comment author should be able to delete comment
```
DELETE /articles/title-466h5j/comments/66493ce8-0d8a-4d3c-acb3-02d2e51537af
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Only comment author can delete: [commenter-wlm2az]"
    ]
  }
}
```
### should disallow unauthenticated user
```
DELETE /articles/title-466h5j/comments/66493ce8-0d8a-4d3c-acb3-02d2e51537af
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
### should disallow deleting unknown comment
```
DELETE /articles/title-466h5j/comments/foobar_id
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Comment ID not found: [foobar_id]"
    ]
  }
}
```
# User
## Create
### should create user
```
POST /users

{
  "user": {
    "email": "user1-0.c1bjrmuj7vb@email.com",
    "username": "user1-0.c1bjrmuj7vb",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "user1-0.c1bjrmuj7vb@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAuYzFianJtdWo3dmIiLCJpYXQiOjE1ODM0NDg5MDMsImV4cCI6MTU4MzYyMTcwM30.IMwrzF0JYJocitU12Shtc5RXvHO9IgKzYWNjKwY2LGQ",
    "username": "user1-0.c1bjrmuj7vb",
    "bio": "",
    "image": ""
  }
}
```
### should disallow same username
```
POST /users

{
  "user": {
    "email": "user1-0.c1bjrmuj7vb@email.com",
    "username": "user1-0.c1bjrmuj7vb",
    "password": "password"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Username already taken: [user1-0.c1bjrmuj7vb]"
    ]
  }
}
```
### should disallow same email
```
POST /users

{
  "user": {
    "username": "user2",
    "email": "user1-0.c1bjrmuj7vb@email.com",
    "password": "password"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Email already taken: [user1-0.c1bjrmuj7vb@email.com]"
    ]
  }
}
```
### should enforce required fields
```
POST /users

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "User must be specified."
    ]
  }
}
```
```
POST /users

{
  "user": {
    "foo": 1
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Username must be specified."
    ]
  }
}
```
```
POST /users

{
  "user": {
    "username": 1
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Email must be specified."
    ]
  }
}
```
```
POST /users

{
  "user": {
    "username": 1,
    "email": 2
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Password must be specified."
    ]
  }
}
```
## Login
### should login
```
POST /users/login

{
  "user": {
    "email": "user1-0.c1bjrmuj7vb@email.com",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "user1-0.c1bjrmuj7vb@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAuYzFianJtdWo3dmIiLCJpYXQiOjE1ODM0NDg5MDMsImV4cCI6MTU4MzYyMTcwM30.IMwrzF0JYJocitU12Shtc5RXvHO9IgKzYWNjKwY2LGQ",
    "username": "user1-0.c1bjrmuj7vb",
    "bio": "",
    "image": ""
  }
}
```
### should disallow unknown email
```
POST /users/login

{
  "user": {
    "email": "0.l85fj4inogp",
    "password": "somepassword"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Email not found: [0.l85fj4inogp]"
    ]
  }
}
```
### should disallow wrong password
```
POST /users/login

{
  "user": {
    "email": "user1-0.c1bjrmuj7vb@email.com",
    "password": "0.y5x6m2rgjjp"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Wrong password."
    ]
  }
}
```
### should enforce required fields
```
POST /users/login

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "User must be specified."
    ]
  }
}
```
```
POST /users/login

{
  "user": {}
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Email must be specified."
    ]
  }
}
```
```
POST /users/login

{
  "user": {
    "email": "someemail"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Password must be specified."
    ]
  }
}
```
## Get
### should get current user
```
GET /user
```
```
200 OK

{
  "user": {
    "email": "user1-0.c1bjrmuj7vb@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAuYzFianJtdWo3dmIiLCJpYXQiOjE1ODM0NDg5MDMsImV4cCI6MTU4MzYyMTcwM30.IMwrzF0JYJocitU12Shtc5RXvHO9IgKzYWNjKwY2LGQ",
    "username": "user1-0.c1bjrmuj7vb",
    "bio": "",
    "image": ""
  }
}
```
### should disallow bad tokens
```
GET /user
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Token not present or invalid."
    ]
  }
}
```
```
GET /user
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Token not present or invalid."
    ]
  }
}
```
```
GET /user
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Token not present or invalid."
    ]
  }
}
```
```
GET /user
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Token not present or invalid."
    ]
  }
}
```
## Profile
### should get profile
```
GET /profiles/user1-0.c1bjrmuj7vb
```
```
200 OK

{
  "profile": {
    "username": "user1-0.c1bjrmuj7vb",
    "bio": "",
    "image": "",
    "following": false
  }
}
```
### should disallow unknown username
```
GET /profiles/foo_0.wohm7u0ibip
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "User not found: [foo_0.wohm7u0ibip]"
    ]
  }
}
```
### should follow/unfollow user
```
POST /users

{
  "user": {
    "username": "followed_user",
    "email": "followed_user@mail.com",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "followed_user@mail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZvbGxvd2VkX3VzZXIiLCJpYXQiOjE1ODM0NDg5MDMsImV4cCI6MTU4MzYyMTcwM30.6dcMiPq51D8VHd27ZT4gG8QFwqY2eakLmjaNN0vsGt0",
    "username": "followed_user",
    "bio": "",
    "image": ""
  }
}
```
```
POST /profiles/followed_user/follow
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": true
  }
}
```
```
POST /profiles/followed_user/follow
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": true
  }
}
```
```
GET /profiles/followed_user
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": true
  }
}
```
```
GET /profiles/followed_user
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": false
  }
}
```
```
POST /users

{
  "user": {
    "username": "user2-0.083i99jwc8ie",
    "email": "user2-0.083i99jwc8ie@mail.com",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "user2-0.083i99jwc8ie@mail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyLTAuMDgzaTk5andjOGllIiwiaWF0IjoxNTgzNDQ4OTAzLCJleHAiOjE1ODM2MjE3MDN9.VZ7iySp7snnQoNoIGJAP8uFhqz0x7HfA6NICkLRwrds",
    "username": "user2-0.083i99jwc8ie",
    "bio": "",
    "image": ""
  }
}
```
```
POST /profiles/followed_user/follow
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": true
  }
}
```
```
DELETE /profiles/followed_user/follow
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": false
  }
}
```
```
DELETE /profiles/followed_user/follow
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": false
  }
}
```
```
DELETE /profiles/followed_user/follow
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": false
  }
}
```
### should disallow following with bad token
```
POST /profiles/followed_user/follow
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Token not present or invalid."
    ]
  }
}
```
## Update
### should update user
```
PUT /user

{
  "user": {
    "email": "updated-user1-0.c1bjrmuj7vb@email.com"
  }
}
```
```
200 OK

{
  "user": {
    "username": "user1-0.c1bjrmuj7vb",
    "email": "updated-user1-0.c1bjrmuj7vb@email.com",
    "image": "",
    "bio": "",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAuYzFianJtdWo3dmIiLCJpYXQiOjE1ODM0NDg5MDMsImV4cCI6MTU4MzYyMTcwM30.IMwrzF0JYJocitU12Shtc5RXvHO9IgKzYWNjKwY2LGQ"
  }
}
```
```
PUT /user

{
  "user": {
    "password": "newpassword"
  }
}
```
```
200 OK

{
  "user": {
    "username": "user1-0.c1bjrmuj7vb",
    "email": "updated-user1-0.c1bjrmuj7vb@email.com",
    "image": "",
    "bio": "",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAuYzFianJtdWo3dmIiLCJpYXQiOjE1ODM0NDg5MDMsImV4cCI6MTU4MzYyMTcwM30.IMwrzF0JYJocitU12Shtc5RXvHO9IgKzYWNjKwY2LGQ"
  }
}
```
```
PUT /user

{
  "user": {
    "bio": "newbio"
  }
}
```
```
200 OK

{
  "user": {
    "username": "user1-0.c1bjrmuj7vb",
    "bio": "newbio",
    "image": "",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAuYzFianJtdWo3dmIiLCJpYXQiOjE1ODM0NDg5MDMsImV4cCI6MTU4MzYyMTcwM30.IMwrzF0JYJocitU12Shtc5RXvHO9IgKzYWNjKwY2LGQ"
  }
}
```
```
PUT /user

{
  "user": {
    "image": "newimage"
  }
}
```
```
200 OK

{
  "user": {
    "username": "user1-0.c1bjrmuj7vb",
    "image": "newimage",
    "bio": "newbio",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAuYzFianJtdWo3dmIiLCJpYXQiOjE1ODM0NDg5MDMsImV4cCI6MTU4MzYyMTcwM30.IMwrzF0JYJocitU12Shtc5RXvHO9IgKzYWNjKwY2LGQ"
  }
}
```
### should disallow missing token/email in update
```
PUT /user
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Token not present or invalid."
    ]
  }
}
```
```
PUT /user

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "User must be specified."
    ]
  }
}
```
### should disallow reusing email
```
POST /users

{
  "user": {
    "email": "user2-0.xsu1wgzwvyf@email.com",
    "username": "user2-0.xsu1wgzwvyf",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "user2-0.xsu1wgzwvyf@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyLTAueHN1MXdnend2eWYiLCJpYXQiOjE1ODM0NDg5MDMsImV4cCI6MTU4MzYyMTcwM30.dBtAnsV5BeRoe54tr-1f7cU1VZx4yb9D2KB-hsh6jd4",
    "username": "user2-0.xsu1wgzwvyf",
    "bio": "",
    "image": ""
  }
}
```
```
PUT /user

{
  "user": {
    "email": "user2-0.xsu1wgzwvyf@email.com"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Email already taken: [user2-0.xsu1wgzwvyf@email.com]"
    ]
  }
}
```
# Util
## Ping
### should ping
```
GET /ping
```
```
200 OK

{
  "pong": "2020-03-05T22:55:03.965Z",
  "AWS_REGION": "us-east-1",
  "DYNAMODB_NAMESPACE": "dev"
}
```
