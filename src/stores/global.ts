import { createContainer } from "@/util/context"
import { useRouter } from "next/router"
import { useMemo } from "react"

const Global = () => {
  const router = useRouter()
  const links = useMemo(() => {
    return [
      { label: "Home", path: "/", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sint ratione assumenda error distinctio veniam nostrum, doloribus numquam nobis doloremque fugit sed molestias, provident iusto minima animi nesciunt impedit tenetur." },
      { label: "App Settings", path: "/settings", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sint ratione assumenda error distinctio veniam nostrum, doloribus numquam nobis doloremque fugit sed molestias, provident iusto minima animi nesciunt impedit tenetur." },
      { label: "Roles", path: "/roles", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sint ratione assumenda error distinctio veniam nostrum, doloribus numquam nobis doloremque fugit sed molestias, provident iusto minima animi nesciunt impedit tenetur." },
      { label: "Access", path: "/access", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sint ratione assumenda error distinctio veniam nostrum, doloribus numquam nobis doloremque fugit sed molestias, provident iusto minima animi nesciunt impedit tenetur." },
      { label: "Service Map", path: "/service-map", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sint ratione assumenda error distinctio veniam nostrum, doloribus numquam nobis doloremque fugit sed molestias, provident iusto minima animi nesciunt impedit tenetur." },
      { label: "Users", path: "/users", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sint ratione assumenda error distinctio veniam nostrum, doloribus numquam nobis doloremque fugit sed molestias, provident iusto minima animi nesciunt impedit tenetur." },
      { label: "Docs", path: "/docs", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sint ratione assumenda error distinctio veniam nostrum, doloribus numquam nobis doloremque fugit sed molestias, provident iusto minima animi nesciunt impedit tenetur." },
    ]
  }, [router])
  return {
    links
  }
}

export const GlobalStore = createContainer(Global);
