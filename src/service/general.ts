import { HttpClient } from "./http";

class General extends HttpClient {
  constructor() {
    super();
  }

  public async getData() {
    return this.http.get("/general/general")
  }

  public async updateData(id: any, payload: any) {
    return this.http.put(`/general/general/${id}`, payload)
  }
}

export const GeneralService = new General()