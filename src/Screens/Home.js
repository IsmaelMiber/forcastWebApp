import React from "react";
import { getCITIES } from "../redux/Actions";
import store from "../redux/store";
import { connect } from 'react-redux'
import Splash from "./Splash";
import { Link } from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    showDetailsOfCityForcast = (city) => {
        this.props.navigation.navigate({
            routeName: "City",
            params: {
                city
            }
        })
    }

    componentDidMount() {
        
        this.props.getCities();
    }


    render() {
        var {cities} = this.props;
        return(
            <div style={{flex: 1, backgroundColor: "#ddd"}}>
                <div style={{justifyContent: "center", alignItems: "center", backgroundColor: "#eee", paddingVertical: 16,}}>
                    <p style={{fontSize: 16, fontWeight: "bold"}}>AccuWeather Top 5 Cites</p>
                </div>
                <div style={{flexGrow: 1}}>
                    <div style={{flex: 1, paddingHorizontal: 24, paddingVertical: 40, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between",}}>
                        {
                            cities && cities.length > 0 ?
                                cities.map((city, index) => {
                                    return(
                                        <Link to={"/city/" + city.Key} key={index} style={{marginBottom: 20, borderRadius: 20, width: 150, backgroundColor: "#f2f9fb", height: 150, justifyContent: "center", alignItems: "center"}}>
                                            <p style={{fontWeight: "bold", fontSize: 20}}>{city.EnglishName}</p>
                                        </Link>
                                    )
                                })
                            :
                                <div style={{flex: 1, alignItems: "center", justifyContent: "center",}}>
                                    <p style={{fontSize: 16, fontWeight: "bold", textAlign: "center",}}>loading</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        cities: state.cities.cities,
    });
}


const mapDispatchToProps = (dispatch) => ({
    getCities: () => dispatch(getCITIES)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);