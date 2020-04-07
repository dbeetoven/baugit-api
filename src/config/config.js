
  const dotenv=require('dotenv');
  dotenv.config({silent: true});
  
module.exports = {
  secret: process.env.API_SECRET,
  url: process.env.MONGO_LOCAL,
  senderMail: process.env.SENDER_MAIL,
  senderPassword: process.env.SENDER_PASSWORD,
  ROLES: process.env.ROLES,
  database: process.env.MONGO_URL,
  googleCLientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
  googleCallBack:process.env.GOOGLE_CALLBACK_URL,
  sessionSecret:process.env.SESSION_SECRET,
  port:process.env.PORT,
  corsError: 'The CORS policy for this site does not allow access from the specified Origin.',
  whitleListDomain: ['http://localhost:3000','http://alloweddomain.com']
};
