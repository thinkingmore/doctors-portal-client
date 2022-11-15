import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const SignUp = () => {

    const { register, handleSubmit, formState: {errors} } = useForm();

    const { createUser } = useContext(AuthContext);
    
    const handleSignUp = (data) => {
        console.log(data);
        // console.log(errors);
           
           createUser(data.email, data.password)
            .then( result => {
                const user = result.user;
                console.log(user)
            })
            .catch(error=> console.error(error))
                   
    }
    return (
        <div className='h-[578px] flex justify-center items-center'>  
            <div className='w-96 p-7'>
                <h2 className='text-3xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text" 
                        {...register("name",{
                            required: "Name is required",
                        })}placeholder="Name" className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" 
                        {...register("email", {
                            required: "Email is required",
                        })} placeholder="Email" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}                    
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" 
                        {...register("password",{
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters or longer" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters'}
                        })}placeholder="Password" className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                    </div>
                    <input value="Sign Up" className='btn btn-accent w-full text-white mt-4' type="submit" />
                </form>
                <p>Already have an account? <Link to="/login" className='text-primary'>Please Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full text-center'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;