// utils/mongodb.js

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mohdsaqib148183:sBGe2PYPBKAHiMbY@cluster0.nqubecq.mongodb.net/codeswear';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function disconnect() {
  try {
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
}

module.exports = { connect, disconnect, client };
