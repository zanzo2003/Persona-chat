import axios from 'axios';


async function generateAiPersonaResponse(messages){

    try {
        const response = await axios.get("http://localhost:3000/ai-response", {
            params: { 
                 message: messages 
            }
        });

        console.log(response.data.message);;
        return response.data.message;
  } catch (error) {
        console.error("Error fetching AI response:", error);
  }
}


export default generateAiPersonaResponse;