const Table = ({columns = [], dataset = []}) => {
    console.log(columns,dataset)
    return (
        <table border={1} cellSpacing={0} className="styled-table">
            <thead>
                <tr>
                {columns.map(ele=><th style={{'textAlign':'center'}}>{ele}</th>)}
                </tr>
            </thead>
            <tbody>
                {dataset.map(object=>(
                    <tr key={object.id}>
                        {columns.map((ele,index)=>(<td key={index} style={{'textAlign':'center'}}>{object[ele]?object[ele]:"N/A"}</td>))}
                    </tr>
))}
            </tbody>
        </table>
    )
}
export default Table