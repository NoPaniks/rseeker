import React, {useState} from "react";
import "../style/restaurantList.css";
import RestaurantMatrix from "./RestaurantMatrix";

import { v4 as uuidv4 } from 'uuid';



const RestaurantList = (props) => {

   const [state] = useState(props.options.restaurant) 
    

   

    return (
            <div id="RestaurantList" className="col-6 ">
                    {state.map(resturant => {
                return <RestaurantMatrix key={uuidv4()} name={resturant.name}/>
        })}
            </div>
    )
}

export default RestaurantList
