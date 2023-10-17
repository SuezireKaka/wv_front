import { Fetch } from "toolbox/Fetch"
import CustomProperty from "./CustomProperty"

export default function CustomPropertyList({selected}) {

    console.log("잘먹겠습니다", selected)


    const PROPERTIES_LISt_URL = `http://localhost:8080/tool/anonymous/listPropertiesOf/`

    return <>
        {selected && selected.id
        ? <>
            <Fetch uri={PROPERTIES_LISt_URL + selected.id} renderSuccess={data => {
                console.log("데이타 보여주세요!", data)
                return data.length > 0
                ? data.map(property => <div>
                    <CustomProperty propType={property.propType} propVal={property.propVal}/>
                </div>)
                : <p>프로퍼티가 없습니다</p>
            }}/>
            <button style={{width : "100%"}}>+ 프로퍼티 추가</button>
        </>
        : <p></p>
        }
        
    </>
}