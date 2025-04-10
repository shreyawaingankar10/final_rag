// 👇 Gemini Summary Route
app.post("/api/gemini-summary", async (req, res) => {
    const { prompt } = req.body;
  
    try {
      const geminiRes = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            key: process.env.GEMINI_API_KEY,
          },
        }
      );
  
      const summary =
        geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available";
      res.json({ summary });
    } catch (err) {
      console.error("Gemini API Error:", err.message);
      res.status(500).json({ summary: "AI Summary Failed." });
    }
  });
  