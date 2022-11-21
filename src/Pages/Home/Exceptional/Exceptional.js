import React from 'react';
import treatment from '../../../assets/images/treatment.png'

const Exceptional = () => {
    return (
        <div className="grid md:grid-cols-2 p-12 mt-8 gap-4">
            <div>
                <img src={treatment} style={{width: "458px"}} alt="exceptional"/>
            </div>    
            <div className='grid content-center space-y-8 '>
                <h3 className='text-5xl'>
                    Exceptional Dental 
                    <br/> Care,on Your Terms
                </h3>
                <p className='text-base text-start'>
                It is a long established fact that a reader will be distracted by 
                the readable content of a page when looking at its 
                layout. The point of using Lorem Ipsumis that it has a 
                more-or-less normal distribution of letters,as opposed to using 
                'Content here, content here', making it look like 
                readable English. Many desktop publishing packages and web page
                </p>
                <button className="btn w-32 btn-primary bg-gradient-to-r from-primary to-secondary text-white">Get Started</button>
            </div>
        </div>
    );
};

export default Exceptional;