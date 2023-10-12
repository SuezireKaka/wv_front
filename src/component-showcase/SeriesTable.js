import SeriesSkin from "./SeriesSkin";
import { Link } from "react-router-dom";

export default function Showcase({data = [], colnum = 5}) {
    console.log(data)

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
                        <Link to={"/series/" + series.id} state={{ seriesId: series.id }}>
                            <SeriesSkin series={series}/>
                        </Link>
                    </td>
                })}
            </tr>
        })}
    </>
}