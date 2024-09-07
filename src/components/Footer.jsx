import React from 'react';

function getYear() {
  return new Date().getFullYear();
}

const Footer = () => {
  return (
    <div className='w-100 d-flex align-items-center justify-content-center mt-5 text-white' style={{ height: '7vh', backgroundColor: '#284B63' }}>
      <h5>&copy; {getYear()} Shafa Elysia</h5>
    </div>
  );
};

export default Footer;