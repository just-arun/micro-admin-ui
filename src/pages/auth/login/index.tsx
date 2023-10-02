import { LoginWrapper } from "@/components/pages/login";
import { AuthStore } from "@/stores/auth";

export default function Login() {
  return (
    <AuthStore.Provider>
      <LoginWrapper />
    </AuthStore.Provider>
  )
}