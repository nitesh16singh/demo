define({ "api": [
  {
    "type": "post",
    "url": "/addComment",
    "title": "Add New Comment",
    "name": "addComment",
    "group": "Comments",
    "examples": [
      {
        "title": "Input Example :",
        "content": "{content: 'This is nice post',postId:'5858eb73e0a86c4b07ba220a'}",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Mandatory .</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "postId",
            "description": "<p>Mandatory .</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n\t    \"__v\": 0,\n\t    \"content\": \"This is nice post\",\n\t    \"author\": \"5858dc09f11b07405396d58b\",\n\t    \"updatedAt\": \"2016-12-20T12:03:59.000Z\",\n\t    \"newsFeedPost\": \"5858eb73e0a86c4b07ba220a\",\n\t    \"_id\": \"58591e2f44ba7b1dd27501c4\",\n\t    \"peaceBy\": [],\n\t    \"dislikedBy\": [],\n\t    \"likedBy\": [],\n\t    \"createdAt\": \"2016-12-20T12:03:54.506Z\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response  Content , postId Missing ",
          "content": "\nHTTP/1.1 400 Not Found\n{\"message\": \"Need Some important field to creating new Post\"}.",
          "type": "json"
        },
        {
          "title": "Error-Response:  If User Not logedIn ",
          "content": "HTTP/1.1 401 Not Found\n{\"message\": \"User Not logedIn\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/newsFeedPostsComment.js",
    "groupTitle": "Comments"
  },
  {
    "type": "get",
    "url": "/comments",
    "title": "Get comments related to post",
    "name": "comments",
    "group": "Comments",
    "examples": [
      {
        "title": "Input Example :",
        "content": "/comments?postId=586338d40b7cf63146991405",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n    \"_id\": \"586358b7925daf5f9a0dffc4\",\n    \"content\": \"Add comment in post\",\n    \"author\": \"5858dc09f11b07405396d58b\",\n    \"updatedAt\": \"2016-12-28T06:16:23.000Z\",\n    \"newsFeedPost\": \"586338d40b7cf63146991405\",\n    \"__v\": 0,\n    \"peaceBy\": [],\n    \"dislikedBy\": [],\n    \"likedBy\": [],\n    \"createdAt\": \"2016-12-28T06:13:14.880Z\"\n}, {\n    \"_id\": \"586358be925daf5f9a0dffc5\",\n    \"content\": \"Add comment in post 1\",\n    \"author\": \"5858dc09f11b07405396d58b\",\n    \"updatedAt\": \"2016-12-28T06:16:30.000Z\",\n    \"newsFeedPost\": \"586338d40b7cf63146991405\",\n    \"__v\": 0,\n    \"peaceBy\": [],\n    \"dislikedBy\": [],\n    \"likedBy\": [],\n    \"createdAt\": \"2016-12-28T06:13:14.880Z\"\n}, {\n    \"_id\": \"586358c4925daf5f9a0dffc6\",\n    \"content\": \"Add comment in post 2\",\n    \"author\": \"5858dc09f11b07405396d58b\",\n    \"updatedAt\": \"2016-12-28T06:16:36.000Z\",\n    \"newsFeedPost\": \"586338d40b7cf63146991405\",\n    \"__v\": 0,\n    \"peaceBy\": [],\n    \"dislikedBy\": [],\n    \"likedBy\": [],\n    \"createdAt\": \"2016-12-28T06:13:14.880Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ \n    \"message\": \"post Id  is Missing\" \n  }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  message :'User Not LoggedIn'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/newsFeedPostsComment.js",
    "groupTitle": "Comments"
  },
  {
    "type": "delete",
    "url": "/comment",
    "title": "Delete Comment",
    "name": "deleteComment",
    "group": "Comments",
    "examples": [
      {
        "title": "Input Example: ",
        "content": "{ commentId:'586351401d8f104be4e69930' }",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentId",
            "description": "<p>Mandatory .</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n\"ok\": 1,\n\"n\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response commentId Missing ",
          "content": "\nHTTP/1.1 400 Not Found\n{ \"message\": \"Comment ID Missing\" }.",
          "type": "json"
        },
        {
          "title": "Error-Response:  If User Not logedIn ",
          "content": "HTTP/1.1 401 Not Found\n{\"message\": \"User Not logedIn\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/newsFeedPostsComment.js",
    "groupTitle": "Comments"
  },
  {
    "type": "put",
    "url": "/updateComment",
    "title": "update New Comment",
    "name": "updateComment",
    "group": "Comments",
    "examples": [
      {
        "title": "Input Example: ",
        "content": "{ commentId:'586351401d8f104be4e69930' , action:'like' , content: \"o wow message is working\" }",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentId",
            "description": "<p>Mandatory .</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>Optioanl (like,dislike,peace)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Optional .</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n\t    \"_id\": \"58591e2f44ba7b1dd27501c4\",\n\t    \"content\": \"o wow message is working\",\n\t    \"author\": \"5858dc09f11b07405396d58b\",\n\t    \"updatedAt\": \"2016-12-20T12:19:32.000Z\",\n\t    \"newsFeedPost\": \"5858eb73e0a86c4b07ba220a\",\n\t    \"__v\": 0,\n\t    \"peaceBy\": [],\n\t    \"dislikedBy\": [\n\t        \"5858dc09f11b07405396d58b\"\n\t    ],\n\t    \"likedBy\": [\n\t        \"5858dc09f11b07405396d58b\"\n\t    ],\n\t    \"createdAt\": \"2016-12-20T12:03:54.506Z\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response commentId Missing ",
          "content": "\nHTTP/1.1 400 Not Found\n{\"message\": \"Need Some important field to creating new Post\"}.",
          "type": "json"
        },
        {
          "title": "Error-Response:  If User Not logedIn ",
          "content": "HTTP/1.1 401 Not Found\n{\"message\": \"User Not logedIn\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/newsFeedPostsComment.js",
    "groupTitle": "Comments"
  },
  {
    "type": "delete",
    "url": "/deleteImage",
    "title": "delete Images on S3",
    "name": "deleteImages",
    "group": "Images_on_S3",
    "examples": [
      {
        "title": "Input Example:",
        "content": "{\n  \"filePath\": \"images/profilePhotos/5858dc09f11b07405396d58b/profilePhotosScreenshot from 2016-11-25 17:13:42.png\"\n}",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filePath",
            "description": "<p>Mandatory filePath.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"deleted\": true,\n  \"filePath\": \"\"images/profilePhotos/5858dc09f11b07405396d58b/profilePhotosScreenshot from 2016-11-25 17:13:42.png\"\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Image Type is Missing:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"message\": \"Missing Field filePath\"\n  }",
          "type": "json"
        },
        {
          "title": "Email is Not Register:",
          "content": "HTTP/1.1 400 Not Found\n{\n   'message':\"User not LogedIn\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/upload.js",
    "groupTitle": "Images_on_S3"
  },
  {
    "type": "post",
    "url": "/uploadImage",
    "title": "Upload Images on S3",
    "name": "imageUploading",
    "group": "Images_on_S3",
    "examples": [
      {
        "title": "Input Example:",
        "content": "{ file:fileObject, type:'profilePhotos' }",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>Mandatory file.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Mandatory (profilePhotos,newsFeedImages,newsFeedVideos,groupsImages)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n  \n{\n\"filePath\": \"images/profilePhotos/5858dc09f11b07405396d58b/profilePhotosScreenshot from 2016-12-26 11:27:02.png\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Image Type is Missing:",
          "content": "HTTP/1.1 400 Not Found\n{\n  'message': 'please Enter type Of image '\n}",
          "type": "json"
        },
        {
          "title": "Email is Not Register:",
          "content": "HTTP/1.1 400 Not Found\n{\n   'message':\"User not LogedIn\"\n}",
          "type": "json"
        },
        {
          "title": "Password Not Matched :",
          "content": "HTTP/1.1 400 Not Found\n{\n   \"message\": \"Password Not Matched.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/upload.js",
    "groupTitle": "Images_on_S3"
  },
  {
    "type": "put",
    "url": "/blockUser",
    "title": "Block User",
    "name": "BlockUser",
    "group": "User",
    "examples": [
      {
        "title": "Input Example:",
        "content": "{ blockUserId:'585b9f7ea003512e3b732716'}",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "blockUserId",
            "description": "<p>Mandatory blockUserId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n \n{\n      \"blockedUser\": [\n        \"585b9f7ea003512e3b732716\"\n      ],\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "User Not LogedIn:",
          "content": "HTTP/1.1 400 Not Found\n{\n  message :'User not LogedIn'\n}",
          "type": "json"
        },
        {
          "title": "Id Is Missing :",
          "content": " HTTP/1.1 400 Not Found\n{ \n     \"message\": \" Id Is Missing.\" \n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login User",
    "name": "LoginUser",
    "group": "User",
    "examples": [
      {
        "title": "Input Example:",
        "content": "{ email:'abc@gmail.com', password:1234}",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Mandatory email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mandatory Password.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n   \n{\n   \"_id\": \"58511840f0e1e04052d2aa30\",\n   \"password\": \"$2a$08$3qo7oZRjb6.bYWQYnxOA.OWmjNiv7bhI4R4K2zzEepuqeu3fQFmRq\",\n   \"__v\": 0,\n   \"status\": {\n       \"idle\": false,\n       \"online\": true\n   },\n   \"profile\": {\n       \"firstName\": \"Nitesh\",\n       \"lastName\": \"Singh\",\n       \"fullName\": \"Nitesh Singh\",\n       \"subscription\": null,\n       \"twitterProfileUrl\": \"\",\n       \"facebookProfileUrl\": \"\",\n       \"linkedInProfileUrl\": \"\",\n       \"profileImage\": \"https://smf.imgix.net/profilePhotos/defaultUser.png\",\n       \"webAddress\": \"\",\n       \"state\": \"\",\n       \"city\": \"\",\n       \"streetAddress\": \"\",\n       \"title\": \"\",\n       \"company\": \"\"\n   },\n   \"settings\": {\n       \"deactivated\": false,\n       \"profilePrivate\": false,\n       \"addressPublic\": true,\n       \"emailPublic\": true,\n       \"phonePublic\": true\n   },\n   \"pinned\": [],\n   \"notifications\": [],\n   \"workspaces\": [],\n   \"connections\": {\n       \"following\": [],\n       \"blocked\": [],\n       \"connected\": [],\n   },\n   \"metadata\": {\n       \"smsVerified\": \"\"\n   },\n   \"secure\": {\n       \"passwordResetToken\": \"\",\n       \"numberVerify\": \"\",\n       \"smsCode\": \"\"\n   },\n   \"createdAt\": \"1481709602619\",\n   \"emails\": [{\n       \"address\": \"nitesh@test.com\",\n       \"_id\": \"58511840f0e1e04052d2aa31\",\n       \"verified\": false\n   }],\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Email or Password is Missing:",
          "content": "HTTP/1.1 400 Not Found\n{\n   \"message\": \"Email or Password is Missing \"\n}",
          "type": "json"
        },
        {
          "title": "Email is Not Register:",
          "content": "HTTP/1.1 400 Not Found\n{\n   \"message\": \"Email is not Registered.\"\n}",
          "type": "json"
        },
        {
          "title": "Password Not Matched :",
          "content": "HTTP/1.1 400 Not Found\n{\n   \"message\": \"Password Not Matched.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/auth/facebook",
    "title": "login with Facebook",
    "name": "LoginWithFacebook",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n \n {\n  \"_id\" : \"bfyd3ozzMkBMaYi2j\",\n  \"createdAt\" : ISODate(\"2016-12-13T08:51:54.865Z\"),\n  \"services\" : {\n      \"password\" : {\n          \"bcrypt\" : \"$2a$10$goCwJEBWWz.WGtXwq2pJcOZA0a.Bj0zpV3QzlYmT2annfHRln1KS.\"\n      },\n      \"resume\" : {\n          \"loginTokens\" : [\n              {\n                  \"when\" : ISODate(\"2016-12-13T08:51:55.071Z\"),\n                  \"hashedToken\" : \"qa7ypOUFHkH8iB5qzbwuLb+S5tQEqsc79VP/bqv/2jU=\"\n              }\n          ]\n      }\n  },\n  \"emails\" : [\n      {\n          \"address\" : \"nitesh16.singh@gmail.com\",\n          \"verified\" : false\n      }\n  ],\n  \"secure\" : {\n      \"smsCode\" : \"\",\n      \"numberVerify\" : \"\",\n      \"passwordResetToken\" : \"\",\n      \"activationToken\" : \"057b4802e89d21e54712\"\n  },\n  \"metadata\" : {\n      \"smsVerified\" : \"\",\n      \"isActivated\" : true\n  },\n  \"connections\" : {\n      \"connected\" : [ ],\n      \"blocked\" : [ ],\n      \"following\" : [ ]\n  },\n  \"workspaces\" : [ ],\n  \"notifications\" : [ ],\n  \"pinned\" : [ ],\n  \"settings\" : {\n      \"phonePublic\" : true,\n      \"emailPublic\" : true,\n      \"addressPublic\" : true,\n      \"profilePrivate\" : false,\n      \"deactivated\" : false\n  },\n  \"profile\" : {\n      \"firstName\" : \"Nitesh\",\n      \"lastName\" : \"Singh\",\n      \"fullName\" : \"Nitesh Singh\",\n      \"company\" : \"\",\n      \"searchEmail\" : \"nitesh16.singhemailAtgmail.com\",\n      \"title\" : \"\",\n      \"phoneNumber\" : \"\",\n      \"streetAddress\" : \"\",\n      \"city\" : \"\",\n      \"state\" : \"\",\n      \"zip\" : \"\",\n      \"webAddress\" : \"\",\n      \"profileImage\" : \"https://smf.imgix.net/profilePhotos/defaultUser.png\",\n      \"linkedInProfileUrl\" : \"\",\n      \"facebookProfileUrl\" : \"\",\n      \"twitterProfileUrl\" : \"\",\n      \"subscription\" : null\n  },\n  \"status\" : {\n      \"online\" : true,\n      \"lastLogin\" : {\n          \"date\" : ISODate(\"2016-12-13T08:51:56.741Z\"),\n          \"ipAddr\" : \"127.0.0.1\",\n          \"userAgent\" : \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.100 Safari/537.36\"\n      },\n      \"idle\" : false\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  message :'Login Unsuccessful'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/social-login.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "Logout Current user",
    "name": "LogoutUser",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n\n{\n   message :'User logout successfully'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  message :'User not login'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register User",
    "name": "RegisterUser",
    "group": "User",
    "examples": [
      {
        "title": "Input Example:",
        "content": "{ email:'abc@gmail.com', password:1234,firstName :'abc', lastName:'xyz', fullName:'abc xyz'}",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Mandatory Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mandatory Password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Mandatory firstName of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Mandatory  lastName of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>Mandatory fullName.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"__v\": 0,\n    \"password\": \"$2a$08$JQUgETIQ..rkc7tY7lW0h.tIiCFA6b6ptwledbz5JKKjzBZgN2.0i\",\n    \"_id\": \"585787a96bda3734701c9b9a\",\n    \"status\": {\n        \"idle\": false,\n        \"online\": true\n    },\n    \"profile\": {\n        \"firstName\": \"Nitesh\",\n        \"lastName\": \"Singh\",\n        \"fullName\": \"Nitesh Kumar Singh\",\n        \"hiddenPosts\": [],\n        \"subscription\": null,\n        \"twitterProfileUrl\": \"\",\n        \"facebookProfileUrl\": \"\",\n        \"linkedInProfileUrl\": \"\",\n        \"profileImage\": \"https://smf.imgix.net/profilePhotos/defaultUser.png\",\n        \"webAddress\": \"\",\n        \"state\": \"\",\n        \"city\": \"\",\n        \"streetAddress\": \"\",\n        \"title\": \"\",\n        \"company\": \"\"\n    },\n    \"settings\": {\n        \"deactivated\": false,\n        \"profilePrivate\": false,\n        \"addressPublic\": true,\n        \"emailPublic\": true,\n        \"phonePublic\": true\n    },\n    \"pinned\": [],\n    \"notifications\": [],\n    \"workspaces\": [],\n    \"connections\": {\n        \"following\": [],\n        \"blocked\": [],\n        \"connected\": [],\n    },\n    \"metadata\": {\n        \"smsVerified\": \"\"\n    },\n    \"secure\": {\n        \"passwordResetToken\": \"\",\n        \"numberVerify\": \"\",\n        \"smsCode\": \"\"\n    },\n    \"emails\": [{\n        \"address\": \"nitesh16.singh@gmail.com\",\n        \"_id\": \"585787a96bda3734701c9b9b\",\n        \"verified\": false\n    }],\n    \"createdAt\": \"2016-12-19T07:06:49.798Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Email already exist :",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Email already exist\"\n}",
          "type": "json"
        },
        {
          "title": "Field Missing.",
          "content": " HTTP/1.1 404 Not Found\n{\n\"success\": false,\n \"message\": {\n  \"errors\": {\n   \"profile.firstName\": \"Path `profile.firstName` is required.\",\n     \"profile.lastName\": \"Path `profile.lastName` is required.\",\n     \"profile.fullName\": \"Path `profile.fullName` is required.\"\n   }\n}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/clearNotifications",
    "title": "Delete All Notifications",
    "name": "clearNotifications",
    "group": "User",
    "description": "<p>Whenever User click on Button (Clear Notifications) then delete all Notifications.</p>",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/whoAmI",
    "title": "Get Logged in User Details",
    "name": "loggedInUserDetails",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n  \n {\n   \"_id\" : \"bfyd3ozzMkBMaYi2j\",\n   \"createdAt\" : ISODate(\"2016-12-13T08:51:54.865Z\"),\n   \"services\" : {\n       \"password\" : {\n           \"bcrypt\" : \"$2a$10$goCwJEBWWz.WGtXwq2pJcOZA0a.Bj0zpV3QzlYmT2annfHRln1KS.\"\n       },\n       \"resume\" : {\n           \"loginTokens\" : [\n               {\n                   \"when\" : ISODate(\"2016-12-13T08:51:55.071Z\"),\n                   \"hashedToken\" : \"qa7ypOUFHkH8iB5qzbwuLb+S5tQEqsc79VP/bqv/2jU=\"\n               }\n           ]\n       }\n   },\n   \"emails\" : [\n       {\n           \"address\" : \"nitesh16.singh@gmail.com\",\n           \"verified\" : false\n       }\n   ],\n   \"secure\" : {\n       \"smsCode\" : \"\",\n       \"numberVerify\" : \"\",\n       \"passwordResetToken\" : \"\",\n       \"activationToken\" : \"057b4802e89d21e54712\"\n   },\n   \"metadata\" : {\n       \"smsVerified\" : \"\",\n       \"isActivated\" : true\n   },\n   \"connections\" : {\n       \"connected\" : [ ],\n       \"blocked\" : [ ],\n       \"following\" : [ ]\n   },\n   \"workspaces\" : [ ],\n   \"notifications\" : [ ],\n   \"pinned\" : [ ],\n   \"settings\" : {\n       \"phonePublic\" : true,\n       \"emailPublic\" : true,\n       \"addressPublic\" : true,\n       \"profilePrivate\" : false,\n       \"deactivated\" : false\n   },\n   \"profile\" : {\n       \"firstName\" : \"Nitesh\",\n       \"lastName\" : \"Singh\",\n       \"fullName\" : \"Nitesh Singh\",\n       \"company\" : \"\",\n       \"searchEmail\" : \"nitesh16.singhemailAtgmail.com\",\n       \"title\" : \"\",\n       \"phoneNumber\" : \"\",\n       \"streetAddress\" : \"\",\n       \"city\" : \"\",\n       \"state\" : \"\",\n       \"zip\" : \"\",\n       \"webAddress\" : \"\",\n       \"profileImage\" : \"https://smf.imgix.net/profilePhotos/defaultUser.png\",\n       \"linkedInProfileUrl\" : \"\",\n       \"facebookProfileUrl\" : \"\",\n       \"twitterProfileUrl\" : \"\",\n       \"subscription\" : null\n   },\n   \"status\" : {\n       \"online\" : true,\n       \"lastLogin\" : {\n           \"date\" : ISODate(\"2016-12-13T08:51:56.741Z\"),\n           \"ipAddr\" : \"127.0.0.1\",\n           \"userAgent\" : \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.100 Safari/537.36\"\n       },\n       \"idle\" : false\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  message :'User Not LoggedIn'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/markNotificationsRead",
    "title": "Mark All Notifications  to Read.",
    "name": "markNotificationsRead",
    "group": "User",
    "description": "<p>Whenever User click on Notifications icon Then mark all Notifications  as Read.</p>",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/updateProfile",
    "title": "Update User Profile",
    "name": "updateProfile",
    "group": "User",
    "examples": [
      {
        "title": "Input Example:",
        "content": "{ phoneNumber: 12345,searchEmail: 'tets@1',firstName :'abc', lastName:'xyz', fullName:'abc xyz' , handle: 'akesh'}",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Optional FirstName  of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Optional LastName of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>Optional FullName of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "company",
            "description": "<p>Optional Company of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "searchEmail",
            "description": "<p>Optional</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Optional</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Optional  Phone Number of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "streetAddress",
            "description": "<p>Optional Street Address of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>Optional City of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>Optional State of User</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zip",
            "description": "<p>Optional Zip of User's Residential State</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "webAddress",
            "description": "<p>Optional WebAddress of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profileImage",
            "description": "<p>Optional profile Image of User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "linkedInProfileUrl",
            "description": "<p>Optional Link of User's LinkedIn Profile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "facebookProfileUrl",
            "description": "<p>Optional Link of User's Facebook Profile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "twitterProfileUrl",
            "description": "<p>Optional Link of User's Twitter Profile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subscription",
            "description": "<p>Optional</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "handle",
            "description": "<p>Optional Handle Name of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dob",
            "description": "<p>Optional Date of Birth of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "relationship",
            "description": "<p>Optional Relationship of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Optional Gender of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "intro",
            "description": "<p>Optional Introduction of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Optional Zip Code of User's State</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "hiddenPosts",
            "description": "<p>Optional Posts Marked as Hidden by the User</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n   \n  {\n    \"company\": \"\",\n    \"title\": \"testing\",\n    \"streetAddress\": \"\",\n    \"city\": \"Hisar\",\n    \"state\": \"Harayana\",\n    \"webAddress\": \"testing\",\n    \"profileImage\": \"https://smf.imgix.net/profilePhotos/defaultUser.png\",\n    \"linkedInProfileUrl\": \"\",\n    \"facebookProfileUrl\": \"\",\n    \"twitterProfileUrl\": \"\",\n    \"subscription\": null,\n    \"hiddenPosts\": [],\n    \"fullName\": \"Nitesh Kumar Singh\",\n    \"lastName\": \"Singh\",\n    \"firstName\": \"Nitesh\",\n    \"searchEmail\": \"nitesh123@gmail.com\",\n    \"phoneNumber\": 8295507788,\n    \"zip\": 125001\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "if user is not Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n    \"message\": \"User not login\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/allPosts",
    "title": "Get All Post",
    "name": "allPost",
    "group": "posts",
    "examples": [
      {
        "title": "Input Example :",
        "content": "/allPosts?skip=0&limit=3&position=[28,73]",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   [\n  {\n    \"_id\": \"586338d40b7cf63146991405\",\n    \"content\": \"Hello world\",\n    \"author\": \"5858dc09f11b07405396d58b\",\n    \"updatedAt\": \"2016-12-28T04:21:13.000Z\",\n    \"__v\": 0,\n    \"peaceBy\": [\n        \"5858dc09f11b07405396d58b\"\n    ],\n    \"hidden\": false,\n    \"removed\": false,\n    \"dislikedBy\": [\n        \"5858dc09f11b07405396d58b\"\n    ],\n    \"likedBy\": [\n        \"5858dc09f11b07405396d58b\"\n    ],\n    \"createdAt\": \"2016-12-28T04:00:18.555Z\",\n    \"location\": {\n        \"coordinates\": [\n            28,\n            77\n        ],\n        \"type\": \"Point\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  message :'User Not LoggedIn'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/newsFeedPosts.js",
    "groupTitle": "posts"
  },
  {
    "type": "put",
    "url": "/hidePost",
    "title": "Hide Post",
    "name": "hidePost",
    "group": "posts",
    "examples": [
      {
        "title": "Input Example: ",
        "content": "{ postId:'586338d40b7cf63146991405'}",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "postId",
            "description": "<p>Mandatory.</p>"
          }
        ]
      }
    },
    "description": "<p>User can Hide Other Members posts. If Post is hidden then it will not on User screen or Wall.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n      \"company\": \"Daffodil software limited\",\n      \"title\": \"\",\n      \"streetAddress\": \"\",\n      \"city\": \"\",\n      \"state\": \"Harayana\",\n      \"webAddress\": \"\",\n      \"profileImage\": \"https://smf.imgix.net/profilePhotos/defaultUser.png\",\n      \"linkedInProfileUrl\": \"\",\n      \"facebookProfileUrl\": \"\",\n      \"twitterProfileUrl\": \"\",\n      \"subscription\": null,\n      \"hiddenPosts\": [\n          \"5858eb73e0a86c4b07ba220a\",\n          \"5858eb73e0a86c4b07ba220a\"\n      ],\n\n\t\"fullName\": \"Nitesh Singh\",\n\t\"lastName\": \"Singh\",\n\t\"firstName\": \"Nitesh\",\n\t\"zip\": 123441\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response  Content Missing ",
          "content": "\nHTTP/1.1 400 Not Found\n{\"message\":\"Need PostId to Hide Post\"}.",
          "type": "json"
        },
        {
          "title": "Error-Response:  If User Not logedIn ",
          "content": "HTTP/1.1 401 Not Found\n{\"message\": \"User Not logedIn\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/newsFeedPosts.js",
    "groupTitle": "posts"
  },
  {
    "type": "post",
    "url": "/newPost",
    "title": "Create New Post",
    "name": "newpost",
    "group": "posts",
    "examples": [
      {
        "title": "Input Example: ",
        "content": "{ content:'Hello world' : coordinates:[28,77] }",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Mandatory .</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "coordinates",
            "description": "<p>[0, 0]  Mandatory</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 Created\n {\n\t    \"__v\": 0,\n\t    \"content\": \"creating new Post\",\n\t    \"author\": \"5858dc09f11b07405396d58b\",\n\t    \"updatedAt\": \"2016-12-20T08:27:31.000Z\",\n\t    \"_id\": \"5858eb73e0a86c4b07ba220a\",\n\t    \"peaceBy\": [],\n\t    \"hidden\": false,\n\t    \"dislikedBy\": [],\n\t    \"likedBy\": [],\n\t    \"createdAt\": \"2016-12-20T08:27:11.583Z\",\n\t    \"location\": {\n\t        \"coordinates\": [\n\t            28,\n\t            77\n\t        ],\n\t        \"type\": \"Point\"\n\t    }\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response  Content Missing ",
          "content": "\nHTTP/1.1 400 Not Found\n\t{\t\n\t\"message\": \n\t\"Need Some important field to creating new Post\"\n\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:  If User Not logedIn ",
          "content": "HTTP/1.1 401 Not Found\n{\"message\": \"User Not logedIn\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/newsFeedPosts.js",
    "groupTitle": "posts"
  },
  {
    "type": "put",
    "url": "/updatePost",
    "title": "Update Post",
    "name": "updatePost",
    "group": "posts",
    "examples": [
      {
        "title": "Input Example: ",
        "content": "{ postId:'586338d40b7cf63146991405' , action:'like' , content: \"Hello updating content \" }",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "postId",
            "description": "<p>Mandatory.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>Optional (like,dislike,peace)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Optional</p>"
          }
        ]
      }
    },
    "description": "<p>User can Like,Dislike and peace of Post. User Can update the text or content of the post.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"_id\": \"586338d40b7cf63146991405\",\n    \"content\": \"Hello world\",\n    \"author\": \"5858dc09f11b07405396d58b\",\n    \"updatedAt\": \"2016-12-28T04:21:13.000Z\",\n    \"__v\": 0,\n    \"peaceBy\": [\n        \"5858dc09f11b07405396d58b\"\n    ],\n    \"hidden\": false,\n    \"removed\": false,\n    \"dislikedBy\": [\n        \"5858dc09f11b07405396d58b\"\n    ],\n    \"likedBy\": [\n        \"5858dc09f11b07405396d58b\"\n    ],\n    \"createdAt\": \"2016-12-28T04:00:18.555Z\",\n    \"location\": {\n        \"coordinates\": [\n            28,\n            77\n        ],\n        \"type\": \"Point\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response  Content Missing ",
          "content": "\nHTTP/1.1 400 Not Found\n{\"message\": \"Need Some important field to creating new Post\"}.",
          "type": "json"
        },
        {
          "title": "Error-Response:  If User Not logedIn ",
          "content": "HTTP/1.1 401 Not Found\n{\"message\": \"User Not logedIn\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/newsFeedPosts.js",
    "groupTitle": "posts"
  }
] });
