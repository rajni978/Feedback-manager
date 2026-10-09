const feedbackContainer =
    document.getElementById("feedbackContainer");


async function loadFeedback() {

    try {

        const response =
            await fetch("http://localhost:3000/feedback");


        if (!response.ok) {
            throw new Error("Failed to fetch feedback");
        }


        const feedbacks =
            await response.json();


        if (feedbacks.length === 0) {

            feedbackContainer.textContent =
                "No feedback available yet.";

            return;
        }


        feedbackContainer.innerHTML = "";


        feedbacks.forEach((feedback) => {

            const feedbackCard =
                document.createElement("div");

            feedbackCard.classList.add("feedback-card");


            const name =
                document.createElement("h3");

            name.textContent =
                feedback.name;


            const rating =
                document.createElement("p");

            rating.textContent =
                `Rating: ${feedback.rating}/5`;


            const comments =
                document.createElement("p");

            comments.textContent =
                feedback.comments;


            feedbackCard.appendChild(name);

            feedbackCard.appendChild(rating);

            feedbackCard.appendChild(comments);


            feedbackContainer.appendChild(
                feedbackCard
            );

        });

    } catch (error) {

        console.log("Error:", error);

        feedbackContainer.textContent =
            "Failed to load feedback.";

    }

}


loadFeedback();
