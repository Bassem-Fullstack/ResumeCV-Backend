

const CV = require("../models/CV")

const buildCV = require("./geminiService")

const asyncHandler = require("express-async-handler")




// ### 1- create By AI

const generateCV = asyncHandler ( async ( req , res) => {


const {

    fullName , 

     email ,

     phone , 

    summary , 

    address ,

    jobTitle , 
     
    experience ,

    skills ,

    education , 

    languages

}
 
 = req.body 


 if(!jobTitle) {

 return res.status(400).json("Job Title is required")

}



const rawInput = { fullName , email , phone , address , summary , jobTitle , experience , skills , education , languages}
 

const aiResult = await buildCV({ jobTitle , rawInput })


const createCV = await CV.create({

user : req.user._id ,

jobTitle ,

rawInput ,

 generatedContent: {

  summary: aiResult.summary,

   experience: aiResult.experience,

    skills: aiResult.skills,

    education: aiResult.education ,

    languages ,

  },
  

createdVia : "ai" 

})


res.status(201).json({

 success : true ,

 createCV
 
})


})



/////////////////////////////////////////////////////////////////////////////////////////////// 


// ### 2- create By User Manual

const createCVManual = asyncHandler ( async ( req , res) => {


 const {

    fullName , 

     email ,

     phone , 

    summary , 

    address,

    jobTitle , 
     
    experience ,

    skills ,

    education , 

    generatedContent 

}
 
 = req.body 
 
 
 if(!jobTitle || !generatedContent ) {

 return res.status(400).json({ message : "jobTitle and generatedContent are required" })

}



const rawInput = {

    fullName , 

     email ,

     phone , 
     
     address,

    summary , 

    jobTitle , 
     
    experience ,

    skills ,

    education

}
 

const CreateCVManual = await CV.create({

user : req.user._id ,

jobTitle , 

rawInput ,

generatedContent ,

createdVia : "manual"

}) 


res.status(201).json({

success : true ,

CreateCVManual 


})

})

////////////////////////////////////////////////////////////////////////////////////////////////////////////




// ### 3- get All CV for User



const getAllCV = asyncHandler (async ( req , res) => {


 const getCV = await CV.find({ user : req.user._id }).sort({ createdAt : -1 })
 
 if(!getCV) {

 return res.status(400).json({ message : "NO CV found" })

 }


res.status(200).json({

 success : true ,   

 getCV 

})


})




////////////////////////////////////////////////////////////////////////////////////////////////////////////




// ### 4- get One CV for User



const getSingleCV = asyncHandler (async ( req , res) => {


const {id} = req.params
 
 const getOneCV = await CV.findOne({ user : req.user._id , _id : id }) 
   
 if(!getOneCV) {

 return res.status(400).json({ message : "CV not found" })

 }


res.status(200).json({

 success : true ,   

 getOneCV 

})


})




////////////////////////////////////////////////////////////////////////////////////////////////////////////




// ### 5- update CV for User


const updateCV = asyncHandler (async ( req , res) => {


const {id} = req.params 


const {jobTitle , generatedContent} = req.body 



const getCVToUpdate = await CV.findOne({ user : req.user._id , _id : id }) 


if (!getCVToUpdate) 
    
return res.status(404).json({ message: "CV not found" })


if (jobTitle) getCVToUpdate.jobTitle = jobTitle

if (generatedContent) getCVToUpdate.generatedContent = generatedContent

// بحطهم في شرط معين عشان خاطر مستخدم لما يحدث قيمة واحدة وميحدثش تانية متبقاش قيمة انديفينت على سبيل مثال انا حدثت مسمي وظيفة ومحدثتش باقي محتوي طبيعي قيمة تانية لما تيجي تتحدث هيقولي انديفينت يعني قيمة مجهولة متحدثتش رغم انك محدثتهاش انت حدثت قيمة واحدة فقط عشان كدة بقولوة لو اي شرط من دولت شايل قيمة حدثوة مش شايل قيمة متحدثوش

await getCVToUpdate.save()

res.status(200).json({ success : true , getCVToUpdate })


})





////////////////////////////////////////////////////////////////////////////////////////////////////////////




// ### 5- delete CV for User


const deleteCV = asyncHandler (async ( req , res) => {


const {id} = req.params 


const removeCV = await CV.findOneAndDelete({ _id: id, user: req.user._id })


if (!removeCV) 
    
return res.status(404).json({ message: "CV not found" })


res.status(200).json({ success : true , removeCV })


})



module.exports = { generateCV , createCVManual , getAllCV , getSingleCV , updateCV ,  deleteCV }



