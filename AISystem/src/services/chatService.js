
const API_URL = "https://agentic-ai-fastapi.vercel.app/ask";

export const sendChatMessage = async (question) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(
        errorData.detail || `API Error: ${response.status}`
      );
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Chat Service Error:", error);
    throw error;
  }
};
