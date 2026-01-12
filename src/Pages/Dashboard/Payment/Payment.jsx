import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLocation } from "react-router";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
    const location = useLocation();
    const { price, type, issueId } = location.state || { price: 1000, type: 'subscription' };

    return (
        <div className="min-h-screen p-8">
            <h2 className="text-3xl font-bold text-center mb-10 text-primary">Payment</h2>
            <div className="text-center mb-8">
                <p className="text-xl">Payment Amount: <span className="font-bold">{price} Tk</span></p>
                <p className="badge badge-secondary badge-lg mt-2 uppercase">{type}</p>
            </div>
            
            <div className="w-full">
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price} type={type} issueId={issueId} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;