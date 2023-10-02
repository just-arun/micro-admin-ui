import { AuthService } from "@/service/auth";
import { createContainer } from "@/util/context"
import { useRouter } from "next/router";
import { useState } from "react";

const Auth = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      const { data } = await AuthService.getPublicKey()
      await AuthService.login(form.email, form.password, data.data.key )
      return router.push({pathname: '/'})
    } catch (err) {
      console.error(err);
    }
  }

  return {
    form, setForm, login
  }
}

export const AuthStore = createContainer(Auth);


