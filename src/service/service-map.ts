import { RSA } from "@/util/rsa";
import { HttpClient } from "./http";

class ServiceMap extends HttpClient {
  constructor() {
    super();
  }
  
  public async getServiceMap() {
    return this.http.get("/auth/service-map")
  }

}

export const ServiceMapService = new ServiceMap()