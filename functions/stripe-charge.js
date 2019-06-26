// Run: netlify-lambda serve functions

const stripe = require('stripe')('sk_test_da41dFQq1mBKDwep5cESnWGn008S5F8yfN')  // secret key

exports.handler = async function(event) {
  // console.log('=====', event)
  const {
    tokenId,
    email,
    name,
    description,
    amount
  } = JSON.parse(event.body)

  const customer = await stripe.customers.create({
    description: email,
    source: tokenId
  })

  await stripe.charges.create({
    customer: customer.id,
    amount,
    name,
    description,
    currency: 'usd'
  })
}