import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Breeds from '../components/Breeds';
import '../index.css';
import { catAddFavoriteOptions } from '../options';
import SweetAlert2 from 'react-sweetalert2';

const Home = () => {
  const [catData, setCatData] = useState(null);
  const [swalProps, setSwalProps] = useState({});

  const fetchData = () => {
    axios
      .get("https://api.thecatapi.com/v1/images/search?limit=10")
      .then((response) => setCatData((prevCatData) => response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickAdd = (event, catId) => {
    event.preventDefault();

    let data = {
      image_id: catId,
      sub_id: "user-123"
    };

    axios.post(
      "https://api.thecatapi.com/v1/favourites",
      data,
      catAddFavoriteOptions
    )
      .then((response) => {
        setSwalProps({
          icon: "success",
          title: "Successfully Added to Liked Images!"
        });

        setTimeout(() => setSwalProps({}), 5000);
      })
      .catch((error) => {
        setSwalProps({
          icon: "error",
          title: "Error in Adding Liked Images!",
          text: error,
        });
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-3 bg-black m-auto rounded" style={{ width: '80vw', height: '75vh' }}>
        <Carousel style={{ width: '80vw', height: '75vh' }}>
          {catData?.map((cat, index) => (
            <Carousel.Item key={cat.id}>
              <img
                className="d-block"
                src={cat.url}
                alt="Cat"
                style={{ width: '100%', height: '75vh', objectFit: 'contain' }}
              />
              <span
                className="material-symbols-outlined favorite-icon"
                onClick={(event) => onClickAdd(event, cat.id)}
              >
                favorite
              </span>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div>
        <Breeds />
      </div>

      <SweetAlert2 {...swalProps} show={Object.keys(swalProps).length > 0} />
    </>
  );
};

export default Home;