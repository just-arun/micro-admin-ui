import { FC, useEffect, useLayoutEffect, useRef, useState } from "react"

type TableHeader = {
  label: string
  key: string
  sort?: boolean
  sortOrder?: number
}

type TdElement = {
  [key: string]: (ele: any, i: number) => JSX.Element;
}


type TableProps = {
  header: TableHeader[]
  onHeaderChange: (header: TableHeader[]) => void
  data: any[]
  onSort?: (header: TableHeader, order: number) => void
  withSelect?: boolean
  selected?: any[]
  onSelectChange?: (data: any[]) => void
  border?: boolean
  tdElement?: TdElement
}

export const Table: FC<TableProps> = (_props) => {
  const selectAll = useRef<HTMLInputElement | null>(null)
  const list = useRef<HTMLInputElement[] | null[]>([])



  const _selectAll = (checked: boolean) => {
    list.current.forEach((e, k) => {
      if (e) {
        e.checked = checked
      }
      if (_props.onSelectChange) {
        _props.onSelectChange(checked ? _props.data : [])
      }
    })

  }


  const _changeHandler = () => {
    const data: any = [];
    list.current.forEach((e, k) => {
      const da = list.current[k];
      if (e?.checked) {
        data.push(JSON.parse(`${da?.getAttribute("data-value")}`))
      } else {

      }
    })
    if (_props.onSelectChange) {
      _props.onSelectChange(data);
    }
    if (selectAll.current && _props.selected) {
      selectAll.current.checked = _props.data.length == data.length
    }
  }


  const border = _props.border ? "border border-gray-500" : ""


  const tableData = (ele: any, key: string, i: number) => {
    if (!!_props.tdElement) {
        if (_props.tdElement[key]) {
            return _props.tdElement[key](ele, i)
        }
    }
    return ele[key]
}


  const render = () => (
    <div>
      <table className="w-full overflow-hidden">
        <thead className={`${border}`}>

          {_props.withSelect ? <th className={`${border} py-1 `}>
            <input ref={selectAll} type="checkbox" name="all" id="all"
              onChange={(v) => {
                _selectAll(v.target.checked)
              }}
            />
          </th> : ""}



          {_props.header.map((e, i) => (
            <th key={i} className={`${border}`}
              onClick={() => {
                if (!!_props.onSort) {
                  let order = 0
                  if (e.sortOrder != null) {
                    order = e.sortOrder
                  }
                  if (order > 0) {
                    order = -1
                  } else if (order < 0) {
                    order = 0
                  } else {
                    order = 1
                  }
                  _props.onSort(e, order)
                  _props.onHeaderChange([..._props.header].map((e) => ({ ...e, sortOrder: order })))
                }
              }}
            >{e.label}</th>
          ))}
        </thead>


        <tbody
          onChange={() => _changeHandler()}
        >



          {_props.data.map((e, i) => (
            <tr key={i}>

              {_props.withSelect ? <td className={`${border} text-center py-3 border-collapse`}
                style={{}}>
                <input data-value={JSON.stringify(e)}
                  ref={el => list.current[i] = el}
                  type="checkbox" name="all" id="all" />
              </td> : ""}


              {_props.header.map((k, j) => (
                <td className={`p-2 border-collapse ${border}`} key={j}>
                  {tableData(e, k.key, i)}
                </td>
              ))}
            </tr>
          ))}

        </tbody>

      </table>
    </div>
  )
  const [mounted, setMounted] = useState(false)
  useLayoutEffect(() => {
    if (typeof window != "undefined") {
      setMounted(true)
    } else {
      setMounted(false)
    }
  }, [])
  return mounted ? render() : <div>loading...</div>
}