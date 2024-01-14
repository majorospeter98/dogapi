import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { config } from '../Key'
import {Routes,Route} from 'react-router-dom';
function Home(){
    const [dog, setDog] = useState(null);
    
    function fetch() {
      axios
        .get("https://api.thedogapi.com/v1/images/search?limit=10", config)
        .then((response) => setDog(response.data))
        .catch((e) => console.error("error during api get"));
    }
    const postFav = (e, dogId) => {
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
        image_id: dogId,
        sub_id: "Test",
      };
      axios
        .post("https://api.thedogapi.com/v1/favourites", postdata, postOptions)
        .then((response) => console.log(response.data))
        .catch((error) => {
          console.error(error);
        });
      }
    
    useEffect(() => {
      fetch();
    }, []);
    
    return (
      <div>
        <div className="grid">
          {dog?.map((dogs) => (
            <div className="flex">
              <img src={dogs.url} />
              <FavoriteIcon style={{fontSize:"50px"}} onClick={(e) => postFav(e, dogs.id)} className="icon" />
            </div>
          ))}
        </div>
        <div className="center">
          Regenerate 10 dog image:
          <RestartAltIcon className="restart" style={{fontSize:"50px"}} onClick={fetch} />
        </div>
      </div>
    );
} 

export default Home;