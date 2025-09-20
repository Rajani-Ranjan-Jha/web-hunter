const apikey = process.env.OPENROUTER_API_KEY 


const OpenRouter = async (SiteDescription) => {
    
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            `Bearer ${apikey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages: [
            {
              role: "user",
              content: `Given the following description of a website, Summarize the description such that it must be lesser than 110 characters(letters).
              And remember that you DONOT have include any extra text rather than the summarized description. Like the length of summarize description, etc.
              
              Description: ${SiteDescription}`,
            },
          ],
        }),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    const textOutput = data?.choices[0].message.content || 'Null hai'
    // const currentUsage = data?.usage
    // console.log("API Response:", textOutput);
    return textOutput
  } catch (error) {
    console.log("Error:",error)
  }
};

// OpenRouter(`DEADSHOT.io - Multiplayer online first-person shooter that's easily accessible. Grab your friends, join a lobby, and eliminate your opponents`)
module.exports = {OpenRouter}