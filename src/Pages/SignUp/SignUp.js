import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../contexts/hooks/useToken';

const SignUp = () => {

    const { register, handleSubmit, formState: {errors} } = useForm();

    // show spinner 
    const [isLoading , setLoading] = useState(false);
  
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    
    const [token] =useToken(createdUserEmail);
    
    const navigate = useNavigate();
    
    if(token){
        navigate('/');
    }

    
    const handleSignUp = (data, isLoading) => {
        console.log(data);  
            setSignUpError(''); 
           createUser(data.email, data.password)   
            .then( result => {        
                const user = result.user;
                console.log(user)
                toast.success('User Created Successfully')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                .then(() => {
                    saveUser( data.name, data.email );
                    
                })
                .catch(error => console.log(error))
            })
            .catch(error=> {
                console.error(error)
                setSignUpError(error.message)
            })
            
                   
    }

    const saveUser = (name, email) => {
        const user = {name, email};
        fetch('http://localhost:5000/users',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data=> {
            // getUserToken(email);
            setCreatedUserEmail(email);
            console.log(email)
        })   
    }

    // const getUserToken = (email) => {
    //     fetch(`http://localhost:5000/jwt?email=${email}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         if(data.accessToken){
    //             localStorage.setItem('accessToken',data.accessToken);
    //             console.log("hello");
    //             navigate('/');
    //         }
    //     })
       
    // }

    return (
        <div className='h-[578px] flex justify-center items-center'>
            { isLoading?  <h2 className='text-2xl'>Loading ....</h2> :
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
                    { signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account? <Link to="/login" className='text-primary'>Please Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full text-center'>CONTINUE WITH GOOGLE</button>
            </div>
            }
        </div>
    );
};

export default SignUp;