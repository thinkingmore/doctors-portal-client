import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns/esm';
import React, { useState } from 'react';
import BookingModal from '../Appointment/BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointment = ({selectedDate}) => {
    // const [appointmentOptions,  setAppointmentOptions] = useState([]);
    const [treatment,  setTreatment] = useState(null);

    const { data: appointmentOptions = []} = useQuery({
        queryKey: ['appointmentOptions'],
        queryFn: () => fetch('http://localhost:5000/appointmentOptions')
        .then(res => res.json())
    })
    
    // useEffect(()=>{
    //     fetch('http://localhost:5000/appointmentOptions')
    //     .then(res=>res.json())
    //     .then(data=>setAppointmentOptions(data))
    // },[])
    
    return (
        <section className='mt-16'>
            <p className='text-secondary text-center font-bold text-xl'>Available Appointments on {format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    appointmentOptions.map(option=><AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}                       
                    >
                    </AppointmentOption>
                        )
                }
            </div>
            {
                treatment &&
            <BookingModal      
             treatment={treatment}
             selectedDate={selectedDate}
             setTreatment={setTreatment}
            >             
            </BookingModal>}
        </section>
    );
};

export default AvailableAppointment;