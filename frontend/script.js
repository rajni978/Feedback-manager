const form = document.getElementById("feedbackForm");

const studentNameInput = document.getElementById("studentName");
const ratingInput = document.getElementById("rating");
const commentInput = document.getElementById("comment");

const responseMessage = document.getElementById("responseMessage");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const studentName = studentNameInput.value.trim();
    const rating = Number(ratingInput.value);
    const comment = commentInput.value.trim();

    const feedbackData = {
        name: studentName,
        rating: rating,
        comments: comment
    };

    console.log("Sending feedback:", feedbackData);

    try {

        const response = await fetch(
            "http://localhost:3000/feedback",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(feedbackData)
            }
        );

        const data = await response.json();

        console.log("Backend response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Failed to submit feedback");
        }

        responseMessage.textContent = data.message;

        form.reset();

    } catch (error) {

        console.log("Error:", error);

        responseMessage.textContent =
            "Something went wrong. Please try again.";
    }
});