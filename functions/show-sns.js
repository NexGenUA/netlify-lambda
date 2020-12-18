const Sn = require('./models/sn.model');
const dbConnect = require('../db/connectDb');

exports.handler = async (event) => {

  try {
    await dbConnect();
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Connection DB error.',
      })
    }
  }

  const entities = await Sn.find({ added: true });

  return {
    statusCode: 200,
    body: JSON.stringify(entities),
  }
};
