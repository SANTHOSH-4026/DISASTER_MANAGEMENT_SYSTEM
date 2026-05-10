const aiService = require('../services/aiService');

class AIController {
  async chat(req, res) {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const reply = await aiService.generateChatResponse(message);
      res.json({ reply });
    } catch (error) {
      console.error('Groq Error:', error);
      res.status(500).json({ error: 'Failed to generate response' });
    }
  }

  async getPredictions(req, res) {
    try {
      const predictions = await aiService.generatePredictions();
      res.json(predictions);
    } catch (error) {
      console.error('Groq Prediction Error:', error);
      res.status(500).json({ error: 'Failed to generate predictions' });
    }
  }
}

module.exports = new AIController();
