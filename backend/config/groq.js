const { Groq } = require('groq-sdk');
const dotenv = require('dotenv');

dotenv.config();

let groq;

if (process.env.GROQ_API_KEY) {
  groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
}

module.exports = groq;
