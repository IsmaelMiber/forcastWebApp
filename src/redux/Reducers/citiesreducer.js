export default (state = {}, action) => {
  switch (action.type) {
    case "CITIES":
      return ({
        ...state,
        cities: action.cities,
      });
    default: 
      return state;
  }
};
