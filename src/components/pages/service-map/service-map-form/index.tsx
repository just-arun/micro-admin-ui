import { Toggle } from "@/components/ui/toggle"
import { FC } from "react"

type Data = {
  id: number
  key: string
  value: string
  auth: boolean
  default: boolean
}

type SiteMapFormProps = {
  type: "create" | "update" | ""
  data: Data | null
  onDataChange: (value: Data | null) => void
  onSubmit: () => void
}

export const ServiceMapForm: FC<SiteMapFormProps> = (_props) => {

  const _onUpdate = (key: string, value: any) => {
    if (_props.data) {
      _props.onDataChange({ ..._props.data, [key]: value })
    }
  }

  return (
    <div>
      {_props.data ?
        <form onSubmit={(e) => {
          e.preventDefault()
          _props.onSubmit();
        }}>
          <h1 className="capitalize font-extrabold text-xl">{_props.type} SiteMap</h1>
          <label htmlFor="key" className="py-3 block">
            <div>Key</div>
            <input minLength={2} required className="w-full bg-gray-700 p-3" id="key" value={_props.data.key} onChange={(e) => _onUpdate("key", e.target.value)} />
          </label>
          <label htmlFor="value" className="py-3 block">
            <div>Value</div>
            <input required minLength={20} className="w-full bg-gray-700 p-3" id="value" value={_props.data.value} onChange={(e) => _onUpdate("value", e.target.value)} />
          </label>
          {_props.type == "update" ? <div className="flex items-center py-2 ">
            <span className="pr-4">Auth: </span><Toggle required id="auth" value={_props.data.auth} onChange={(e) => _onUpdate("auth", e)} />
          </div> : ""}
          <div>
            <button className="py-2 px-8 bg-gray-700 mr-3" type="button" onClick={() => _props.onDataChange(null)}>cancel</button>
            <button className="py-2 px-8 bg-gray-700" type="submit">{_props.type}</button>
          </div>
        </form> : ""}
    </div>
  )
}