import { AuthStore } from "@/stores/auth"


const Input = ({ id, label, type, value, onChange, placeholder }: { type: any, value: any, onChange: (val: any) => void, placeholder: string, id: string, label: string }) => {
  return <span>
    <label htmlFor={id}>
    <span className="block pb-1">{label}</span>
    <input id={id} className="p-2 px-5 bg-gray-600 w-full mb-5 rounded-sm focus:outline focus:outline-orange-600 border-none outline-none"
      placeholder={placeholder} type={type} value={value}
      onChange={(e) => onChange(e.target.value)} />
    </label>
  </span>
}

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