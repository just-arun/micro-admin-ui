import { AccessWrapper } from "@/components/pages/access"
import { ServiceMapWrapper } from "@/components/pages/service-map"
import { AccessStore } from "@/stores/access"
import { ServiceMapStore } from "@/stores/service-map"
import { Layout } from "@/types/layout"

export default function Page() {
  return (
    <ServiceMapStore.Provider>
      <ServiceMapWrapper />
    </ServiceMapStore.Provider>
  )
}


Page.layout = Layout.DASHBOARD
