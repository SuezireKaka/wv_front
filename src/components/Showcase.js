import { Fetch } from "toolbox/Fetch";
import { useLocation } from "react-router";
import SeriesTable from "../component-showcase/SeriesTable";

export default function Showcase() {

    return <div className="Question">
        <table>
            <thead>
                <div className="Question">
                <form>
                        <label>검색 :</label> {" "}
                        <input placeholder="찾으시는 제목을 입력하세요" type="text"/> {" "}
                        <button>검색</button>
                    </form>
                </div>
            </thead>
            <tbody>
                <SeriesTable data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} colnum={5}/>
            </tbody>
        </table>
    </div>
}
  