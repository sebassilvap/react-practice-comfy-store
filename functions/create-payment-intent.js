// domain/.netlify/functions/create-payment-intent

// ============================================================================
// **** set up the server -> Node Stuff
require('dotenv').config();

// which account we are trying to connect
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

// ============================================================================

// **** this is our initial setup where we pass our data to the the server
exports.handler = async function (event, context) {
  // from this function -> return an object

  // what we have in event
  //console.log(event); // this is string, let's parse to body

  // for not creating bugs if I right away navigate to the page (if statment)
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
    //console.log(cart);

    // function that gets me the amount
    const calculateOrderAmount = () => {
      return shipping_fee + total_amount; // my TOTAL
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(), // this is why we set the amount in CENTS!!
        currency: 'usd',
      });
      return {
        statusCode: 200, // success
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {}
    return {
      statusCode: 500, // server error
      body: JSON.stringify({ msg: error.message }),
    };
  }
  return {
    statusCode: 200,
    body: 'Create Payment Intent',
  };
};
