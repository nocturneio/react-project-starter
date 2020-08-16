import APIWrapper from "../APIWrapper";

export default class LandingAPI {

  static test() {
    return APIWrapper.url('/api').get();
  }

}
