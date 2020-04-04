const dotenv=require('dotenv');
dotenv.config({silent: true});

export const secret = process.env.API_SECRET;
export const url = process.env.MONGO_LOCAL;
export const senderMail = process.env.SENDER_MAIL;
export const senderPassword = process.env.SENDER_PASSWORD;
export const ROLES = process.env.ROLES;
export const database = process.env.MONGO_URL;
