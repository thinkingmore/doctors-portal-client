import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOutForm = ({booking}) => {
    
    const [clientSecret,setClientSecret] = useState("");
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const {price, email, patient} =  booking;


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json", 
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
          body: JSON.stringify({ price }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, [price]);
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        if( !stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if(error){
            console.log(error);
            setCardError(error.message);
        }
        else{
            setCardError('');
        }

        const { paymentIntent , error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
        card: card,
        billing_details: {
            name: patient,
            email: email

                    },
                },
            },
        );
        if(confirmError){
            setCardError(confirmError.message);
            return;
        }
        console.log('paymentIntent', paymentIntent)
        if(paymentIntent.status === "succeeded"){
            setSuccess('Congrats! your payment completed');
            setTransactionId(paymentIntent.id)
        }
       

    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                    style: {
                        base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                        color: '#9e2146',
                        },
                    },
                    }}
                />
                <button className='btn btn-sm mt-4 btn-primary text-white' 
                    type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className="text-green-500">{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </div>
    );
};

export default CheckOutForm;