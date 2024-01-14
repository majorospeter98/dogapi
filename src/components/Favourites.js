import { useEffect, useState } from "react";
import { config,deleteConfig } from '../Key'
import axios from "axios";
import '../index.css';
import DeleteIcon from '@mui/icons-material/Delete';
function Favourites (){
    const [favourite,setFavourite]= useState(null);
    const getFavourites = () =>{
        axios.get("https://api.thedogapi.com/v1/favourites?sub_id=Test",config)
        .then(response =>setFavourite((response.data)))
        
    } 
    const delFavourites = (e,id) =>{
        e.preventDefault();
        axios.delete(`https://api.thedogapi.com/v1/favourites/${id}`,deleteConfig)
        .then(response => console.log(response.data));
        
    }
    useEffect(() =>{
getFavourites();

    }, [favourite])
    return (
                <>
                <div className="grid">
{favourite?.map(favs=>(
        <div className="flex">
    <img src={favs.image.url}/>
    <DeleteIcon className="delete" style={{fontSize:"50px"}} alt="Törlés" onClick={(e) => delFavourites(e,favs.id)}/>
        </div>
))} 
</div>
        </>
    )

}
export default Favourites;