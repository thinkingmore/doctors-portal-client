import React from 'react';
import appointment from '../../../assets/images/appointment.png'

const Contact = () => {
    return (
        <section className='hero h-min p-12' 
        style={{
           background: `url(${appointment})`
        }}
        >
            <form className='grid grid-cols-1 space-y-6'>
                <p className="text-xl text-primary text-center">Contact Us</p>
                <p className="text-4xl text-white">Stay connected with us</p>
                <div className="form-control lg:w-96" >
                    <input type="text" placeholder="Email Adress" className="input input-bordered" />
                </div>
                <div className="form-control lg:w-96">
                    <input type="text" placeholder="Subject" className="input input-bordered" />
                </div>
                <div className="form-control lg:w-96">
                    <input type="text" placeholder="Your Message" className="input input-bordered h-32" />
                </div>
                <button className="btn w-32 btn-primary mx-auto bg-gradient-to-r from-primary to-secondary text-white">Submit</button>
            </form>
        </section>
        
    );
};

export default Contact;