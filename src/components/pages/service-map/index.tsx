import { ServiceMapStore } from "@/stores/service-map"
import { Suspense, lazy, useEffect, useRef, } from "react"
import { Tag } from "@/components/ui/tag";
import { PencilIcon, PlusIcon } from "@heroicons/react/20/solid";
import { ServiceMapForm } from "./service-map-form";
import { Model } from "@/components/ui/model";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/solid";
const Table = lazy(() => import("@/components/ui/table"))

export const ServiceMapWrapper = () => {
  const eleRef = useRef<HTMLDivElement>(null);
  const serviceMapStore = ServiceMapStore.useContainer()

  useEffect(() => {
    if (!!eleRef.current) {
      serviceMapStore.initData();
    }
  }, [eleRef])


  return (
    <div ref={eleRef}>
      <div className="py-4 font-extrabold text-3xl">
        <h1>Service Map</h1>
      </div>
      <div className="pb-4">
        <button className="rounded-md outline-orange-500 focus:outline-1 p-2 bg-gray-600 text-white"
          onClick={() => serviceMapStore.initData()}>
          <ArrowPathIcon className="h-4" />
        </button>
      </div>
      <Suspense fallback="loading...">
        <Table
          header={serviceMapStore.tableHeader}
          onHeaderChange={(e: any) => serviceMapStore.setTableHeader(e)}
          data={serviceMapStore.data}
          border
          tdElement={{
            auth: (el, i) => {
              return <span key={i} className="text-center block w-full h-full items-center">
                <Tag active={el.auth} />
              </span>
            },
            default: (el, i) => {
              return <span key={i} className="text-center block w-full h-full items-center">
                <Tag active={el.default} />
              </span>
            },
            action: (el, i) => {
              return !el.default ?
                <div
                  className="text-center flex justify-center"
                >
                  <button
                    onClick={() => {
                      serviceMapStore.setSelectedType("update")
                      serviceMapStore.setSelected(el)
                    }}
                    className="rounded-md outline-orange-500 focus:outline-1 p-2 bg-gray-600 text-white">
                    <PencilIcon
                      className="h-4 cursor-pointer"
                    />
                  </button>
                  <div className="p-1"></div>
                  <button
                    onClick={() => {
                      if (confirm(`are you sure you realy want to delete this site map;\n ${el.key} "${el.value}"`)) {
                        serviceMapStore.deleteSiteMap(el.id)
                      }
                    }}
                    className="rounded-md outline-orange-500 focus:outline-1 p-2 bg-red-600 text-white">
                    <TrashIcon className="h-4" />
                  </button>
                </div>
                : <div></div>
            }
          }}
        />
      </Suspense>

      <div className="pt-4">
        <button className="p-2 px-6 pl-4 flex bg-gray-600" onClick={() => {
          serviceMapStore.setSelectedType("create")
          serviceMapStore.seedSelected()
        }}>
          <PlusIcon className="h-6" />
          <span className="pl-2">Add</span>
        </button>
      </div>

      <Model title="Some stuff" model={!!serviceMapStore.selected} onClose={() => serviceMapStore.setSelected(null)} >
        <div className="bg-gray-900 p-4 w-[600px]">
          <ServiceMapForm type={serviceMapStore.selectedType} onSubmit={() => {
            if (serviceMapStore.selectedType == "update") {
              if (confirm(`are you sure you want to update this service map`)) {
                serviceMapStore.updateSiteMap(`${serviceMapStore.selected.id}`, serviceMapStore.selected)
              }
            } else {
              serviceMapStore.createSiteMap(serviceMapStore.selected)
            }
          }} data={serviceMapStore.selected}
            onDataChange={serviceMapStore.setSelected} />
        </div>
      </Model>


    </div>
  )
}