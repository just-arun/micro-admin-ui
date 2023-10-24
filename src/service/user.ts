import { HttpClient } from "./http";

class User extends HttpClient {
  constructor() {
    super();
  }

  public async getMany(params: any) {
    return this.http.get("/general/users", {
      params: params
    })
  }

  public async create(payload: any) {
    return this.http.post(`/general/user`, payload)
  }

  public async updateOneName(id: any, payload: any) {
    return this.http.put(`/general/access/${id}/name`, payload)
  }
}

export const UserService = new User()