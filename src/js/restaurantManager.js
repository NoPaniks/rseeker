
//créer une variable ou envoi le résultat de la nearbySearch()
//      envoyer en paramètre : la map (qui vient de "init.js")
//                             le service : service = new google.maps.places.PlacesService(map);
//                              la position (de la map ou du user)
//créer une variable ou envoi le résultat du getDetails()
import { requestNearbySearch, restaurantPattern , requestGetDetails } from './placeService.js'
import Restaurant  from './restaurant.js'


export default class RestaurantManager {
    constructor(map, google, position) {
        this.google = google;
        this.map = map;
        this.position = position;
        this.service = new window.google.maps.places.PlacesService(this.map);
        this.restaurants = [];
        this.storedRestaurants = [];
        this.markers = [];
        //this.restaurantListId = document.getElementById('restaurantList');
        //this.restaurantClickedId = document.getElementById('restaurantClickedContainer');
    }
    
    async findRestaurantAround() {
        const requestToNearby = await requestNearbySearch(this.service, this.google, this.map.getCenter());
        const constructRestaurant = restaurantPattern(requestToNearby);
        return this.instanceOfRestaurant(constructRestaurant);
    }

    findRestaurantDetails(restaurant){
        const details = requestGetDetails(this.service, this.google, restaurant);
    }

    instanceOfRestaurant(constructRestaurant) {
        const restaurants = constructRestaurant.map(x => new Restaurant (x.id,x.name,x.address,x.lat,x.lng,x.ratings,x.average));
        
        return restaurants
    }

    getRandomColor() { /* floor arrondit, random fait l'aléatoire de longueur du tableau */ 
        const color = ["blue", "yellow", "purple", "green", "red"];
		return color[Math.floor(Math.random() * color.length)];
	}

    getIcon() {
        return ( "http://maps.google.com/mapfiles/ms/icons/"+this.getRandomColor()+"-dot.png" )
    }

    addMarkers(restaurants) {
        this.clearOverlays()
        restaurants.forEach(element => {
            const marker = new this.google.maps.Marker({
                position: {lat : element.lat, lng: element.long},
                title: element.name,
                animation: this.google.maps.Animation.DROP,
                id : element.id,
                icon: this.getIcon()                          
            });
            marker.setMap(this.map)
            this.markers.push(marker)
        })
    }

    clearOverlays() {
        for (var i = 0; i < this.markers.length; i++ ) {
          this.markers[i].setMap(null);
        }
        this.markers.length = 0;
    }

    

    async eventsManagement() {
        const requestToNearby = await requestNearbySearch(this.service, this.google, this.map.getCenter());
        const constructRestaurant = restaurantPattern(requestToNearby);
        this.restaurants = [];
        const instanceOfRestaurant = this.instanceOfRestaurant(constructRestaurant);
        return instanceOfRestaurant
    }


}

