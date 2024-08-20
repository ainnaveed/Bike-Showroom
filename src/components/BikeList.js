import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style_components/style.css';
import { useAuth } from '../context/AuthContext';

function BikeList() {
  const [bikes, setBikes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bikeToDelete, setBikeToDelete] = useState(null);

  const { isAuthenticated, roles } = useAuth();
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('https://radiantrides-backend.onrender.com/api/bikes')
      .then((res) => {
        setBikes(res.data);
        console.log("fetched:",res.data);
      })
      .catch((error) => {
        console.error('Error fetching bikes:', error);
      });
  }, []);

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);

    const filteredBikes = bikes.filter(
      (bike) =>
        bike.brand.toLowerCase().includes(value.toLowerCase()) ||
        bike.model.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredBikes);
  };

  const handleSelectBike = (bike) => {
    setSelectedBike(bike);
    setSearchInput(`${bike.brand} - ${bike.model}`);
    setSearchResults([]);
  };

  const handleSearchButtonClick = () => {
    if (selectedBike) {
      navigate(`/bikes/${selectedBike._id}`);
    }
  };

  const openDeleteModal = (bike) => {
    setBikeToDelete(bike);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = async (bikeId) => {
    const bikeToDelete = bikes.find((bike) => bike._id === bikeId);
    openDeleteModal(bikeToDelete);
  };

  const confirmDelete = async () => {
    if (bikeToDelete) {
      try {
        // Send a DELETE request to the backend to delete the bike
        const response = await axios.delete(`https://radiantrides-backend.onrender.com/api/bikes/${bikeToDelete._id}`);
        
        if (response.status === 200) {
          alert('Bike deleted successfully');
          console.log('Bike deleted successfully');
          closeDeleteModal();
          window.location.reload();
        } else {
          console.error('An error occurred while deleting the bike');
        }
      } catch (error) {
        console.error('An error occurred while deleting the bike:', error);
      }
    }
  };

  return (
    <div>
      <div className="bg-image-container">
        <div className="bg-image" style={{ backgroundImage: `url('/images/bike.jpg')` }}>
          <div><h2 className="h2">RIDE THE BIKE OF YOUR DREAM!!</h2></div>
          <div className="search-container">
            <div className="input-container">
              <input
                type="text"
                placeholder="Search for a bike..."
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              {searchResults.length > 0 && (
                <div className="search-results">
                  <ul>
                    {searchResults.map((bike) => (
                      <li key={bike._id} onClick={() => handleSelectBike(bike)}>
                        {bike.brand} - {bike.model}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button className="search-button" onClick={handleSearchButtonClick}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {bikes.map((bike) => (
          <div className="col-md-4 col-lg-3 col-sm-6 my-2" key={bike._id}>
            <div className="card">
              <img src={bike.imageblack} className="card-img-top" alt={bike.brand} />
              <div className="card-body">
                <h5 className="card-title">
                  {bike.brand} - {bike.model}
                </h5>
                <p className="card-text">Price: ₹ {bike.price}</p>
                <Link to={`/bikes/${bike._id}`} className="btn btn-primary">
                  View Details
                </Link>
                {isAuthenticated && roles.includes('Admin') && (
                    <Link to={`/bikes/${bike._id}/edit`} className="btn btn-secondary my-1 mx-1">
                      Edit
                    </Link>
                )}
                {isAuthenticated && roles.includes('Admin') && (
                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(bike._id)}>
                      Delete
                    </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showDeleteModal}
        onHide={closeDeleteModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You are about to delete the following bike from the list:
          </p>
          <div className="text-center">
            <strong>{bikeToDelete?.brand} - {bikeToDelete?.model}</strong>
          </div>
          <p>
            If you proceed, all associated data and information related to this bike will be lost.
          </p>
          <p className="text-danger font-weight-bold">
            Are you certain you want to delete this bike?
          </p>
        </Modal.Body>


        <Modal.Footer>
          <button className="btn btn-secondary" onClick={closeDeleteModal}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={confirmDelete}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BikeList;
