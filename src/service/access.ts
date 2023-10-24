import { HttpClient } from "./http";

class Access extends HttpClient {
  constructor() {
    super();
  }

  public async getAccess(params: any) {
    return this.http.get("/general/access", {
      params: params
    })
  }

  public async create(payload: any) {
    return this.http.post(`/general/access`, payload)
  }

  public async updateOneName(id: any, payload: any) {
    return this.http.put(`/general/access/${id}/name`, payload)
  }
}

export const AccessService = new Access()