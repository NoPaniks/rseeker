export function requestNearbySearch(service, google, position) {
    const request = {
      location: position,
      radius: 2500,
      type: ['restaurant'],
    };
     return new Promise((resolve, reject) => {
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK || google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
           resolve(results);
        } else {
          reject(new Error(`problem with requestNearbyRestaurant: ${status}`));
        }
      });
    });
  }


  export function requestGetDetails(service, google, element) {
    const request = {
      placeId: element.id,
      fields: ['review', 'place_id'],
    };
    return new Promise((resolve, reject) => {
      service.getDetails(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK || google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          resolve(results)
        } else {
          reject(new Error(`problem with requestDetails: ${status}`));
        }
      });
    });
  }

export function restaurantPattern(array) {
  if(array !== null) {
    const restaurant = array.map((element) => ({
      id : element.place_id,
      name : element.name,
      address : element.vicinity,
      lat : element.geometry.location.lat(),
      lng : element.geometry.location.lng(),
      ratings : [],
      average : element.rating
    }))
    return restaurant
  }
}

