import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [data,setData] = useState('');
    return (
        <div className='h-[578px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-3xl'>Login</h2>
                <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="text" {...register("email")} placeholder="Email" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register("password")} placeholder="Password" className="input input-bordered w-full max-w-xs" />
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