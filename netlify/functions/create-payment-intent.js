require('dotenv').config();
const stripe = require('stripe')(
  'sk_test_51LsleWCuydRULHKQbGcjU7RjlDodf0U8SBUQpX0l1uUFguEortnUvDfFnAP5tCj9IT4REnuUIQklC6Rf78Ao4ofB00USfHyeCz'
);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
