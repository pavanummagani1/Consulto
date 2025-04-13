const List = (props)=>{
    const {departments} = props
    console.log(departments)
    return(
        <aside className="sidebar">
            <ul>
            {/* <span className="closeIcon"><i class="fa-solid fa-xmark"></i></span> */}
            {departments.map((item,index)=><li key={index}>{item}</li>)}
        </ul>
        </aside>
    )
}
export default List