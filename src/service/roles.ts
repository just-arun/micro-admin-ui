import { HttpClient } from "./http";

class Roles extends HttpClient {
  constructor() {
    super();
  }

  public async getAll() {
    return this.http.get("/general/roles")
  }

  public async getAllNames() {
    return this.http.get("/general/roles")
  }


  public async getOne(id: any) {
    return this.http.get(`/general/roles/${id}`)
  }

  public async saveOne(payload: any) {
    return this.http.post(`/general/roles`, payload)
  }

  public async updateAccesses(id: any, payload: any) {
    return this.http.put(`/general/roles/${id}/accesses`, payload)
  }

  public async deleteOne(id: any) {
    return this.http.delete(`/general/roles/${id}`)
  }
}

export const RolesService = new Roles()