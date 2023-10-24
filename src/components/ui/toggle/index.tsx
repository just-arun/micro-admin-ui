import { FC, useRef } from "react"

type ToggleProps = {
  id: string
  value: boolean
  disabled?: boolean
  onChange: (val: boolean) => void
  required?: boolean
}

export const Toggle: FC<ToggleProps> = (_props) => {
  return (
    <label htmlFor={_props.id} className={`inline-block items-center p-3 px-5 relative bg-slate-600 rounded-3xl cursor-pointer ${_props.disabled ? 'cursor-not-allowed' : ''}`}>
      <span className={`absolute p-2 rounded-full bg-orange-500 transition ${_props.value ? 'right-1' : 'left-1'}`} style={{
        top: "50%",
        transform: "translateY(-50%)"
      }}></span>
      <input required={_props.required} disabled={_props.disabled} className="hidden" id={_props.id} type="checkbox" checked={_props.value} onChange={(e) => _props.onChange(e.target.checked)} />
    </label>
  )
}