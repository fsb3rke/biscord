const socket = io.connect([window.location.href])

const sender = document.getElementById("sender")
const message = document.getElementById("message")
const submitBtn = document.getElementById("submitBtn")
const output = document.getElementById("output")
const feedback = document.getElementById("feedback")
const appWindow = document.getElementById("window")

submitBtn.addEventListener("click", () => {
    socket.emit("chat", {
        message: message.value,
        sender: sender.value
    })
    message.value = ""
    appWindow.scrollBy(0, 1000);
})

message.addEventListener('keypress', function(event) {
    if ( event.key === "Enter" ) {
        socket.emit("chat", {
            message: message.value,
            sender: sender.value
        })
        message.value = ""
        appWindow.scrollBy(0, 1000);
    }
});

socket.on("chat", (data) => {
    if (data.message.trim().length !== 0) {
        output.innerHTML += `<p>${getAvatar()}<strong>${data.sender} <span class="date_left_name">${getTime()}</span> <br></strong> <span class="in_message">${formatMessage(data.message)}</span></p>`;
        let prefix = {
            youtube: "https://www.youtube.com/"
        }
        let youtube_index = data.message.search(prefix.youtube)
        if (data.message.charAt(youtube_index) !== ''){
            console.log(data.message.search(prefix.youtube), data.message.split(" "));
            let tag = data.message.split(" ")[data.message.search(prefix.youtube)].split("/")[3].replace("watch?v=", "")
            output.innerHTML += `<p><iframe width="400" height="400" src="https://www.youtube.com/embed/${tag}" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>`;
        }
        appWindow.scrollBy(0, 1000);
    }
})

function getTime() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toLocaleString(); // "Sat, 13 Jun 2020 18:30:00 GMT"
}

function formatMessage(message) {
    let content = ""
    for (let i = 0; i < message.length; i++) {
        if (i % 100 == 0) content += "<br>"
        const element = message[i]
        content += element
    }
    return content
}

function getAvatar() {
    let url = "https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png"
    let link = `<img class="avatar_image" src="${url}" width="51" height="51">`
    return link
}