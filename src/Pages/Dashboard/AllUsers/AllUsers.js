import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {

    const { data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch('http://localhost:5000/users')
        .then(res=> res.json())
    });

    const handleMakeAdmin = (id) =>{
        fetch(`http://localhost:5000/users/admin/${id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: ` bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify()
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.modifiedCount > 0) {
                toast.success("admin role successfully given");
                refetch();
            }
        })
    }
    return (
        <div>
            
            <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {
                        users.map((user,i)=> 
                            <tr key={user._id}>
                                <th>{i +1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{ user?.role !== 'admin' &&  <button onClick={()=>handleMakeAdmin(user._id)} className="btn btn-xs btn-primary text-white">Make Admin</button>}</td>
                                <td><button className="btn btn-xs btn-warning text-white">Delete</button></td>
                            </tr>
                            )
                    }
                    
                </tbody>
            </table>
            </div> 
        </div>
    );
};

export default AllUsers;