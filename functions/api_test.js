// domain/.netlify/functions/api_test

const items = [
  { id: 1, name: 'john' },
  { id: 2, name: 'susan' },
];

exports.handler = async function (event, context) {
  // from this function -> return an object
  return {
    statusCode: 200, // successful response
    body: JSON.stringify(items),
  };
};
