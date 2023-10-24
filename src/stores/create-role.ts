import { AccessService } from "@/service/access";
import { RolesService } from "@/service/roles";
import { createContainer } from "@/util/context"
import { useRouter } from "next/router";
import { useState } from "react";

const CreateRole = (type = "CREATE") => {
  const [name, setName] = useState("");
  const [accesses, setAccesses] = useState<any>([]);
  const [selectedAccess, setSelectedAccess] = useState<any>([]);
  const [selectedAccessForRole, setSelectedAccessForRole] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("")

  const fetchAccess = async () => {
    try {
      setAccesses([])
      setSelectedAccess([]);
      const { data } = await AccessService.getAccess({ search, limit });
      setAccesses(data.data.accesses);
    } catch (err) {
      console.error(err);
    }
  }

  const removeOneFromSelectedAccessForRole = (i: any) => {
    if (type == "UPDATE") {
      if (!confirm(`do you really want to remove the access "${selectedAccessForRole[i].name}" from role`)) {
        return
      }
    }

    let result = JSON.parse(JSON.stringify(selectedAccessForRole))
    result.splice(i, 1)
    setSelectedAccessForRole(result);
  }

  const router = useRouter()

  const saveRole = () => {
    if (type == "CREATE") {
      return RolesService.saveOne({
        name: name,
        accesses: selectedAccessForRole,
      })
        .then((res) => {
          router.push({
            pathname: `/roles/[id]`,
            query: { id: res.data.data.data.id }
          })
        }).catch(err => {
          console.error(err);
        })
    }
    if (type == "UPDATE") {
      return RolesService.updateAccesses(router.query.id, {
        accesses: selectedAccessForRole,
      })
        .then((res) => {
          fetchOne(router.query.id);
        }).catch(err => {
          console.error(err);
        })
    }
  }

  const fetchOne = async (id: any) => {
    try {
      const { data } = await RolesService.getOne(id);
      let value = data.data.role
      setName(value.name)
      setSelectedAccessForRole(value.accesses)
    } catch (err) {
      console.error(err);
    }
  }

  return {
    name, setName, selectedAccess, setSelectedAccess,
    fetchAccess, limit, setLimit, search, setSearch,
    loading, setLoading, accesses, setAccesses,
    selectedAccessForRole, setSelectedAccessForRole,
    removeOneFromSelectedAccessForRole, saveRole, type,
    fetchOne,
  }
}

export const CreateRoleStore = createContainer(CreateRole);

