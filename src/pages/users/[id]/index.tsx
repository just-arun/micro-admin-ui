import { UserDetailWrapper } from "@/components/pages/user-detail"
import { UserDetailStore } from "@/stores/user-detail"
import { Layout } from "@/types/layout"

export default function Page() {
  return (
    <UserDetailStore.Provider>
      <UserDetailWrapper />
    </UserDetailStore.Provider>
  )
}

Page.layout = Layout.DASHBOARD
