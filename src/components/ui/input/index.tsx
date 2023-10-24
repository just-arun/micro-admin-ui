

export const Input = ({ id, label, type, value, onChange, placeholder, disabled, pattern }: { type: any, value: any, disabled?: boolean, onChange: (val: any) => void, placeholder: string, id: string, label: string, pattern?: any }) => {
  return <span>
    <label htmlFor={id}>
      <span className="block pb-1">{label}</span>
      <input id={id} 
      className={`p-2 px-5 bg-gray-600 w-full mb-5 rounded-sm focus:outline focus:outline-orange-600 border-none outline-none disabled:bg-black disabled:pl-0 disabled:pt-0 disabled:font-semibold transition-all`}
        disabled={disabled}
        pattern={pattern}
        placeholder={placeholder} type={type} value={value}
        onChange={(e) => onChange(e.target.value)} />
    </label>
  </span>
}
