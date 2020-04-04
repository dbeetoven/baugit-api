
  const dotenv=require('dotenv');
  dotenv.config({silent: true});
  
module.exports = {
  secret: process.env.API_SECRET,
  url: process.env.MONGO_LOCAL,
  senderMail: process.env.SENDER_MAIL,
  senderPassword: process.env.SENDER_PASSWORD,
  ROLES: process.env.ROLES,
  database: process.env.MONGO_URL,
};
