const form = document.getElementById("feedbackForm");

const responseMessage = document.getElementById("responseMessage");

form.addEventListener("submit",async function(event){
    event.preventDefault();

    const name=document.getElementById("name").value.trim();

    const rating = document.getElementById("rating").value.trim();

    const comments = document.getElementById("comments").value.trim();


const feedbackData={
    name:name,
    rating:rating,
    comments:comments
};

console.log("Sending feedback:", feedbackData);

try{
    const response = await fetch(
        "https://feedback-manager-vvsl.onrender.com/api/feedback",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(feedbackData)
        }

    );

    const data = await response.json();
     console.log("Backend response:", data);
     if (!response.ok) {
         responseMessage.textContent =
          data.message || "Failed to submit feedback.";

           return; 

        } 
        
        responseMessage.textContent = data.message; 
        
        form.reset();
}catch(error){
console.error(error); 
responseMessage.textContent =
 "Unable to connect to the server.";

}

});
