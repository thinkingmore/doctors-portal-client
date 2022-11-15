import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [data,setData] = useState('');
    
    const handleLogin = (data) => {
        console.log(data)
        
    }
    return (
        <div className='h-[578px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-3xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="text" {...register("email",{
                            required:"Email Address is required"
                        })} 
                        placeholder="Email" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register("password",{
                            required: "Password is required"
                        })} 
                        placeholder="Password" className="input input-bordered w-full max-w-xs" />
                         {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                        <label className="label"><span className="label-text text-primary">Forget password?</span></label>
                    </div>
                    <input value="Login" className='btn btn-accent w-full text-white' type="submit" />
                </form>
                <p>New to Doctors Portal? <Link to="/" className='text-primary'>Create new account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full text-center'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;