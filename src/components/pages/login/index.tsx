import { Input } from "@/components/ui/input"
import { AuthStore } from "@/stores/auth"




export const LoginWrapper = () => {
  const authStore = AuthStore.useContainer()
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-96 p-4" onSubmit={(e) => {
        e.preventDefault()
        authStore.login()
      }}>
        <div className="pb-5">
          <h1 className="text-3xl">Login</h1>
          <p>Login to you organization</p>
        </div>
        <Input label="E-Mail" id="email" type={"email"} value={authStore.form.email} placeholder="enter your email..."
          onChange={(e) => authStore.setForm({ ...authStore.form, email: e })}
        />
        <Input label="Password" id="password" type={"password"} value={authStore.form.password} placeholder="enter your password..."
          onChange={(e) => authStore.setForm({ ...authStore.form, password: e })}
        />
        <button className="bg-gray-700 p-2 px-8 focus:outline rounded-sm outline-orange-600" type="submit">submit</button>
      </form>
    </div>
  )
}