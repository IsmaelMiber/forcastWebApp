import React from "react";
import store from "../redux/store";
import { getCITIES } from "../redux/Actions";
import { connect } from 'react-redux'

class City extends React.Component {
    constructor(props) {
        super(props);
        var { cities } = this.props;
        if(cities) {
            var city = cities.find(city => city.Key == this.props.match.params.num);
        }
        this.state={
            loading: city ? false : true,
            city: city || {}
        }
    }

    componentDidMount() {
        if(!this.props.cities) {
            var unsbscribe = store.subscribe(() => {
                var {cities = []} = store.getState().cities;
                var city = cities.find(city => city.Key == this.props.match.params.num);
                console.log("X", city);
                this.setState({loading: false, city});
                
                unsbscribe();
            });
            this.props.getCities();
        }
    }

    render() {
        const {
            props,
        } = this;
        if(this.state.loading)
        return null;
        var city = this.state.city;
        var forcast = this.props.zforcast || city.zforcast;
        var { Headline = {}, DailyForecasts } = forcast;
        var { Text: text = "" } = Headline;
        var { Day, Night, Temperature } = DailyForecasts[0];
        var { Minimum, Maximum } = Temperature;
        var { IconPhrase: DayPhase } = Day;
        var { IconPhrase: NightPhase } = Night;
        return(
            <div style={{flex: 1}}>
                <div style={{justifyContent: "center", alignItems: "center", backgroundColor: "#eee", paddingVertical: 16,}}>
                    <p style={{fontSize: 16, fontWeight: "bold", textAlign: "center"}}>{city.EnglishName}</p>
                </div>
                <div>
                    <div style={{paddingHorizontal: 24, paddingVertical: 40,}}>
                        <div style={{marginBottom: 20}}>
                            <p style={{fontWeight: "bold"}}>Temperature:</p>
                            <p>
                                {"Minimum Temp: " + Minimum.Value + Minimum.Unit}
                            </p>

                            <p>
                                {"Maximum Temp: " + Maximum.Value + Maximum.Unit}
                            </p>
                        </div>

                        <div style={{marginBottom: 20, flexDirection: "row",flexWrap: "wrap"}}>
                            <p style={{fontWeight: "bold",}}>
                                Weather condition: 
                            </p>
                            <p>
                                {" " + text}
                            </p>
                        </div>

                        <div style={{marginBottom: 20, flexDirection: "row",flexWrap: "wrap"}}>
                            <p style={{fontWeight: "bold",}}>
                                Weather at Day: 
                            </p>
                            <p>
                                {" " + DayPhase}
                            </p>
                        </div>

                        <div style={{flexDirection: "row",flexWrap: "wrap"}}>
                            <p style={{fontWeight: "bold",}}>
                                Weather at Night: 
                            </p>
                            <p>
                                {" " + NightPhase}
                            </p>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(City);