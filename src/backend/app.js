const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

app.post('/api/ask', async (req, res) => {
   const { question } = req.body;

   // OpenAI API URL
   const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';

   // OpenAI API request data
   const data = {
      prompt: question,
      max_tokens: 100,
   };

   try {
      // Send a POST request to the OpenAI API
      const response = await axios.post(url, data, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}}`,
         },
      });

      // Extract and send the generated text
      res.json({ message: response.data.choices[0].text });
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
   }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));