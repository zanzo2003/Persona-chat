import express from 'express';
import generateAiPersonaResponse from './src/services/aiService.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;


const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));


app.get('/ai-response', async (req, res) => {
  const response = await generateAiPersonaResponse(req.query.message);
  console.log("Controller Response: ", response);
  return res.json({
    status: 'success',
    message: response
  })
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});