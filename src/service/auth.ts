import { RSA } from "@/util/rsa";
import { HttpClient } from "./http";

class Auth extends HttpClient {
  constructor() {
    super();
  }
  public async login(email: string, password: string, publicKey: string) {
    const payload = await RSA().encryptObject({
      email,
      password,
    }, publicKey)
    return this.http.post("/auth/login", payload,)
  }

  public async getPublicKey() {
    return this.http.get("/auth/public-key")
  }
}

export const AuthService = new Auth()