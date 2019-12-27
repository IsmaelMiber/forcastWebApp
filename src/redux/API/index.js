import axios from "axios";
import response from "../../json/response.json";

const TOP_CITIES_API_URL = "http://dataservice.accuweather.com/locations/v1/topcities/50";
const FOCAST_CITY_API_URL = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/";
const API_KEY = "iXPCdARwuaEZlPWsaSOJTB60r0ARp28U";
const LANG = "en-us";
const DETAILS = false;
const METRIC = false;

class API {
    constructor() {
        var getCityForcast = async (cityKey) => {
            return await axios.get(FOCAST_CITY_API_URL + cityKey, {
                params: {
                    apikey: API_KEY,
                    lang: LANG,
                    detials: DETAILS,
                    metric: METRIC,
                }
            })
        }

        this.getCITIES = () => {
            return axios.get(TOP_CITIES_API_URL, {
                params: {
                    apikey: API_KEY,
                    lang: LANG,
                    detials: DETAILS,
                }
            }).then(async function getForcast(response){
                var cities = response.data;
                var citiesWithForcast = [];
                cities = cities.slice(0, 5);
                for(let city of cities) {
                    let zforcast = await getCityForcast(city.Key);
                    citiesWithForcast.push(
                        {...city, zforcast: zforcast.data}
                    );
                }
                return citiesWithForcast;
            }).catch(err => {
                console.warn("err", err)
            })
        }

        
    }
}

export default new API();