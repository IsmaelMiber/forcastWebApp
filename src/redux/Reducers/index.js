import citiesReducer from "./citiesreducer";
import { combineReducers } from "redux";


export default combineReducers({
    cities: citiesReducer,
});