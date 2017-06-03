const config = require('../../config')
const keySecret = process.env.stripeKeySecretTest || config.stripe.keySecret;
const keyPublishable = process.env.stripeKeyPublishableTest|| config.stripe.keyPublishable;
const stripe = require('stripe')(keySecret)
const sqlService = require('../services/sqlService');
const q = require('q')


module.exports = {

  createCustomer (req, res) {
    let token = req.body.token;

    stripe.customers.create({
      email: token.email,
      source: token.id
    }).then(customer =>{
      console.log('now save customer info')
      sqlService.saveStripeCustomer(customer, req.user.user_id)
      .then((result)=>{
        console.log('saveStripeCustomer dot then',result)
        res.status(200).send("Customer Created and Saved to DB")
      })
    })
  },

  chargeCustomer (user_id, amount, description) {
    var dfd = q.defer();
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
              dfd.resolve(dbRes)
            })
        })
      })
      return dfd.promise;
  }

}
