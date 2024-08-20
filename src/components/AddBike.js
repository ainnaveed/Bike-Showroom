import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style_components/EditBike.css';
import {useAuth} from '../context/AuthContext';

function AddBike() {
  const navigate = useNavigate();
  const {isAuthenticated,roles} = useAuth();

  const initialBikeState = {
    brand: '',
    model: '',
    price: '',
    mileage: 0,
    weight: 0,
    EngineCapacity: '',
    FuelTankCapacity: '',
    SeatHeight: 0,
    imageblack: '',
    imageblue: '',
    imagered:'',
    image1: '',
    image2: '',
    image3: '',
  };

  const [bike, setBike] = useState(initialBikeState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBike({ ...bike, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    for (const key in bike) {
      if (!bike[key]) {
        setErrorMessage('Please fill in all fields');
        return;
      }
    }

    axios
      .post('https://radiantrides-backend.onrender.com/api/bikes', bike) 
      .then((response) => {
        console.log('Bike added:', response.data);
        navigate(`/bikes/${response.data._id}`);
      })
      .catch((error) => {
        console.error('Error adding bike:', error);
      });
  };

  return (
    <div>
    {isAuthenticated && roles.includes("Admin") ? (
    <div className="edit-bike-container">
      <h2>Add New Bike</h2>
      <form className="edit-bike-form" onSubmit={handleFormSubmit}>
        <div className="form-row">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={bike.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={bike.model}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={bike.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="mileage">Mileage (kmpl) </label>
          <input
            type="number"
            id="mileage"
            name="mileage"
            value={bike.mileage}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={bike.weight}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="EngineCapacity">Engine Capacity (cc)</label>
          <input
            type="text"
            id="EngineCapacity"
            name="EngineCapacity"
            value={bike.EngineCapacity}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="FuelTankCapacity">Fuel Tank Capacity (litres)</label>
          <input
            type="text"
            id="FuelTankCapacity"
            name="FuelTankCapacity"
            value={bike.FuelTankCapacity}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="SeatHeight">Seat Height (mm)</label>
          <input
            type="number"
            id="SeatHeight"
            name="SeatHeight"
            value={bike.SeatHeight}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="imageblack">Image (Black)</label>
          <input
            type="text"
            id="imageblack"
            name="imageblack"
            value={bike.imageblack}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="imageblue">Image (Blue)</label>
          <input
            type="text"
            id="imageblue"
            name="imageblue"
            value={bike.imageblue}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="imagered">Image (Red)</label>
          <input
            type="text"
            id="imagered"
            name="imagered"
            value={bike.imagered}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="image1">Image (Angle 1)</label>
          <input
            type="text"
            id="image1"
            name="image1"
            value={bike.image1}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="image2">Image (Angle 2)</label>
          <input
            type="text"
            id="image2"
            name="image2"
            value={bike.image2}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="image3">Image (Angle 3)</label>
          <input
            type="text"
            id="image3"
            name="image3"
            value={bike.image3}
            onChange={handleInputChange}
          />
        </div>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Add Bike</button>
        
      </form>
    </div>
    ) : (
        <p>No Admin access</p>
    )}
    </div>
  );
}

export default AddBike;
