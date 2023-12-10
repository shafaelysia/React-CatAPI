import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { catOptions, catDeleteFavoriteOptions } from '../options';
import SweetAlert2 from 'react-sweetalert2';

const Favorites = () => {
  const [favorites, setFavorites] = useState(null);
  const [catData, setCatData] = useState([]);
  const [swalProps, setSwalProps] = useState({});

  const fetchData = () => {
    axios
      .get(
        "https://api.thecatapi.com/v1/favourites?limit=10&sub_id=user-123",
        catOptions
      )
      .then((response) => setFavorites(response.data))
      .catch((error) => console.log(error));
  };

  const populateArray = async () => {
    if (favorites) {
      const catPromises = favorites.map((favorite) =>
        axios.get(`https://api.thecatapi.com/v1/images/${favorite.image_id}`, catOptions)
      );

      try {
        const catResponses = await Promise.all(catPromises);
        const catImages = catResponses.map((response) => response.data);
        setCatData(catImages);
      } catch (error) {
        console.error("Error fetching cat images:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    populateArray();
  }, [favorites]);

  const divideIntoColumns = (array, columns) => {
    const result = Array.from({ length: columns }, (_, i) =>
      array.filter((_, idx) => idx % columns === i)
    );
    return result;
  };

  const onClickDelete = (event, catId) => {
    event.preventDefault();

    const matchingFavorite = favorites.find((favorite) => favorite.image_id === catId);

    if (matchingFavorite) {
      const favoriteId = matchingFavorite.id;

      axios
        .delete(`https://api.thecatapi.com/v1/favourites/${favoriteId}`, catDeleteFavoriteOptions)
        .then((response) => {
          setCatData((prevCatData) => prevCatData.filter((cat) => cat.id !== catId));

          setSwalProps({
            icon: "success",
            title: "Successfully Deleted!",
          });

          setTimeout(() => setSwalProps({}), 1000);
        })
        .catch((error) => {
          setSwalProps({
            icon: "error",
            title: "Error in Deleting Liked Image!",
            text: error,
          });
        });
    }
  };

  const dividedCatData = divideIntoColumns(catData, 3);

  return (
    <div className="w-75 m-auto">
      <h3>Liked Images</h3>

      <div className="row mt-2">
        {dividedCatData.map((column, colIndex) => (
          <div key={colIndex} className="col-lg-4 mb-4 mb-lg-0">
            {column.map((cat, index) => (
              <div key={index} className="image-container">
                <span
                  className="material-symbols-outlined delete-icon"
                  onClick={(event) => onClickDelete(event, cat.id)}
                >
                  delete
                </span>
                <img
                  src={cat?.url}
                  className="w-100 shadow-1-strong rounded mb-4"
                  alt={`Cat ${index}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <SweetAlert2 {...swalProps} show={Object.keys(swalProps).length > 0} />
    </div>
  );
};

export default Favorites;