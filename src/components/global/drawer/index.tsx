import { GlobalStore } from "@/stores/global"
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"

export const Drawer = () => {
  const globalStore = GlobalStore.useContainer()

  const router = useRouter()

  const activeClass = useCallback((path: string) => {
    return router.pathname == path ? "bg-[#64646473]" : ""
  },[router.pathname])
  return (
    <aside className="dashboard-layout__drawer border-r border-gray-600 sticky">
      <ul>
        {globalStore.links.map((e, i) => (
          <li key={i} className={`pl-4 p-2 cursor-pointer border-l-transparent ${activeClass(e.path)}`} onClick={() => router.push({
            pathname: e.path,
          })}>{e.label}</li>
        ))}
      </ul>
    </aside>
  )
}