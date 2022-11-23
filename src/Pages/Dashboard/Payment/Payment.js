import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_Stripe_Pk);

console.log(stripePromise);

const Payment = () => {
    const booking = useLoaderData();
    const { treatment, price, appointmentDate, patient, slot, email, phone} = booking;
    
    
    return (
        <div>
            <h2 className='text-3xl'>Payment for {treatment}</h2>
            <p className="text-xl">Please pay <strong>$ {price} </strong> for your appointment on {appointmentDate} at {slot}</p>
            <div className='w-96 my-12'>
            <Elements stripe={stripePromise}>
                <CheckOutForm 
                    booking={booking}
                />
            </Elements>
            </div>
        </div>
    );
};

export default Payment;