import React, {Component} from "react";
import RestaurantList from "./RestaurantList";
import "../style/containerMain.css";
import { v4 as uuidv4 } from 'uuid';
import Map from './Map'
import RestaurantManager from '../js/restaurantManager';
class ContainerMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
          pos : {
            lat : 46.227638,
            lng : 2.213749
          },
          zoom : 6 ,
          marker : "",
          map : this.map,
          google : window.google,
          restaurant : []
        }
      }
      
    async geolocateUser() {
        const getPosition = function () {
          return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
        }
        getPosition()
      .then((position) => {
        this.setState({
          pos : {
            lat : position.coords.latitude,
            lng : position.coords.longitude
          },
          zoom : 13
        })
        this.onScriptLoad()
      })
      .catch((err) => {
        console.error(err.message);
      });
    }

    buildScript() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyB1UzDu9tfrHhpV_QcXAP5Yubctg0_tbCc&libraries=places`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
    }

    onScriptLoad() {
    this.map = new window.google.maps.Map(
      document.getElementById("myMap"),{
        center: { lat: this.state.pos.lat, lng: this.state.pos.lng },
        zoom: this.state.zoom,
      });

      const markerUser = new window.google.maps.Marker({
        position: this.state.pos,
        map: this.map,
        icon:"https://img.icons8.com/nolan/1x/marker.png",
        title : "Votre position"
    });

    this.getRestaurant(this.map)
    this.dragendZoomEventsManager(this.state.map)
    }

    getRestaurant(map) {
    const restaurantManager = new RestaurantManager(map, window.google, this.state.pos);
    const getRestaurant = restaurantManager.eventsManagement();
    const markers = []
    getRestaurant.then((result) => {
      result.forEach(element => {
        const marker = new window.google.maps.Marker({
            position: {lat : element.lat, lng: element.long},
            title: element.name,
            animation: window.google.maps.Animation.DROP,
            id : element.id                         
        });
        marker.setMap(this.map)
        markers.push(marker)
        this.setState({
          marker : markers,
          restaurant : result
        })
      })
    })

    }

    dragendZoomEventsManager(map) {
      window.google.maps.event.addListener(map, 'dragend' , async () => {
          this.setState({
            pos : {
              lat : map.getCenter().lat(),
              lng : map.getCenter().lng()
            }
          })
          this.getRestaurant(this.state.map)
      });
    }

    componentDidMount() {
        this.geolocateUser()
        this.buildScript()
    }

    

    render(){
        return (
            <div id="ContainerMain" className="container">
                <div className="row">
                    <div id="Map" className="col-6">
                        <Map id="myMap" markers={this.state.marker}/>
                    </div>
                    <RestaurantList options={this.state} key={uuidv4()}/>
                </div>
            </div>
        )
    }

    
}

export default ContainerMain
