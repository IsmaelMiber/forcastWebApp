import API from "../API";
import store from "../store";

export async function getCITIES(dispatch) {
    var action = await API.getCITIES().then(response => {
        if(response) {
            return ({
                type: "CITIES",
                cities: response,
            })
        }
        return ({
            type: "CITIES",
            cities: store.getState().cities || [],
        });
    });

    dispatch(action);
}