import React from 'react';

const InfoCard = ({card}) => {
    const {name, description, bgClass, icon} = card;
    return ( 
        <div className={`card mt-8 text-white p-6 md:card-side bg-base-100 shadow-xl ${bgClass}`}>
           <figure>
            <img src={icon} alt="Movie"/>
           </figure>
          <div className="card-body">
            <h2 className="card-title">New movie is released!</h2>
            <p>{description}</p>
          </div>
        </div>
    );
};

export default InfoCard;