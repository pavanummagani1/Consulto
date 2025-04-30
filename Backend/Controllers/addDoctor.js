const AddDoctor = (req,res)=>{
    let doctorData = req.body;
    res.status(200).json('DATA RECEVIED SUCESSFULLY');
    console.log(doctorData)

}
export default AddDoctor