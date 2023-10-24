import { NewRolePage } from "@/components/pages/new-role"
import { AccessStore } from "@/stores/access"
import { CreateRoleStore } from "@/stores/create-role"
import { Layout } from "@/types/layout"
import { useEffect } from "react"

export default function Page() {
  useEffect(() => {}, [])
  return (
    <AccessStore.Provider>
      <CreateRoleStore.Provider initialState={"UPDATE"}>
        <NewRolePage />
      </CreateRoleStore.Provider>
    </AccessStore.Provider>
  )
}

Page.layout = Layout.DASHBOARD