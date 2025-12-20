import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CheckoutForm = ({ price, type, issueId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (price > 0) {
      axios.post("http://localhost:3000/create-payment-intent", { price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      Swal.fire("Error", error.message, "error");
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      console.log("confirm error", confirmError);
      setProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        // Save payment to database
        const paymentInfo = {
          email: user.email,
          name: user.displayName,
          price: price,
          transactionId: paymentIntent.id,
          date: new Date(), // utc date convert. use moment js to 
          type: type, // 'subscription' or 'boost'
          issueId: issueId || null,
          status: 'success'
        };

        const res = await axios.post("http://localhost:3000/payments", paymentInfo);
        
        if (res.data?.insertedId) {
            Swal.fire("Success", "Payment Successful!", "success");
            
            if(type === 'subscription') {
                navigate('/dashboard/profile');
            } else {
                navigate('/dashboard/my-issues');
            }
        }
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-sm bg-base-100">
      <div className="mb-6 border p-4 rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button 
        className="btn btn-primary w-full text-white" 
        type="submit" 
        disabled={!stripe || !clientSecret || processing}
      >
        {processing ? "Processing..." : `Pay ${price} Tk`}
      </button>
    </form>
  );
};

export default CheckoutForm;