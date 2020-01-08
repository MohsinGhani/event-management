import credentials from './credentials';

export default class path {
    static POST_SIGNUP = `${credentials.SLS_BASE_URL}/post-signup`;
    static POST_CONFIRMATION = `${credentials.SLS_BASE_URL}/post-confirmation`;
    static GET_USER_BY_ID = `${credentials.SLS_BASE_URL}/get-user`;

    static REVERSE_GEOCODING = `https://api.mapbox.com/geocoding/v5/mapbox.places`;

    // ADDRESS
    static GET_COUNTRY = "https://geodata.solutions/api/api.php?type=getCountries";
    static GET_STATE = "https://geodata.solutions/api/api.php?type=getStates&countryId=";
    static GET_CITY = "https://geodata.solutions/api/api.php?type=getCities&countryId="
    static city1 = "&stateId="

}