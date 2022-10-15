// domain/.netlify/functions/hello

exports.handler = async function (event, context) {
  // from this function -> return an object
  return {
    statusCode: 200, // successful response
    body: 'Hello World',
  };
};
