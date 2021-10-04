/* //import { fetchJsonData } from './utils.js';
import RestaurantManager from './restaurantManager.js';


export default async function launchApp() {
    //const jsonDatas = await fetchJsonData();

// Watchposition //
    navigator.geolocation.watchPosition(function(position) {
        // User position //
        const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        };
        // Map center on user location //
        const map = new window.google.maps.Map(document.getElementById('test'), {
        center: pos,
        zoom: 13,
        mapId : 'd4bc720774e69f9d'
        });

        const restaurantManager = new RestaurantManager(map, window.google, pos);
        restaurantManager.launch();
        //instancier un RestaurantManager(map,google,pos)
        //

        const markerUser = new window.google.maps.Marker({
            position: pos,
            map: map,
            icon:"https://img.icons8.com/nolan/1x/marker.png"
        });

    },
    function(error) {
    let msg;
    switch(error.code) {
        default : 
            msg="une erreur s'est produite";
            break;
        case error.UNKNOW_ERROR :
            msg = "Une erreur inconnue c'est produite";
            break;
        case error.POSITION_UNVAILABLE : 
            msg = "Une erreur technique c'est produite";
            break;
        case error.TIMEOUT : 
            msg = "Le temps de réponse de la requête à expiré";
            break;
        case error.PERMISSION_DENIED : 
            msg = "Vous avez refusé d'activer la géolocalisation";
            const pos = {
                lat: 48.8737815,
                lng: 2.3501649,
                };
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 15,
                mapId : 'd4bc720774e69f9d'
                });
        
                const restaurantManager = new RestaurantManager(map, window.google, pos);
                restaurantManager.launch();
                //instancier un RestaurantManager(map,google,pos)
                //
            break;
    }
    alert (msg);
      instancier un RestaurantManager avec une constante : const restaurantManager = new restaurantManager()
            paramètre :
                new google.maps.Map(document.getElementById('mapContainer'), mapOptions)
                google
                mapOptions.center 
    
    
    });
    

}


 */