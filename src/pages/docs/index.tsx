import { Layout } from "@/types/layout"
import { useEffect } from "react"

export default function Page() {
  useEffect(() => {}, [])
  return (
    <div>
      <h1>Docs</h1>
    </div>
  )
}

Page.layout = Layout.DASHBOARD
