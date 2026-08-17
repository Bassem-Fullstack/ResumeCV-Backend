


// هنكتب كود ذكاء اصطناعي بتاعنا وهنبتعتلوة اتنين بارميترس عبارة عن اسم وظيفة وبيانات خام بتاع مستخدم هنبصيها من كونتلير هنا وهو هيتعامل معاة بناء على بروميت كان ممكن اكتبها هناك في كونتلير ونخلص بس كود هيكون كبير جدا جدا جدا الاحسن ننظم الدنيا هنا ويبقي كود متنظم ونطيف



const {GoogleGenerativeAI} = require("@google/generative-ai")



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)



const generateCVContent = async ({ jobTitle , rawInput }) => {


const model = genAI.getGenerativeModel({model : "gemini-3.5-flash"})
const prompt = `
You are an expert system and professional resume (CV) writer.
Your task is to craft a high-quality, professional, and ATS-friendly CV tailored to the target job title, based on provided user raw data.

Rules:
1. SUMMARY: Write a concise, impactful 2-line summary (approx 30-40 words) that connects the target job title "${jobTitle}" with the user's past work experience and background provided in the raw data.
2. SKILLS: Extract skills from provided data. IF few or no skills are provided, infer and add relevant industry-standard skills (hard & soft) based on target job title "${jobTitle}" and past experience.
3. EXPERIENCE: Format existing job roles cleanly with actionable bullet points. Do NOT invent fake companies or fake job titles. If no experience exists, return an empty array.
4. EDUCATION: Standardize degree names (e.g., "Computer Science" -> "B.Sc. in Computer Science") and university/school names cleanly. Include GPA, graduation grade, project honors, or key details in the 'certification' field if mentioned. If no education data is provided, return an empty array.
5. STRICT CONTENT LIMITS: Focus ONLY on summary, experience, skills, and education. Do NOT invent false information.
6. JSON STRUCTURE: Strictly return output matching the JSON structure below without extra formatting or prose.

JSON Structure:
{
  "summary": "A concise, professional summary sentence/paragraph.",
  "experience": [
    {
      "position": "Job Title",
      "company": "Company Name",
      "duration": "Dates/Duration",
      "bullets": [
        "First bullet point highlighting an achievement or responsibility.",
        "Second bullet point with actionable details."
      ]
    }
  ],
  "education": [
    {
      "school": "University or Institution Name",
      "degree": "Degree Title (e.g., B.Sc. in Computer Science)",
      "year": "Graduation Year / Duration",
      "certification": "Grade, GPA, project honors, or brief summary (leave empty string if none)"
    }
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}

Target Job Title: ${jobTitle}
User Data: ${JSON.stringify(rawInput, null, 2)}
`;
// null , 2)}  معناها رجعلي بيانات جيسون يكونوا تحت بعض عواميد مش صفوف جمب بعض دة الهدف من سطرين دولت نال و 2 يعني عواميد تحت بعض ميكونوش جمب بعض 



const result = await model.generateContent(prompt)


const responseText = result.response.text()


const removeText = responseText.replace(/```json|```/g , "").trim()

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











