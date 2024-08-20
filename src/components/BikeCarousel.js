import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import '../style_components/slick-slider.css';

const BikeCarousel = () => {
  const [allBikes, setAllBikes] = useState([]);

  useEffect(() => {
    // Fetch all bikes for the carousel
    axios
      .get('https://radiantrides-backend.onrender.com/api/bikes')
      .then((response) => {
        setAllBikes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching all bikes:', error);
      });
  }, []);


  const NextArrow = (props) => (
    <div className="slick-arrow slick-next" onClick={props.onClick}>
      <i className="fa fa-angle-right" />
    </div>
  );

  const PrevArrow = (props) => (
    <div className="slick-arrow slick-prev" onClick={props.onClick}>
      <i className="fa fa-angle-left" />
    </div>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll:2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll:1,
        },
      },
    ],
    
  };

  return (
    <div className="bike-carousel">
    <h2 style={{
      marginBottom: "10px",
      marginTop: "15px",
      marginLeft: "20px",
    }}>
      Discover Other Bikes
    </h2>


      <Slider {...sliderSettings}>
        {allBikes.map((bike) => (
          <div key={bike._id}>
            <img src={bike.imageblack} alt="Bike" />
            <div style={{display:'flex' , justifyContent:'space-around', marginTop:'15px'}}>
            <div>
                <h4>{bike.brand} {bike.model}</h4>
                <p className="card-text">Price: ₹ {bike.price}</p>
            </div>
            <div>
            <Link to={`/bikes/${bike._id}`} type="Button" className="btn btn-primary" onClick={() => {
              window.scrollTo(0, 0);
            }}>
              View Details
            </Link></div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BikeCarousel;
