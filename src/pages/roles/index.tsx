import { RolesWrapper } from "@/components/pages/roles"
import { RoleStore } from "@/stores/roles"
import { Layout } from "@/types/layout"
import { useEffect } from "react"

export default function Page() {
  useEffect(() => {}, [])
  return (
    <div>
      <RoleStore.Provider>
        <RolesWrapper />
      </RoleStore.Provider>
    </div>
  )
}

Page.layout = Layout.DASHBOARD