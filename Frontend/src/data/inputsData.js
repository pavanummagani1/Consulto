const FormsData = {
    addDoctorForm:{
        labels:['Upload Image','Doctor Name','Doctor Email','Set Password','Fees','Speciality','Degree','Address','AboutDoctor'],
        fields:[
            {type : "file", placeholder : "Upload image", id : "uploadImage", name : "doctorProfile" },
            {type: "text", placeholder: "Enter Doctor Name", id: "username", name: "doctorName" },
            {type: "email", placeholder: "Enter Doctor Email", id: "email", name: "doctorEmail" },
            {type:"password", placeholder:"Set Doctor Password", id:"password", name:"password"},
            {type:"number", placeholder:"doctor fees", id:"fees",name:"doctorFees"},
            {type:"text", placeholder:"Docotor Speciality", id:'speciality', name:'doctorSpeciality'},
            {type:'text', placeholder:"Doctor's Degree", id:'degree', name:'doctorDegree'},
            {type:'text',placeholder:"Doctor Address", id:'address', name:'doctorAddress'},
            {type:"text", placeholder:"about Doctor", id:"about", name:'about'} 
        ]

    },
    patientForm:{
        label:["Patient Name","Gaurdian Name", "Age", "Mobile Number", "Consulting Doctor","Appointment Date", "Time Slots"],
        fields:[
            {type: "text", placeholder: "Enter Patient Name", id: "patientname", name: "patientName" },
            {type: "text", placeholder: "Enter Gaurdian Name", id: "gaurdianName", name: "gaurdianName" },
            {type:"number", placeholder:"Patient Age", id:"age",name:"patientAge"},
            {type:"tel", placeholder:"Patient Mobile Number", id:"mobileNumber",name:"mobileNumber"},
            {type:'text', placeholder:"Consulting Doctor", id:'ConsultingDoctor', name:"consultingDoctor"},
            {type:'date', placeholder:"Enter Date", id:'date', name:'Date'},   
        ]
    },
    profileData:{
        label:['User Name', 'Email', 'Mobile Number', 'password'],
        fields:[
            {type: "text", id: "username", name: "userName" },
            {type: "email",id: "email", name: "userEmail" },
            {type: "tel",id: "mobileNumber", name: "mobileNumber" },
            {type:"password",id:"password", name:"password"},
        ]
    }
    
}
export default FormsData