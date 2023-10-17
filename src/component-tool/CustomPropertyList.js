export default function CustomPropertyList({selected={}}) {


    const DEFAULT_TOOLSET_URL = `http://localhost:8080/tool/anonymous/getObjectById/`

    return <>
        {selected && selected?.customPropertiesList
            && selected.customPropertiesList?.length > 0
        ? <p>프로퍼티가 있네요</p>
        : <p>프로퍼티가 없습니다</p>
        }
        <button style={{width : "100%"}}>+ 프로퍼티 추가</button>
    </>
}