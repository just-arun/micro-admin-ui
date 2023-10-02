import { Drawer } from "@/components/global/drawer"
import { Header } from "@/components/global/header"
import { FC } from "react"

type DashboardProps = {
  children: JSX.Element
}

export const Dashboard: FC<DashboardProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Header />
      <Drawer />
      <main className="dashboard-layout__main p-8">
        {children}
      </main>
    </div>
  )
}