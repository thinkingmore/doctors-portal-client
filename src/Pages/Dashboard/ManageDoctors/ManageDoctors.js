import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {

    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const closeModal = () => {
        setDeletingDoctor(null)
    }

    const { data: doctors = [], refetch, isLoading } = useQuery({
        queryKey: ['doctors'],
        queryFn: () => fetch('http://localhost:5000/doctors',{
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=> res.json())
        .catch(error=> console.error(error))
    })

    if(isLoading){
        return <Loading></Loading>
    }

    const handleDeleteDoctor = (doctor) => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`,{
            method: 'DELETE',
            headers: {
                'content-type' : 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
        .then(res=> res.json())
        .then(data=> {
            if(data.deletedCount > 0){
            refetch();
            toast.success(`Doctor ${doctor.name} deleted successfully`);
            }   
        })
    }
    
    return (
        <div>
            <h2 className="text-3xl">Manage Doctors {doctors.length}</h2>
                <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                       <th></th>
                       <th>Avatar</th>
                       <th>Name</th>
                       <th>Email</th>
                       <th>Speciality</th>
                       <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        doctors.map((doctor,i)=>
                            <tr 
                                key={doctor._id}
                                value={doctor.value}
                                >
                                <th>{i +1 }</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={doctor.image} alt="doctors" />
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.speciality}</td>
                                <td><label htmlFor="confirmation-modal" onClick={()=> setDeletingDoctor(doctor)} className="btn btn-xs btn-error text-white">Delete</label></td>
                            </tr>
                            )
                      }
                  </tbody>
                </table>
              </div>
              {
                deletingDoctor && <ConfirmationModal
                        title={`Are you sure you want to delete?`}
                        message={`if you delete ${deletingDoctor.name},it can't be undone`}
                        closeModal = {closeModal}
                        successAction={handleDeleteDoctor}
                        successButtonName = "Delete"
                        modalData={deletingDoctor} 
                        refetch={refetch}>
                    </ConfirmationModal>
              }
        </div>
    );
};

export default ManageDoctors;