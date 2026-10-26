const feedbackContainer =
    document.getElementById("feedbackContainer");


async function loadFeedback() {

    try {

        const response =
            await fetch("https://feedback-manager-vvsl.onrender.com/api/feedback");


        const data =
            await response.json();


        console.log("Feedback response:", data);


        if (!response.ok) {

            feedbackContainer.textContent =
                data.message || "Failed to load feedback.";

            return;
        }


        const feedbacks = data.feedbacks;


        console.log("Feedbacks:", feedbacks);

        console.log(
            "Is array?",
            Array.isArray(feedbacks)
        );


        if (feedbacks.length === 0) {

            feedbackContainer.textContent =
                "No feedback available yet.";

            return;
        }


        feedbacks.forEach((feedback) => {

            const card =
                document.createElement("div");

            card.classList.add("feedback-card");


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


            card.appendChild(name);

            card.appendChild(rating);

            card.appendChild(comments);


            feedbackContainer.appendChild(card);

        });


    } catch (error) {

        console.error(error);

        feedbackContainer.textContent =
            "Unable to connect to the server.";

    }

}


loadFeedback();
