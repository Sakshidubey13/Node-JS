// To run this: npm install @google/generative-ai
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize with your API Key
const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");

async function generateCampusBitePitch(tempValue) {
  // Choose the model
  const model = genAI.getGenerativeModel({ 
    model: "gemini-pro",
    generationConfig: {
      temperature: tempValue, // 0.2 for formal, 0.9 for passionate
    }
  });

  const prompt = "Write a 1-minute investor pitch for 'CampusBite', a food delivery app for students.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  console.log(`--- Pitch (Temperature: ${tempValue}) ---`);
  console.log(response.text());
}

// Generate a formal pitch
generateCampusBitePitch(0.2);

// Generate an enthusiastic pitch
generateCampusBitePitch(0.9);