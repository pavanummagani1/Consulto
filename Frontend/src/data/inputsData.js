const FormsData = {
    addDoctorForm:{
        labels:['Upload Image','Doctor Name','Doctor Email','Set Password','Fees','Department','Speciality','Degree','Address','AboutDoctor','Avaliable Slots','Experience'],
        fields:[
            {type : "file", placeholder : "Upload image", id : "uploadImage", name : "image" },
            {type: "text", placeholder: "Enter Doctor Name", id: "username", name: "name" },
            {type: "email", placeholder: "Enter Doctor Email", id: "email", name: "email" },
            {type:"password", placeholder:"Set Doctor Password", id:"password", name:"password"},
            {type:"number", placeholder:"Doctor fees", id:"fees",name:"fees"},
            {type:"text", placeholder:"Docotor Department", id:'department', name:'department'},
            {type:"text", placeholder:"Docotor Speciality", id:'speciality', name:'speciality'},
            {type:'text', placeholder:"Doctor's Degree", id:'degree', name:'degree'},
            {type:'text',placeholder:"Doctor Address", id:'address', name:'address'},
            {type:"text", placeholder:"about Doctor", id:"about", name:'about'},
            {type:"text", placeholder:"Avaliable slots", id:"avaliableslots", name:'avaliableslots'},
            {type:"number", placeholder:"Years of Experience", id:"experience", name:'experience'},
            {
                type: "radio",
                name: "avaliable",
                options: [
                    { label: "Available", value: true },
                    { label: "Not Available", value: false }
                ]
            }
        ]

    },
        patientForm: {
            label: ["Patient Name", "Guardian Name", "Age","Email", "Mobile Number"],
            fields: [
                {type: "text", placeholder: "Enter Patient Name", id: "patientname", name: "patientName" },
                {type: "text", placeholder: "Enter Guardian Name", id: "guardianName", name: "guardianName" },
                {type: "number", placeholder: "Patient Age", id: "age", name: "patientAge"},
                {type: "mail", placeholder: "Patient Email", id: "Email", name: "email"},
                {type: "tel", placeholder: "Patient Mobile Number", id: "mobileNumber", name: "mobileNumber"},
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