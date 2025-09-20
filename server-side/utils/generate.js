const GenerateData = async (req, res) => {
  try {
    const { url, title, description, allowedCategories = [] } = req.body;

    if (!url || !title || !description) {
      return res.status(400).json({ error: 'Missing data at /generate. Please provide url, title, and description.' });
    }

    if (!Array.isArray(allowedCategories) || allowedCategories.length === 0) {
      return res.status(400).json({ error: 'Missing or empty "allowedCategories" array. Please provide a list of categories to choose from.' });
    }

    // Build conversation context for Gemini
    const contents = [];

    // Add conversation history if available
    // if (history && history.length > 0) {
    //   for (const message of history) {
    //     contents.push({
    //       role: message.role,
    //       parts: [{ text: message.content }]
    //     });
    //   }
    // }

    // Craft the prompt for Gemini
    const userPrompt = `Given the following website information:
    URL: ${url}
    Title: ${title}
    Description: ${description}

    Your task is to:
    1. Rephrase the provided title to be simple and understandable. The title should be like a title, it shouldnot include any extra sentences separated by "|" or ":".
    2. Rephrase the provided description to be more understandable and clear(between 50 to 100 characters).
    3. From the following list of allowed categories, identify atmost 5 categories that best describe the website. If no suitable categories are found, return an empty array for categories. But don't include any extra category which is not in the list of allowed categories.
    4. Most importantly, if there is something "|" or ":" or anything like this in title or description, remove this and make title/description suitable without these kind of things.
    Allowed Categories: ${allowedCategories.join(', ')}

    Please return your response in a JSON format with the following structure:
    {
      "modifiedTitle": "Your rephrased title here",
      "modifiedDescription": "Your rephrased description here",
      "categories": ["Category 1", "Category 2", "Category 3",...]
    }`;

    // Add current user question
    contents.push({
      role: "user",
      parts: [{ text: userPrompt }]
    });

    // Updated to use the correct Gemini API endpoint
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GOOGLE_API_KEY}`, { // Use process.env for API key
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
            responseMimeType: "application/json", // Instruct Gemini to respond with JSON
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      return res.status(response.status).json({ error: `Gemini API Error: ${errorText}` });
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2)); // Log the full response for debugging

    // Safely extract the JSON string from Gemini's response
    const geminiOutputText = data.candidates && data.candidates.length > 0 &&
                             data.candidates[0].content && data.candidates[0].content.parts &&
                             data.candidates[0].content.parts.length > 0
                             ? data.candidates[0].content.parts[0].text
                             : null;

    if (!geminiOutputText) {
        return res.status(500).json({ error: 'No valid response text received from Gemini.' });
    }

    // Parse the JSON string received from Gemini
    let geminiParsedOutput;
    try {
        geminiParsedOutput = JSON.parse(geminiOutputText);
    } catch (parseError) {
        console.error('Error parsing Gemini JSON response:', parseError);
        return res.status(500).json({ error: 'Failed to parse Gemini API response as JSON.' });
    }
    
    // Validate the structure of the parsed output
    if (!geminiParsedOutput.modifiedTitle || !geminiParsedOutput.modifiedDescription || !Array.isArray(geminiParsedOutput.categories)) {
        return res.status(500).json({ error: 'Gemini response did not contain expected fields (modifiedTitle, modifiedDescription, categories).' });
    }

    res.json({
        modifiedTitle: geminiParsedOutput.modifiedTitle,
        modifiedDescription: geminiParsedOutput.modifiedDescription,
        categories: geminiParsedOutput.categories
    });

  } catch (error) {
    console.error('Error in /generate:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
}