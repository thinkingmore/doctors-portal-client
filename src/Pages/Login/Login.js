import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../contexts/hooks/useToken';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [loginError, setLoginError] = useState('');

    const [loginUserEmail, setLoginUserEmail] = useState('');

    const [token] = useToken(loginUserEmail);

    const { signIn} = useContext(AuthContext);
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const form = location.state?.form?.pathname || '/';
    
    if(token){
        navigate(form, {replace: true});
    }


    const handleLogin = (data) => {
        setLoginError('');
        console.log(data)
        signIn(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            setLoginUserEmail(data.email);
           
        })
        .catch(error => {
            console.error(error)
            setLoginError(error.message);
        });
        
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
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters or longer" }
                        })} 
                        placeholder="Password" className="input input-bordered w-full max-w-xs" />
                         {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                        <label className="label"><span className="label-text text-primary">Forget password?</span></label>
                    </div>
                    <input value="Login" className='btn btn-accent w-full text-white' type="submit" />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p> }
                    </div>    
                </form>
                <p>New to Doctors Portal? <Link to="/signup" className='text-primary'>Create new account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full text-center'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;