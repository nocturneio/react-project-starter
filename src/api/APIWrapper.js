import axios from 'axios';
import {Config} from "../Config";

export default class APIWrapper {

  /**
   * Create an request easily to the Nocturne API (helpers)
   *
   * @param url API Endpoint
   * @param needAPIKey
   * @param customUrl
   * @param curl
   */
  constructor(url, needAPIKey = false, customUrl = false, curl = "") {
    this._headers = {
      "Content-Type" : "application/json"
    };
    this._parameters = {};
    this._needAPIKey = false;


    if (url === "") throw new Error("Please specify an url to api endpoint.");
    this._url = (process.env.NODE_ENV !== 'development' ? Config.API_DEV_URL : Config.API_URL) + url;
    if(customUrl) this._url = curl;
    this._needAPIKey = needAPIKey;
  }

  /**
   * Create a Request staticly.
   *
   * @param url API endpoint
   * @param needAPIKey
   * @returns {APIWrapper}
   */
  static url(url, needAPIKey = false) {
    return new APIWrapper(url, needAPIKey);
  }

  static customUrl(url, needAPIKey = false) {
    return new APIWrapper(url, needAPIKey, true, url);
  }

  contentJson() {
    this._headers['Content-Type'] = 'application/json';
    return this;
  }

  contentURL() {
    this._headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return this;
  }

  /**
   * Add headers to the request.
   *
   * @param object Request headers in object format.
   */
  headers(object) {
    this._headers = {...this._headers, ...object};
    return this;
  }

  _csrf(csrf) {
    this._headers = {...this._headers, "X-CSRF-Token": csrf};
    return this;
  }

  needAuth() {
    let jwt = localStorage.getItem("user");
    this._headers = {...this._headers, "Authorization": "Bearer " + jwt};
    return this;
  }

  /**
   * Add parameters to the request.
   *
   * @param object Request headers in object format.
   */
  parameters(object) {
    this._parameters = {...this._parameters, ...object};
    return this;
  }

  /**
   * Execute post request.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  post() {
    if (this._needAPIKey) {
      const user = localStorage.getItem('nuser');
      if(user){
        let userFormatted = JSON.parse(user);
        return axios.post(this._url, JSON.stringify(this._parameters), {headers: {...this._headers, 'Authorization': userFormatted.accessToken}});
      }
    }else{
      return axios.post(this._url, JSON.stringify(this._parameters), {headers: {...this._headers}});
    }
  }

  /**
   * Execute post request.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  put() {
    if (this._needAPIKey) {
      const user = localStorage.getItem('user');
      if(user){
        let userFormatted = JSON.parse(user);
        return axios.put(this._url, JSON.stringify(this._parameters), {headers: {...this._headers, 'Authorization': userFormatted.accessToken}});
      }
    }else{
      return axios.put(this._url, JSON.stringify(this._parameters), {headers: {...this._headers}});
    }
  }

  /**
   * Execute patch request.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  patch() {
    if (this._needAPIKey) {
      const user = localStorage.getItem('user');
      if(user){
        let userFormatted = JSON.parse(user);
        return axios.patch(this._url, JSON.stringify(this._parameters), {headers: {...this._headers, 'Authorization': userFormatted.accessToken}});
      }
    }else{
      return axios.patch(this._url, JSON.stringify(this._parameters), {headers: {...this._headers}});
    }
  }

  /**
   * Execute delete request.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  delete() {
    return axios.delete(this._url, {headers: {...this._headers}});
  }

  /**
   * Execute get request.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  get() {
    const params = this._parameters;
    const headers = this._headers;

    let request = {params, headers};
    return axios.get(this._url, request);
  }
}
