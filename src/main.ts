const form = document.getElementById("input-area");
const inputText = document.getElementById("inputText");
const result = document.getElementById("result");

if (form) {
    form.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const text = inputText ? (inputText as HTMLInputElement).value.trim() : "";
    if (!text) {
        if (result) {
            result.textContent = "Please enter some text to simplify.";
        }
        return;
    }

    try {
        const response = await fetch("http://localhost:5052/simplify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });

            if (!response.ok) {
                if (result) {
                    result.textContent = "Error: " + response.statusText;
                }
                return;
            }

            const data = await response.json();
            if (result) {
                result.textContent = `${data.simplified}`;
            }
        } catch (error) {
            if (result) {
                if (error instanceof Error) {
                    result.textContent = `Error: ${error.message}`;
                } else {
                    result.textContent = "An unknown error occurred.";
                }
            }
        }
    });
}
