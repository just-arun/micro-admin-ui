import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { GeneralStore } from "@/stores/general"
import { useEffect } from "react"




export const GeneralPage = () => {
  const generalStore = GeneralStore.useContainer()

  useEffect(() => {
    generalStore.initData()
  }, [])

  const updateField = (name: any, e: any) => {
    if (!!generalStore.data) {
      generalStore.setData({
        ...generalStore.data, [name]: !!e.target ? e.target.value : e,
      })
    }
  }

  return (
    <div>
      {!!generalStore.data ? <form
        className="w-[600px]"
        onSubmit={(e) => {
          e.preventDefault()
          if (confirm("are you sure you want to save this changes")) {
            generalStore.update()
          }
        }}>

        <div className="flex items-center py-6">
          <label htmlFor="edit">Edit: </label>
          <Toggle id="edit" value={generalStore.edit} onChange={(e) => generalStore.setEdit(e)} />
        </div>

        {generalStore.isChanged
          ? <div>
            <button className="uppercase p-2 px-6 bg-gray-700 mr-2" onClick={() => {
              generalStore.setData(JSON.parse(JSON.stringify(generalStore.dataCopy)));
              generalStore.setEdit(false);
            }}>cancel</button>
            <button type="submit" className="uppercase p-2 px-6 bg-gray-700">update</button>
          </div>
          : ""}
        <Input disabled={!generalStore.edit} id="name" label="Name" onChange={(e) => updateField("name", e)} placeholder="name" type={"text"} value={generalStore.data.name} />
        <Input disabled={!generalStore.edit} id="accessTokenExpiryTime" label="Access Token Expiry Time(in minutes)" onChange={(e) => updateField("accessTokenExpireTime", e)} placeholder="Access Token Expiry Time(in minutes)" type={"number"} value={generalStore.data.accessTokenExpireTime} />
        <Input disabled={!generalStore.edit} id="refreshTokenExpiryTime" label="Refresh Token Expiry Time(in hours)" onChange={(e) => updateField("refreshTokenExpireTime", e)} placeholder="Refresh Token Expiry Time(in minutes)" type={"number"} value={generalStore.data.refreshTokenExpireTime} />
        <Input disabled={!generalStore.edit} id="organizationEmailDomain" label="Organization Email Domain" onChange={(e) => updateField("organizationEmailDomain", e)} placeholder="organizationEmailDomain" type={"text"} value={generalStore.data.organizationEmailDomain} />

        <label htmlFor="tokenPlacement">Token Placement</label>
        <select disabled={!generalStore.edit} id="tokenPlacement" className="bg-gray-600 p-3 px-4 w-full">
          {["header", "cookie"].map((e, i) => (
            <option value={e} key={i}>{e}</option>
          ))}
        </select>

        <div className="py-5 flex items-center justify-between">
          <label htmlFor="canLogin">Can Login to app</label>
          <Toggle disabled={!generalStore.edit} id="canLogin" value={generalStore.data.canLogin} onChange={(e) => updateField("canLogin", e)} />
        </div>
        <div className="py-5 flex items-center justify-between">
          <label htmlFor="canRegister">Can Register to app</label>
          <Toggle  disabled={!generalStore.edit} id="canRegister" value={generalStore.data.canRegister} onChange={(e) => updateField("canRegister", e)} />
        </div>
        <div className="py-5 flex items-center justify-between">
          <label htmlFor="httpOnlyCookie">Http Only Cookie</label>
          <Toggle  disabled={!generalStore.edit} id="httpOnlyCookie" value={generalStore.data.httpOnlyCookie} onChange={(e) => updateField("httpOnlyCookie", e)} />
        </div>

      </form> : ""}
    </div>
  )
}



