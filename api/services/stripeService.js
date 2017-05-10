const config = require('../../config')
const keySecret = config.stripe.keySecret;
const keyPublishable = config.stripe.keyPublishable;
const stripe = require('stripe')(keySecret)


module.exports = {
  

}
