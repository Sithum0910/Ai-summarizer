// Set default dark mode based on time of day
const toggle = document.querySelector('.toggle');
const modeText = document.getElementById('modeText');
const hours = new Date().getHours();
toggle.checked = hours > 7 && hours < 20;
modeText.textContent = toggle.checked ? "Light Mode" : "Dark Mode";

// Update mode text when toggle is clicked
toggle.addEventListener('change', () => {
    modeText.textContent = toggle.checked ? "Dark Mode" : "Light Mode";
});

// Clear Text Function
function clearText() {
    document.getElementById("inputText").value = "";
    document.getElementById("outputText").innerText = "";
    document.getElementById("errorText").innerText = "";
}

// Summarize Function
async function summarize() {
    const inputText = document.getElementById("inputText").value;
    const outputText = document.getElementById("outputText");
    const errorText = document.getElementById("errorText");
    const loader = document.getElementById("loader");

    // Clear previous output and errors
    outputText.innerText = "";
    errorText.innerText = "";

    // Show loader
    loader.style.display = "block";

    try {
        const summarizedText = await summarizeText(inputText);
        outputText.innerText = summarizedText;
    } catch (error) {
        errorText.innerText = "Error: " + error.message;
    } finally {
        // Hide loader
        loader.style.display = "none";
    }
}

// API Call Function
async function summarizeText(text) {
    const apiKey = "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"; // Your Hugging Face API key
    const model = "facebook/bart-large-cnn"; // Model for summarization

    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: text })
    });

    if (!response.ok) {
        throw new Error("Failed to summarize text. Please try again.");
    }

    const data = await response.json();
    return data[0].summary_text;
}
