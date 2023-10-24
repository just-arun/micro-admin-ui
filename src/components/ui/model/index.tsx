import { FC, useEffect } from "react"

type ModelProps = {
  children: any
  model: boolean
  onClose: (val: boolean) => void
  title: string
}

export const Model: FC<ModelProps> = (_props) => {

  useEffect(() => {
    const cb = (e: any) => {
      console.log(e.key);
      if (e.key == "Escape") {
        _props.onClose(false)
      }
    }
    window.addEventListener("keyup", cb)
    return () => {
      window.removeEventListener("keyup", cb)
    }
  }, [])

  return (
    _props.model ? <div className="flex justify-center items-center fixed top-0 left-0 h-screen w-screen z-30 ">
      <div className="z-50 p-4">
        {_props.children}
      </div>
      <div className="close z-40 absolute top-0 left-0 h-screen w-screen opacity-75 bg-black" onClick={() => _props.onClose(false)}></div>
    </div> : ""
  )
}