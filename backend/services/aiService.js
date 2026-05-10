const groq = require('../config/groq');

class AIService {
  async generateChatResponse(message) {
    if (!groq) throw new Error('Groq client not initialized');

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an Indian AI Disaster Management Assistant. You help citizens by providing safety information based on the National Disaster Management Authority (NDMA) and National Disaster Response Force (NDRF) guidelines. Always provide actionable advice tailored to Indian geography and infrastructure. If asked about emergency numbers, strictly provide Indian numbers: 112 for National Emergency, 1078 for Disaster Management, 108 for Ambulance. Be concise, empathetic, and professional.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      model: 'llama3-8b-8192',
    });

    return chatCompletion.choices[0]?.message?.content || 'I am currently unable to respond.';
  }

  async generatePredictions() {
    if (!groq) throw new Error('Groq client not initialized');

    const prompt = `Generate exactly 6 realistic but simulated AI disaster predictions for different regions in India based on current seasonal patterns. 
    You MUST output valid JSON. The JSON must be an object containing a single key "predictions" which is an array of objects.
    Each object in the array MUST have these EXACT keys: "type" (e.g. Flood, Cyclone), "probability" (integer 0-100), "region" (string), "timeframe" (string), "confidence" (integer), "severity" (low, medium, high, critical), "affectedArea" (string), "estimatedImpact" (string).`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an advanced AI disaster prediction system for the Indian Subcontinent. You must output ONLY valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.5,
      response_format: { type: "json_object" }
    });

    const result = completion.choices[0]?.message?.content || '{"predictions": []}';
    const parsedData = JSON.parse(result);
    
    let predictions = parsedData.predictions || [];
    if (!Array.isArray(predictions)) {
      predictions = [];
    }
    
    return predictions;
  }
}

module.exports = new AIService();
