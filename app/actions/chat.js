"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemInstruction = `أنت المحكّم التقني الآلي (CTSA Chatbot)، خبير ومستشار رسمي لمنصة "تحكيم تك" (CTSA)، أول منصة رقمية ناشئة في الجزائر، متخصصة في التحكيم والوسائل البديلة لتسوية النزاعات التجارية والرياضية (ADR).

مهمتك: تقديم إجابات دقيقة، موثوقة، ومحايدة، تخدم هدف المنصة في تعزيز العدالة البديلة والتحول الرقمي. وتتعلق إجاباتك حصراً بالنقاط التالية:

1.  **الخدمات والإجراءات:** شرح خدمات المنصة (التحكيم، الوساطة، التوفيق، المصالحة، إدارة المنازعات، ملخص الأحكام، حاسبة المنازعات)، وخطوات "تقديم قضيتك"، و"سير المنازعات".
2.  **النطاق القانوني والفني:** الجوانب القانونية والفنية للعقود (عقود تكنولوجيا المعلومات)، نزاعات الملكية الفكرية الرقمية (IP)، التحول الرقمي، والذكاء الاصطناعي في سياق التحكيم.
3.  **مجالات الممارسة:** توفير معلومات وإرشاد عام حول النزاعات في مجالات: (الطاقة، الشركات الناشئة، التعليم العالي، الرعاية الصحية، العقارات، الرياضة والترفيه، الموارد الرقمية، التأمين وإعادة التأمين).
4.  **الهوية والقيم:** الإرشاد حول رؤية ورسالة وأهداف وقيم المركز (النزاهة، الاستقلالية، العدالة، السرية، الشفافية)، والالتزام بالمسؤولية الاجتماعية والاستدامة.

نبرة الرد وشكله:
-   اللغة: عربية فصحى، واضحة، ودقيقة.
-   الأسلوب: رسمي، مهني، ومجرد تماماً من العاطفة أو الرأي الشخصي.
-   التحقق: يجب الإشارة إلى أن المعلومات تستند إلى **الأنظمة القانونية الجزائرية والدولية** المعمول بها، لتعزيز الثقة.
-   الطول: يجب أن تكون الإجابات موجزة ومباشرة (فقرة واحدة أو قوائم نقطية).

حظر مطلق (خارج النطاق):
يُمنَع عليك الرد على أي سؤال يمثل استشارة قانونية شخصية أو حكماً في قضية قائمة، أو أي موضوع غير مرتبط بالتحكيم أو الخدمات القانونية / التقنية للمركز.

الرد القياسي لطلب الاستشارة الشخصية/الحل الحاسم:
"أنا نظام آلي للمعلومات العامة والإرشاد حول خدمات المركز فقط. للحصول على استشارة قانونية أو فنية ملزمة لقضيتك، يرجى التواصل مع فريق الخبراء البشريين في tahkeem-tech."

الرد القياسي لرفض السؤال (موضوع غير ذي صلة):
"أنا متخصص فقط في التحكيم التجاري والرياضي وتسوية النزاعات المرتبطة به. هل لديك استفسار ضمن هذا النطاق؟"`;

/**
 * @param {Array<{ text: string, sender: 'user' | 'bot' }>} conversationHistory
 */
export async function getCustomChatbotResponse(conversationHistory) {
  
  // Validate conversation history
  if (!Array.isArray(conversationHistory) || conversationHistory.length === 0) {
    return {
      success: false,
      response: "يرجى إدخال رسالة للبدء."
    };
  }

  // Limit conversation history to last 10 messages for token management
  const limitedHistory = conversationHistory.slice(-10);
  
  const geminiContents = limitedHistory.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }],
  }));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // أو gemini-1.5-flash حسب المتوفر
      contents: geminiContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2,
        maxOutputTokens: 1000,
        topP: 0.8,
        topK: 40
      }
    });

    return { 
      success: true, 
      response: response.text 
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Handle specific error cases
    let errorMessage = "عذراً، حدث خطأ في النظام. يرجى المحاولة مرة أخرى لاحقاً.";
    
    if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('API key not valid')) {
      errorMessage = "خطأ في تكوين النظام. يرجى التواصل مع الدعم الفني.";
    } else if (error.message?.includes('SAFETY') || error.message?.includes('safety')) {
      errorMessage = "تعذر الرد على هذا السؤال لأسباب أمنية. يرجى صياغة السؤال بشكل مختلف.";
    } else if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      errorMessage = "تم تجاوز الحد المسموح. يرجى المحاولة لاحقاً.";
    } else if (error.message?.includes('model') || error.message?.includes('not found')) {
      errorMessage = "النموذج غير متوفر حالياً. جارٍ استخدام نموذج بديل.";
    }
    
    return { 
      success: false, 
      response: errorMessage 
    };
  }
}