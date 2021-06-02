import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

export const getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500);
      throw new Error(err.message);
    } else {
      res.send(response);
    }
  });
};

export const processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  let orderId = req.body.orderId;
  gateway.merchantAccount.createForCurrency({
    currency: "INR",
  });
  gateway.transaction.sale(
    {
      orderId: orderId,
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500);
        throw new Error(err.message);
      } else {
        res.json(result);
      }
    }
  );
};
