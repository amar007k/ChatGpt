let prompt = document.querySelector("#prompt")
let btn = document.querySelector("#btn")
let chatContainer = document.querySelector(".chat-container")
let userMessage = null;
let Api_Url='https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAPnaLp84XcKH2HzRggcKlnI3tz_dniIEU';

function createChatBox(html,className){
    let div = document.createElement("div")
    div.classList.add(className)
    div.innerHTML=html
    return div
}


async function getApiResponse(aiChatBox){
    let textElement=aiChatBox.querySelector(".text")
    try{
        let response = await fetch(Api_Url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "contents":[
                    {"role":"user",
                    "parts":[{text:userMessage}]}]
            })
        });

        let data =await response.json(); 
        console.log("API Response:", data); 
        let apiResponse=data?.candidates[0].content.parts[0].text;
        console.log(apiResponse);
        textElement.innerText=apiResponse;
    } catch (error) {
        console.log(error)
    }
    finally {
        const loadingElement = aiChatBox.querySelector(".loading");
        if (loadingElement) {
            loadingElement.style.display = "none"; 
        }
    }
}

function showLoading(){
    let html=`<div class="ai-chat-box">
            <div class="img">
                <img src="images/ai.png" alt="" width="50">
            </div>
            <p class="text">
                <img class="loading" src="images/loading.png" alt="loading" height="50">
        </div>`;
        let aiChatBox=createChatBox(html,"ai-chat-box");
        chatContainer.appendChild(aiChatBox)
        getApiResponse(aiChatBox)


}

// Button click event
btn.addEventListener("click", () => {
    sendMessage();
});

// Key press event for input
prompt.addEventListener("keypress", (event) => {
    if (event.key === "Enter") { // Check if the Enter key is pressed
        sendMessage();
    }
});

//btn.addEventListener("click",()=>{
    function sendMessage(){
    userMessage=prompt.value
    if(!userMessage)return;
    let html=`<div class="user-chat-box">
            <div class="img">
                <img src="images/user.png" alt="" width="50">
            </div>
            <p class="text"></p>
        </div>`;
        let userChatBox=createChatBox(html,"user-chat-box");
        userChatBox.querySelector(".text").innerText=userMessage
        chatContainer.appendChild(userChatBox)
        prompt.value=""
        setTimeout(showLoading,500)

}