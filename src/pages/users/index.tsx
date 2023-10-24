import { UserWrapper } from "@/components/pages/users"
import { UsersStore } from "@/stores/users"
import { Layout } from "@/types/layout"
import { useEffect } from "react"

export default function Page() {
  useEffect(() => { }, [])
  return (
    <UsersStore.Provider>
      <UserWrapper />
    </UsersStore.Provider>
  )
}

Page.layout = Layout.DASHBOARD
