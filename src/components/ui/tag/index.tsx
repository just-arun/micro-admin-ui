import { FC } from "react"

type TagProps = {
  active: boolean
}


export const Tag: FC<TagProps> = (_props) => {
  return (
    <div className={`inline-block p-3 rounded-full ${_props.active ? 'bg-green-400' : 'bg-red-400'} `}></div>
  )
}