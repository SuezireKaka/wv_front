import { Fetch } from "toolbox/Fetch";
import { useLocation } from "react-router";
import SeriesTable from "../component-showcase/SeriesTable";

export default function Showcase() {

    return <div className="Question">
        <table>
            <tbody>
                <SeriesTable data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} colnum={5}/>
            </tbody>
        </table>
    </div>
}
  