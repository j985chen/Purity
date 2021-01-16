const button = document.getElementById("popup_button");

button.addEventListener("click", () => {
    console.log("clicked");
    chrome.tabs.create({ url: "http://childproof.herokuapp.com/" });
});