import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    
    const navigate = useNavigate();

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    console.log(imageHostKey);

    const { data: specialities = [], isLoading} = useQuery({
        queryKey: ['speciality'],
        queryFn: ()=> fetch('http://localhost:5000/appointmentSpeciality')
        .then(res=> res.json())
    })
    
    
    const handleAddDoctor = (data) => {     
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`,{
            method: 'POST',
            body: formData
        })
        .then(res=> res.json())
        .then(imgData=>{
            if(imgData.success){
                console.log(imgData.data.url);
                const doctor = {
                    name: data.name,
                    email: data.email,
                    speciality: data.speciality,
                    image: imgData.data.url
                }
                // save doctors information to the database
                fetch(`http://localhost:5000/doctors`,{
                    method: 'POST',
                    headers: {
                        'content-type' : 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res=> res.json())
                .then(result =>{
                    console.log(result)
                    toast.success(`Doctor ${data.name} is added successfully`);
                    navigate('/dashboard/managedoctors')
                })
            }
        })
        .catch(error => console.error(error));
    }


    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='w-96 p-7'>
            <h2 className="text-3xl">Add a New Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
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
                        <label className="label"><span className="label-text">Speciality</span></label>
                        <select {...register("speciality", {
                            required: "Speciality is required",
                        })}
                        className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Please select a speciality?</option>
                            { specialities.map(speciality=> <option 
                                key={speciality._id}
                                value={speciality.name}
                                >{speciality.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Photo</span></label>
                        <input type="file" 
                        {...register("image",{
                            required: "Photo is required",
                        })}placeholder="photo" className="input input-bordered w-full max-w-xs" />
                        {errors.img && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                    </div>
                    <input value="Add a Doctor" className='btn btn-accent w-full text-white mt-4' type="submit" />
                    {/* { signUpError && <p className='text-red-600'>{signUpError}</p>} */}
                </form>
        </div>
    );
};

export default AddDoctor;