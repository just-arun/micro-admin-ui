import { AccessStore } from "@/stores/access"
import { Layout } from "@/types/layout"
import { useEffect, lazy, Suspense } from "react"

const AccessWrapper = lazy(() => import("@/components/pages/access"))

export default function Page() {
  useEffect(() => {}, [])
  return (
    <AccessStore.Provider>
      <Suspense fallback="loading...">
        <AccessWrapper />
      </Suspense>
    </AccessStore.Provider>
  )
}


Page.layout = Layout.DASHBOARD
