var settings = {

  aws: {
        accessKeyId: "******",
        secretAccessKey: "",
  },
  s3bucket: {
        name: "test",
  },
    
  facebook: {
    clientID: '*****',
    clientSecret: '',
    callbackURL: 'http://127.0.0.1:1337/auth/facebook/callback'
  },
  twitter: {
    consumerKey: '',
    consumerSecret: '',
    callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
  },
  github: {
    clientID: '',
    clientSecret: '',
    callbackURL: "http://127.0.0.1:1337/auth/github/callback"
  },
  google: {
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://127.0.0.1:1337/auth/google/callback'
  },
  instagram: {
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://127.0.0.1:1337/auth/instagram/callback'
  },
  linkedin: {
    consumerKey: '',
    consumerSecret: '',
    callbackURL: 'http://127.0.0.1:1337/auth/linkedin/callback'
  },
  dbUrl : "mongodb://localhost/",
  dbName : "demo",
  PORT:5400,
};

module.exports = settings;