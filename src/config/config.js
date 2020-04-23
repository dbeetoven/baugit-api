
  const dotenv=require('dotenv');
  dotenv.config({silent: true});
  
module.exports = {
  secret: process.env.API_SECRET,
  url: process.env.MONGO_LOCAL,
  ROLES: process.env.ROLES,
  database: process.env.MONGODB_URL,
  port:process.env.PORT,
  corsError: 'The CORS policy for this site does not allow access from the specified Origin.',
  whitleListDomain: ['http://localhost:3000','https://baugitapi.herokuapp.com']
};
