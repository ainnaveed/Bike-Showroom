import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../style_components/EditBike.css';

function EditBike() {
  const { isAuthenticated, roles } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [bike, setBike] = useState({
    brand: '',
    model: '',
    price: '', 
    mileage: 0, 
    weight: 0,
    EngineCapacity: '',
    FuelTankCapacity: '',
    SeatHeight: 0, 
  });

  useEffect(() => {
    if (isAuthenticated && roles.includes('Admin')) {
      axios
        .get(`https://radiantrides-backend.onrender.com/api/bikes/${id}`)
        .then((response) => {
          setBike(response.data);
        })
        .catch((error) => {
          console.error('Error fetching bike details:', error);
        });
    } else {
      navigate('/');
    }
  }, [id, isAuthenticated, navigate, roles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBike({ ...bike, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://bikeshowroom-backend.onrender.com/api/bikes/${id}`, bike)
      .then((response) => {
        console.log('Bike details updated:', response.data);
        navigate(`/bikes/${id}`);
        alert("Bike details have been successfully updated !");
      })
      .catch((error) => {
        console.error('Error updating bike details:', error);
      });
  };

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className="edit-bike-container">
      <h2>Edit Bike Details</h2>
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
          <label htmlFor="mileage">Mileage (kmpl)</label>
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
        
        <button type="submit">Save Changes</button>
        <button className='btn btn-danger' onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditBike;
