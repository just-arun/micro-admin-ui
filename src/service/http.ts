import { Config } from "@/config"
import axios, { AxiosInstance } from "axios"
axios.defaults.withCredentials = true;

export class HttpClient {
  protected http!: AxiosInstance
  constructor() {
    this.http = axios.create({
      baseURL: Config.BASE_URL,
    })
    this.request()
    this.response()
  }
  private request() {
    this.http.interceptors.request.use((req) => {
      return req;
    })
  }
  private response() {
    this.http.interceptors.response.use((res) => {
      return res;
    }, (err) => {
      // if ([401].includes(err.response.status)) {
      //   window.location.pathname = "/auth/login"
      // }
    })
  }
}