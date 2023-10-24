import { RSA } from "@/util/rsa";
import { HttpClient } from "./http";

class ServiceMap extends HttpClient {
  constructor() {
    super();
  }
  
  public async getServiceMap() {
    return this.http.get("/general/service-map")
  }
  
  public async updateOneServiceMap(id: any, payload: any) {
    return this.http.put(`/general/service-map/${id}`, payload)
  }
  
  public async createOne(payload: any) {
    return this.http.post(`/general/service-map`, payload)
  }
  
  public async deleteOne(id: any) {
    return this.http.delete(`/general/service-map/${id}`)
  }


}

export const ServiceMapService = new ServiceMap()