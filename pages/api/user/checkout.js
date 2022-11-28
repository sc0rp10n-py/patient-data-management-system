//creating a checkout page to add items to the cart and then pay for them:
/*import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useState } from "react";
import { useRouter } from "next/router";
import { SessionProvider } from 'next-auth/react';
import { useSession } from "next-auth/react";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
    const [session, loading] = useSession();
    const router = useRouter();
    const [cart, setCart] = useState([]);
    
    if (typeof window !== "undefined" && loading) return null;
    if (!session) {
        router.push("/login");
        return null;
    }
    
    return (
        <Elements stripe={stripePromise}>
        <CheckoutForm />
        </Elements>
    );
    }*/ 
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    export default async function Checkout(req, res) {
      try{
      const items = [
        {
          name: 'Donation',
          price: 1000,
          quantity: 1
        
    },
    {
      name: 'Donation',
      price: 1000,
      quantity: 1
    }
  ]


    //calculate the total amount to be paid:
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    //create a checkout session:
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => {
        return {
          quantity: item.quantity,
          price_data: {
            currency: 'inr',
            product_data: {
              name: item.name
            },
            unit_amount: item.price,
          },
          //currency: 'inr'
        }
      }
      ),
      mode: 'payment',
      success_url: `https://google.com`,
        cancel_url: `https://google.com`,
    })
    res.redirect(303, session.url);
  }catch(err){
    console.log(err);
  }

  } 
    