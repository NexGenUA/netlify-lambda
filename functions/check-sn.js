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

  const entity = await Sn.findOne({serial});

  let statusCode = 404;
  let body = {
    message: 'Not Found',
  };

  if (entity) {
    body = entity;
    statusCode = 200;
  }

  return {
    statusCode,
    body: JSON.stringify(body),
  }
};
