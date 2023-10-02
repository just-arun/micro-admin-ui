import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"

export const Drawer = () => {
  const router = useRouter()
  const links = useMemo(() => {
    return [
      { label: "Home", path: "/" },
      { label: "Settings", path: "/settings" },
      { label: "Users", path: "/users" },
      { label: "Roles", path: "/roles" },
      { label: "Access", path: "/access" },
      { label: "Service Map", path: "/service-map" },
    ]
  }, [router])
  const activeClass = useCallback((path: string) => {
    return router.pathname == path ? "bg-[#64646473]" : ""
  },[router.pathname])
  return (
    <aside className="dashboard-layout__drawer border-r border-gray-600 sticky">
      <ul>
        {links.map((e, i) => (
          <li key={i} className={`pl-4 p-2 cursor-pointer border-l-transparent ${activeClass(e.path)}`} onClick={() => router.push({
            pathname: e.path,
          })}>{e.label}</li>
        ))}
      </ul>
    </aside>
  )
}