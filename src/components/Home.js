import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { config } from "../Key";
function Home() {
  const [dog, setDog] = useState([]);
  const [favid, setFavId] = useState([]);
  function fetch() {
    axios
      .get("https://api.thedogapi.com/v1/images/search?limit=10", config)
      .then((response) =>
        response.data.map((random) => ({
          ...random,
          isFavorite: filterDogs(random.id),
        }))
      )
      .then((response) => setDog(response))
      .catch((e) => console.error("error during api get"));
  }
  function getFavId() {
    axios
      .get("https://api.thedogapi.com/v1/favourites/", config)
      .then((response) => setFavId(response.data))
      .catch((e) => console.error("error during api get"));
  }
  const postFav = (e, dog) => {
    e.preventDefault();
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_s43BDT8YZ1TkvY0aazwbgauJwgbZET8ltkxQob2TQtijTTX76KacNRIYsAzeg2Y9",
      },
    };
    const postdata = {
      image_id: dog.id,
      sub_id: "Test",
    };
    axios
      .post("https://api.thedogapi.com/v1/favourites", postdata, postOptions)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
      });

    setDog((current) => {
      console.log(current);
      let check = current.filter((dogs) => dogs.id === dog.id);
      if (check.length > 0) {
        check[0].isFavorite = true;
      }
      return [...current];
    });
  };
  useEffect(() => {
    getFavId();
  }, [dog]);
  function filterDogs(id) {
    let teszt = favid.filter((favs) => favs.image_id === id);
    if (teszt.length == 1) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div>
      <div className="flex-container">
        {dog?.map((dogs) => (
          <div className="flex" key={dogs.id}>
            <img src={dogs.url} alt="dog images" />
            {filterDogs(dogs.id) ? (
              <FavoriteBorderIcon />
            ) : (
              <FavoriteIcon
                onClick={(e) => postFav(e, dogs)}
                style={{ fontSize: "50px", color: "red" }}
              />
            )}
          </div>
        ))}
      </div>
      <footer>
        <div className="center">
          Generate 10 dog image:
          <RestartAltIcon
            className="restart"
            style={{ fontSize: "50px" }}
            onClick={fetch}
          />
        </div>
      </footer>
    </div>
  );
}
export default Home;
