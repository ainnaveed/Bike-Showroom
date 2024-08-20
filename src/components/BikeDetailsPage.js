import React from 'react';
import { useParams } from 'react-router-dom';
import BikeDetails from './BikeDetails';

function BikeDetailsPage() {
  const { id } = useParams();
  //console.log('bikeId:', bikeId);
  return (
    <BikeDetails id={id} />
  );
}

export default BikeDetailsPage;