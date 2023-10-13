import { Fetch } from "toolbox/Fetch";
import { useLocation } from "react-router";
import SeriesTable from "../component-showcase/SeriesTable";

export default function Showcase() {

    const location = useLocation();
    let state = location.state;
    console.log(state);

    const LIST_ALL_SERIES_URI = `/work/anonymous/listAllSeries/${state.boardId}/1`

    const TABLE_STYLE = {
        width: "100%",
        border: "1px solid",
        borderCollapse: "collapse"
    }

    return <div>
        <br/>
        <div className="Question">
            <form>
                <label>검색 :</label> {" "}
                <input placeholder="찾으시는 제목을 입력하세요" type="text"/> {" "}
                <button>검색</button>
            </form>
        </div> 
        <br/>
        <table responsive variant="white" style={TABLE_STYLE}>
            <tbody>
                <Fetch uri={LIST_ALL_SERIES_URI} renderSuccess={data => {
                    return <SeriesTable data={data.firstVal} colnum={5}/>
                }}/>
            </tbody>
        </table>
    </div>
}
  