import { AccessWrapper } from "@/components/pages/access"
import { AccessStore } from "@/stores/access"
import { Layout } from "@/types/layout"

export default function Page() {
  return (
    <AccessStore.Provider>
      <AccessWrapper />
    </AccessStore.Provider>
  )
}


Page.layout = Layout.DASHBOARD
