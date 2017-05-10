const config = require('../../config')
const keySecret = config.stripe.keySecret;
const keyPublishable = config.stripe.keyPublishable;
const stripe = require('stripe')(keySecret)
const sqlService = require('../services/sqlService')


module.exports = {

  createCustomer (req, res) {
    let token = req.body.token;

    stripe.customers.create({
      email: token.email,
      source: token.id
    }).then(customer =>{
      sqlService.saveStripeCustomer(customer, req.user.user_id).then((result)=>{
        res.status(200).send("Customer Created and Saved to DB")
      })
    })
  },

  chargeCustomer (user_id, amount, description) {
    console.log(user_id, amount)
    //get customerId from DB and save to variable
    //req.body needs amount $5 = 500
    sqlService.findStripeCustomer(user_id)
      .then((customer_id)=> {
        stripe.charges.create({
          amount: amount,
          currency: 'usd',
          customer: customer_id,
          description: description,
        }).then((charge)=>{
          console.log(charge)
          sqlService.saveChargeInfo(charge, user_id)
            .then((dbRes)=>{
              console.log(dbRes)
            })
        })
      })
  }

}
