import { Toggle } from "@/components/ui/toggle"
import { FC } from "react"

type Data = {
  id: number
  key: string
  name: string
}

type AccessFormProps = {
  type: "create" | "update" | ""
  data: Data | null
  onDataChange: (value: Data | null) => void
  onSubmit: () => void
}

export const AccessForm: FC<AccessFormProps> = (_props) => {

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
          <h1 className="capitalize font-extrabold text-xl">{_props.type} Access</h1>
          <label htmlFor="name" className="py-3 block">
            <div>Name</div>
            <input required minLength={10} className="w-full bg-gray-700 p-3" id="name" value={_props.data.name} onChange={(e) => _onUpdate("name", e.target.value)} />
          </label>
          <label htmlFor="key" className="py-3 block">
            <div>Key</div>
            <input  minLength={10} required className="w-full bg-gray-700 p-3" id="key" value={_props.data.key} onChange={(e) => _onUpdate("key", e.target.value)} />
          </label>
          <div>
            <button className="py-2 px-8 bg-gray-700 mr-3" type="button" onClick={() => _props.onDataChange(null)}>cancel</button>
            <button className="py-2 px-8 bg-gray-700" type="submit">{_props.type}</button>
          </div>
        </form> : ""}
    </div>
  )
}