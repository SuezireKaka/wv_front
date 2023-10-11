export default function Showcase({data = [], colnum = 5}) {

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
            return <tr>
                {slice.map(series => {
                    return <td>
                        {series.title}
                    </td>
                })}
            </tr>
        })}
    </>
}