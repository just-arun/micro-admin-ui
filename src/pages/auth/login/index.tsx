import { LoginWrapper } from "@/components/pages/login";
import { AuthStore } from "@/stores/auth";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {}, [])
  return (
    <AuthStore.Provider>
      <LoginWrapper />
    </AuthStore.Provider>
  )
}