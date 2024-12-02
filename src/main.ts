const form = document.querySelector("form"); // Attach to the form, not the button
const inputText = document.getElementById("inputText") as HTMLInputElement;
const result = document.getElementById("result");

if (form && inputText && result) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const text = inputText.value.trim();
    if (!text) {
      result.textContent = "Please enter some text to simplify.";
      return;
    }

    try {
      const response = await fetch("http://localhost:5052/Simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(text), // Send `text` directly, as your controller expects
      });

      if (!response.ok) {
        result.textContent = "Error: " + response.statusText;
        return;
      }

      const data = await response.json();
      result.textContent = data.simplified; // Display the simplified text
    } catch (error) {
      if (error instanceof Error) {
        result.textContent = `Error: ${error.message}`;
      } else {
        result.textContent = "An unknown error occurred.";
      }
    }
  });
}
