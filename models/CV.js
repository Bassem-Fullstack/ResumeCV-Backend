


const mongoose = require("mongoose")




const cvSchema = new mongoose.Schema({


user : {

type : mongoose.Schema.Types.ObjectId ,

ref : "User" ,

required : true 

} ,


jobTitle : {

 type : String ,

 required : true  

//  مستخدم بيكتب المسمي وظيفة هنا وبعدها الغباء اصطناعي يبدأ يعملوة سي في مناسب للوظيفة هو مقدم عليها

} ,


// هنعمل فيليد فية كل بيانات مستخدم دخلها لما يجي يعمل سي في وهنعمل فيليد تاني خاص بالغباء اصطناعي يرجعلنا بيانات اللى هو اقترحها للمستخدم وكتبها يرجعلنا ناتج ونخزن في سي في 

rawInput : {

 fullName : String ,

 email   : String ,

 phone  :  String ,

 address : String ,

 summary : String ,

 experience : [

  {
  
   company : String ,

   position : String ,

   duration : String ,

   description : String

  }

 ] ,

 education : [

 {
  
 school : String ,
 
 degree : String ,

 year : String ,

certification : String ,
 

 }

 ] ,

 skills : [ String ]

 },


 generatedContent : {

   summary : String ,

   experience : [
      
    {
     
        position : String ,

        company : String ,

        duration : String ,
        
        bullets : [String] // دة الوصف اللى مستخدم كتبوة بس الفكرة حطناها في مصفوفة عشان نعمل نقط سودة وكل سطر نص لهو تفصيلة بص تحت على سبيل مثال
      
       
// 1- انا صممت ذكاء اصطناعي دة اول نقطة اهو 

// 2- وكمان مبرمج قد الدنيا يا عم دة نقطة تانية 

// عشان كدة كتبتوة بالمنظر دة وحططيتوة في مصفوفة ويعرض للمستخدم بشكل متناسق لان الغباء اصطناعي ممكن يعرض يعرض اكتر من وصف للمستخدم عشان كدة حطينها في مصفوفة افرض مستخدم عايز اكتر من وصف واحد ويكون متنسق لو حطيتهم من غير مصفوفة هيبقوا نص كامل وطويل مع بعض عشان حطينها في مصفوفة وكل انديكس هناك في فروند اند نعرضهالوة بطريقة شيك تحت بعض 


    }


   ] ,

   
  
//   ["JavaScript", "Node.js", "MongoDB"] هتكتب كدة وساعتها تقدر تعرضهم تحت بعض او جمب بعض مش هتفرق

 education : [

 {
  
 school : String ,
 
 degree : String ,

 year : String ,

certification : String ,
 

 }

 ] ,


skills : [ String ], 


languages : [
    {
      name : String,      
      level : String,     
    }
  ]


 } ,

 

 createdVia : {

  type : String ,

  enum : ["ai" , "manual"] ,

  required : true  // بنحدد نشوف cv اتعمل دة منيول ولا بالذكاء اصطناعي هو دة حقل بيحددلنا كدة  
 

 }



} , 


{timestamps : true }

)



module.exports = mongoose.model("CV" , cvSchema)











