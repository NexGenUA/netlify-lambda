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

  const {serial} = event.queryStringParameters;

  const registeredSn = {
    added: true,
  }

  try {
    await Sn.findOneAndUpdate({serial}, registeredSn);
    return {
      statusCode: 200,
      body: 'success',
    }
  } catch {
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    }
  }

};
