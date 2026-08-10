


// هنكتب كود ذكاء اصطناعي بتاعنا وهنبتعتلوة اتنين بارميترس عبارة عن اسم وظيفة وبيانات خام بتاع مستخدم هنبصيها من كونتلير هنا وهو هيتعامل معاة بناء على بروميت كان ممكن اكتبها هناك في كونتلير ونخلص بس كود هيكون كبير جدا جدا جدا الاحسن ننظم الدنيا هنا ويبقي كود متنظم ونطيف



const {GoogleGenerativeAI} = require("@google/generative-ai")



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)



const generateCVContent = async ({ jobTitle , rawInput }) => {


const model = genAI.getGenerativeModel({model : "gemini-flash-latest"})


const prompt = `

you are expert system and professional resume(CV) writer.

Your task is to craft a high-quality , professional , and ATS-friendly CV

tailored to the target job title , based only on provided user raw data. 


Strict Rules : 

1- Do Not fabricate , invent , or extrapolate any skills , experience or achievements

not explicitly present in the provided data.

2- If there is no work experience , focuse on highlighting relevant skills and education rather than inventing fake roles.

3- Return the output EXCLUSIVELY as a valid JSON object . Do Not include 

any intro , outro , conversational text , or markdown code blocks .

4- Strictly follow this exach JSON structure : 

{
  "summary": "A concise, professional summary sentence/paragraph.",

  "experience": [
    {
      "position": "Job Title",

      "company": "Company Name",

      "duration": "Dates/Duration",

      "bullets": [
        "First bullet point highlighting an achievement or responsibility.",

        "Second bullet point with actionable and quantified details."
      ]
    }
  ],
  
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}

Target Job Title : ${jobTitle}

User Data : ${ JSON.stringify(rawInput , null , 2)} ` 


// null , 2)}  معناها رجعلي بيانات جيسون يكونوا تحت بعض عواميد مش صفوف جمب بعض دة الهدف من سطرين دولت نال و 2 يعني عواميد تحت بعض ميكونوش جمب بعض 



const result = await model.generateContent(prompt)


const responseText = result.response.text()


const removeText = responseText.replace(/```json|``` /g , "").trim()

// ساعات غباء اصطناعي لما تكتب بروميت وتقولوة ابعتلي ملف على هيئة جيسون يبعتهالك وفوق كدة نص مكتوب كلمة جيسون فوق الفايل وفوق المصفوفة والاوبجكيت بتاعك طبعا هتاخد فايل دة كوبي بيست زاي ماهو تيجي تبعتوة لجافا سكريبت وتحولوة لاوبجكيت

try {

return JSON.parse(removeText)

// بنحول الجيسون لاوبجكيت بعد ما مسحنا نص تيكست اللى كان بيتعرض فوق اول محتوي اللى غباء اصطناعي بعتهولنا ونبعت جيسون ملف صافي خالي من اخطاء وجيسون بيرس بيحول من جيسون لاوبجيكت عشان نعرف نبعتها لكنترول او دالة تانية ونتحكم فيها براحتنا

// استخدمت تراي والكاتش لان غباء اصطناعي طبعا بيهبد ومش دايما يطبعلك حاجة مظبوطة من غير تراي والكاتش كان سيرفر هيقف وهيعلق حتي لو كان ايرور بسيط جدا جدا  عشان كدة بقولوة اي ايرور ارمي في كاتش على طول 

}

catch(err){

throw new Error("Failed to parse object AI response as JSON")

}


}



module.exports = generateCVContent










// const {GoogleGenerativeAI} = require("@google/generative-ai")


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)



// const genertedCVResume = async({ jobTitle , rawInput }) => {



// const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"})  


// const prompt = `


// أنت مساعد متخصص في كتابة السير الذاتية الاحترافية (CV).
// مهمتك: صياغة محتوى CV احترافي بناءً على البيانات الحقيقية اللي هيديهالك المستخدم.

// قواعد صارمة:
// 1. متخترعش أي معلومة أو خبرة مش موجودة في البيانات المدخلة.
// 2. لو مفيش خبرات عملية، ركز على المهارات والتعليم بدل ما تختلق خبرة.
// 3. رجّع الناتج بصيغة JSON فقط، من غير أي نص إضافي قبله أو بعده، ومن غير Markdown code blocks.
// 4. الصيغة المطلوبة بالظبط:

// {
//   "summary": "نص تعريفي قصير",
//   "experience": [
//     {
//       "position": "اسم الوظيفة",
//       "company": "اسم الشركة",
//       "duration": "المدة",
//       "bullets": ["نقطة أولى", "نقطة تانية"]
//     }
//   ],
//   "skills": ["مهارة1", "مهارة2"]
// }

// الوظيفة المستهدفة: ${jobTitle}

// بيانات المستخدم: ${JSON.stringify(rawInput , null , 2)}

// `


// const resutl = await model.generateContent(prompt) 


// const textResponse = resutl.response.text()


// const clearText = textResponse.replace(/```json|```/g , "").trim()



// try {

// return JSON.parse(clearText)

// }

// catch(err) {

// throw new Error("failed ")

// }




// } 











