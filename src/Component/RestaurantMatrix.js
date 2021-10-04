import React from "react";
import "../style/restaurantMatrix.css";
import { v4 as uuidv4 } from 'uuid';

const RestaurantMatrix = ({name}) => {




    return (
            <div key={uuidv4()} className="restaurantBtn col-6">
                <p>{name}</p>
            </div>
    )
}

export default RestaurantMatrix