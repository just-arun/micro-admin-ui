import { GeneralPage } from "@/components/pages/general"
import { GeneralStore } from "@/stores/general"
import { Layout } from "@/types/layout"
import { useEffect } from "react"

export default function Page() {
  useEffect(() => { }, [])
  return (
    <div>
      <GeneralStore.Provider>
        <GeneralPage />
      </GeneralStore.Provider>
    </div>
  )
}

Page.layout = Layout.DASHBOARD