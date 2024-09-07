import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Scores from '../components/Scores'

const Breeds = () => {
  const [breedsData, setBreedsData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState(null);

  const fetchData = () => {
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then((response) => setBreedsData(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBreeds = breedsData?.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (breed) => {
    setSelectedBreed(breed);
  };

  const closeModal = () => {
    setSelectedBreed(null);
  };

  return (
    <div className="w-75 m-auto mt-5">
      <div className="d-flex justify-content-around">
        <h2>Cat Breeds</h2>
        <div className="input-box d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Search Breed..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: '2rem',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '5px',
            }}
          >
            Search
          </span>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-around">
        {filteredBreeds?.map((breed, index) => (
          <div
            className="card bg-gray mt-5 shadow rounded-4"
            key={index}
            style={{ width: '20rem', cursor: 'pointer' }}
            onClick={() => openModal(breed)}
          >
            {breed.reference_image_id && (
              <img src={`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`} className="card-img-top" alt={breed.name} />
            )}
            {/* <img src={breed.image?.url} className="card-img-top" alt={breed.name} /> */}
            <div className="card-body">
              <h5 className="card-title mt-3">{breed.name}</h5>
              <p className="card-text">{breed.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedBreed && (
        <BreedModal show={true} onHide={closeModal} breed={selectedBreed} />
      )}
    </div>
  );
};

const BreedModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.breed.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-5">
            {props.breed.reference_image_id && (
              <img src={`https://cdn2.thecatapi.com/images/${props.breed.reference_image_id}.jpg`} className="card-img-top" alt={props.breed.name} />
            )}
            {/* <img src={props.breed.image?.url} className="card-img-top" alt={props.breed.name} /> */}
          </div>
          <div className="col-md-6">
            <p><strong>Description:</strong></p>
            <p>{props.breed.description}</p>

            <p><strong>Temperament: </strong>{props.breed.temperament}</p>
            <p><strong>Origin: </strong>{props.breed.origin}</p>
            <p><strong>Weight: </strong>{props.breed.weight.metric} Kg</p>
            <p><strong>Life Span: </strong>{props.breed.life_span} Years</p>

            <p><strong>Link: </strong><a href={props.breed.wikipedia_url}>{props.breed.wikipedia_url}</a></p>
          </div>
        </div>

        <div className="scoresContainer row m-4">
          <div className="col-md-6">
            <Scores label="Adaptability" score={props.breed.adaptability} />
            <Scores label="Affection Level" score={props.breed.affection_level} />
            <Scores label="Child Friendly" score={props.breed.child_friendly} />
            <Scores label="Dog Friendly" score={props.breed.dog_friendly} />
            <Scores label="Energy Level" score={props.breed.energy_level} />
            <Scores label="Grooming" score={props.breed.grooming} />
          </div>
          <div className="col-md-6">
            <Scores label="Health Issues" score={props.breed.health_issues} />
            <Scores label="Intelligence" score={props.breed.intelligence} />
            <Scores label="Shedding Level" score={props.breed.shedding_level} />
            <Scores label="Social Needs" score={props.breed.social_needs} />
            <Scores label="Stranger Friendly" score={props.breed.stranger_friendly} />
          </div>
        </div>

      </Modal.Body>
    </Modal>
  );
};

export default Breeds;