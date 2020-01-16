import React from 'react';
import Posts from './posts/Posts';
import Navigation from './Navigation'
import Footer from './Footer'


  const Dashboard = () => {
    return (
      <div id="page-container">
        <Navigation />
        <Posts /> 

        <Footer />
      </div>
    )
  }

  export default Dashboard;

