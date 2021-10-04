export default class Restaurant {
    constructor (id,name,address,lat,long,ratings,average) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.lat = lat;
        this.long = long;
        this.ratings = ratings
        this.average = average
    }
    numAverage() {
        let stars = 0
        let total = this.ratings.length
        let average = 0
        for (let i = 0; i < this.ratings.length; i++) {
            stars += this.ratings[i].stars
        }
        //console.log(typeof(average))
        return average = stars / total
    }
    onConsole() {
        //console.log(this.name)
        //console.log(this.average)
    }
    
}