import { useMemo, useRef } from "react"


export const Input = ({
  id, label, type, value, onChange, placeholder, disabled, pattern, list, listRef,
}: {
  type: any, value: any, disabled?: boolean,
  onChange: (val: any) => void, placeholder: string,
  id: string, label: string, pattern?: any, list?: any, listRef?: any
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const showSuggestion = useMemo(() => {
    if (!!inputRef.current) {

    }
    return
  }, [inputRef])

  return <label htmlFor={id} className="relative">
    <span className="block pb-1">{label}</span>
    <input id={id}
      className={`p-2 px-5 bg-gray-600 w-full mb-5 rounded-sm focus:outline focus:outline-orange-600 border-none outline-none disabled:bg-black disabled:pl-0 disabled:pt-0 disabled:font-semibold transition-all`}
      disabled={disabled}
      pattern={pattern}
      placeholder={placeholder} type={type} value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
}
