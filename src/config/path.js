import credentials from './credentials';

export default class path {
    static POST_SIGNUP = `${credentials.SLS_BASE_URL}/post-signup`;
    static POST_CONFIRMATION = `${credentials.SLS_BASE_URL}/post-confirmation`;
    static GET_USER_BY_ID = `${credentials.SLS_BASE_URL}/get-user`;
}