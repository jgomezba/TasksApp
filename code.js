const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const userInputBox = document.getElementById("user-input-box")

function addTask(){
    if (inputBox.value === ''){
        alert("Por favor, escriba una nota");
    }
    else if (userInputBox.value === '') {
        alert("Por favor, escriba un nombre de usuario");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = userInputBox.value + ": " + inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
    }
    inputBox.value = "";
    saveData();
    inputBox.focus();
    console.log("Size of data in localStorage: ", getLocalStorageSize());
}

listContainer.addEventListener("click", function(e){
    if (e.target.tagName== "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Add this code after your existing JavaScript code

listContainer.addEventListener("contextmenu", function(e) {
    if (e.target.tagName === "LI") {
        const originalText = e.target.textContent.trim();
        const lastCharIndex = originalText.length - 1;
        var colonIndex = originalText.indexOf(": ");
        const taskText = originalText.substring(colonIndex+2, lastCharIndex).trim();
        const newText = prompt("Edit task:", taskText);
        
        if (newText !== null) {
            inputBox.value = newText.trim()
            e.target.remove() 
            saveData();
            inputBox.focus();
        }
    }

}, false);



function saveData(){
    localStorage.setItem("NotesData", listContainer.innerHTML);
}

function showData(){
    listContainer.innerHTML = localStorage.getItem("NotesData");
}

showData();



function getLocalStorageSize() {
    var totalBytes = 0;
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      totalBytes += (key.length + value.length) * 2; // Multiply by 2 to account for UTF-16 encoding
    }
    // Convert bytes to megabytes
    // var totalMB = totalBytes / (1024 * 1024);
    return totalBytes + " Bytes"
  }
