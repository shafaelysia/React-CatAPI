import React from 'react'

const Scores = ({ label, score }) => {
  const circles = Array.from({ length: 5 }, (_, index) => (
    <div
      key={index}
      className={`rounded-circle ${index < score ? 'bg-primary' : 'bg-primary-subtle'}`}
      style={{ width: '15px', height: '15px', marginRight: '3px' }}
    ></div>
  ));

  return (
    <small className='row'>
      <div className="col-sm-6">
        {label}:
      </div>
      <div className="col-sm-6 d-flex justify-content-between align-items-center">
        {circles}
      </div>
    </small>
  );
};

export default Scores