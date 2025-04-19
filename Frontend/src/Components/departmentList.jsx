const List = (props)=>{
    const {departments} = props
    return(
        <aside className="sidebar">
            <ul>
            {departments.map((item,index)=><li key={index}>{item}</li>)}
        </ul>
        </aside>
    )
}
export default List