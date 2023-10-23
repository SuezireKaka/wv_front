import SeriesSkin from "./SeriesSkin";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Showcase({data = [], colnum = 5}) {
    const location = useLocation();
    let state = location.state;
    const CELL_STYLE = {
        width: "20%",
        border: "1px solid"
    }

    function sliceBy(data, colnum) {
        let resultArray = []
        for (let i = 0; i < data.length; i += colnum) {
            const chunk = data.slice(i, i + colnum);
            // do whatever
            resultArray.push(chunk)
        }
        return resultArray
    }

    return <>
        {sliceBy(data, colnum).map(slice => {
            return <tr style={CELL_STYLE}>
                {slice.map(series => {
                    return <td style={CELL_STYLE}>
                        <Link to={`/series/${series.id}`} state={{ seriesId: series.id, post: state?.post, page:1, boardId:state?.boardId}}>
                            <SeriesSkin series={series}/>
                        </Link>
                    </td>
                })}
            </tr>
        })}
    </>
}