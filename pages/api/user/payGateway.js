const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      //to het the amount from the form
      const amount = req.body.amount;
      var val=0;
      //running a loop to get the amount from the form:
      for (let i = 0; i < amount.length; i++) {
           if(i==0){
            if(amount[i]==''){
              amount[i]=0;
            }
            val+=parseInt(amount[i])*1000;
           }
           else if(i==1){
            if(amount[i]==''){
              amount[i]=0;
            }
            val+=parseInt(amount[i])*100;
           }
            else if(i==2){
              if(amount[i]==''){
                amount[i]=0;
              }
              val+=parseInt(amount[i])*10;
            }
            else if(i==3){
              if(amount[i]==''){
                amount[i]=0;
              }
              val+=parseInt(amount[i])*5;
            }
      }
      console.log(amount);
      const session = await stripe.checkout.sessions.create({
        /*line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1Lx685SGMxWzq7G0k486b530',
            quantity: 1,
            //price:'price_1Lx685SGMxWzq7G0k486b530',
            //quantity: 1
           //set option for selecting either one of the two products as:

          },
            ],*/
                      //use the amount from the form
          line_items: [
            {
              price_data: {
                currency: 'inr',
                product_data: {
                  name: 'Total Amount',
                },
                unit_amount: val*100,
              },
              quantity: 1,
            },
          ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}