import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import BikeList from './components/BikeList';
import BikeDetailsPage from './components/BikeDetailsPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Payment from './components/Payment';
import EditBike from './components/EditBike';
import AddBike from './components/AddBike';
import UserProfile from './components/UserProfile';
import RazorpayPayment from './components/RazorpayPayment';
import SuccessPage from './components/SuccessPage';

import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
  return (
    <Router>
      <>
        <AuthProvider> {/* Wrap your routes with AuthProvider */}
          <NavBar />
          <Routes>
            <Route path="/" element={<BikeList />} />
            <Route path="/bikes/:id" element={<BikeDetailsPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/bikes/:id/edit" element={<EditBike />} />
            <Route path="/add-bike" element={<AddBike/>} />
            <Route path="/profile" element={<UserProfile/>} />
            <Route path="/razorpay-payment" element={<RazorpayPayment/>} />
            <Route path="/success" element={<SuccessPage/>} />
            
          </Routes>
          <Footer />
        </AuthProvider>
      </>
    </Router>
  );
}

export default App;
