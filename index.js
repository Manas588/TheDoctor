// const replies = require('./replies');
const time = new Date;
const replies ={
    'how are you': "I am fine",
    'what do you do': 'just some wibbly wobbly timey wimey stuff, travelling through time in my Tardis. Hangon thats not me, I am just your assistant',
    'what is the time': `the time is ${time.getHours()} hours, ${time.getMinutes()} minutes `,
    "what's the time": `the time is ${time.getHours()} hours, ${time.getMinutes()} minutes `,
    "doctor who" : "exactly hahaha...",
    "good bye": "i don't want to go",
    "goodbye": "i don't want to go",
    "bye": "i don't want to go"
    }
window.speechSynthesis.getVoices().forEach(voice=>console.log(voice.name));
const speak = document.getElementById("Speak");
const text = document.getElementById("display");

const removeGuide = () => {
    $("#guide").removeClass("guide");
    $("#guide").removeClass("guideadd");
    $("#guide").addClass("guideremove");
}

const addGuide = () => {
    $("#guide").removeClass("guide");
    $("#guide").addClass("guideadd");
    $("#guide").removeClass("guideremove");
}
$('#togglebttn').click(function() {
  removeGuide();
})
$('#guideadd').click(function() {
   addGuide();
})


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const Recognition = new SpeechRecognition();

Recognition.onstart = () => console.log("Voice Activated");

let name = document.cookie.split("=")[1]?document.cookie.split("=")[1]:"";

if (name) {
    $(".conversation").append(`<p class='reply'>Hello, ${name}</p>`);
} else {
$(".conversation").append(`<p class='reply'>Hello, you can start by telling me your name</p>`);
$(".conversation").append(`<p class='reply'>Try "My name is 'your-name' " or "i am 'your-name' "  </p>`);
}

let voice = 4;

const reply = (message) => {
    message = message.toLowerCase();
    let reply;
   
    if (message.includes("my name is")||message.includes("i am")||message.includes("call me")) {
         name = message.split(" ")[message.split(" ").length - 1];
         document.cookie ="name="+name;
        
         reply = `Hello ${name}`;
    } else if(message.includes("who are you") || message.includes("what is your name") || message.includes("what's your name")) {
        
        reply =  `I am the doctor`
      
    }else if (message === "hello" || message === "hi" ) {
       
        reply = `${message}, ${name} how can i help you !`;
    } else if (message.includes("search")) {
        let query = message.split(" ");
        query.shift();
        query = query.reduce((q, i)=>(q + "+" + i),"");
        let searchLink = `https://www.google.com/search?q=${query}`
        $(".conversation").append(`<p class='reply'>Here are some results for ${message.split("search")}: <a href="${searchLink}" target="_blank" style=" color: white;">Search</a></p>`);
        window.open(searchLink, '_blank');
        return "Here are some search results for" + message.split("search");
    } else if( message.includes("clear")||message.includes("clean")) {
        $(".conversation").empty();
        return "Okay"
    }
    else if(replies.hasOwnProperty(message)) {
        reply = replies[message];
    } else if(message.includes("weather")||message.includes("is it raining")||message.includes("is it sunny")) {
        searchLink = 'https://www.google.com/search?q=weather'
        window.open(searchLink, '_blank');
        reply = 'Here is the current wheather';
    } else if (message === 'open facebook') {
        searchLink = 'https://www.facebook.com/'
        window.open(searchLink, '_blank');
        reply = 'opening facebook'
    }
    else if (message === 'open twitter') {
        searchLink = 'https://twitter.com/';
        window.open(searchLink, '_blank');
        reply = 'opening twitter';
    }
    else if (message === 'open instagram') {
        searchLink = 'https://www.instagram.com/'
        window.open(searchLink, '_blank');
        reply = 'opening instagram';

    }else if (message === 'open youtube') {
        searchLink = 'https://www.youtube.com/'
        window.open(searchLink, '_blank');
        reply = 'opening youtube';

    } 
    else if (message === "what can you do") {
        addGuide();
        return "Here's what i can do";
    } else if (message === "close" || message === "quit") {
        window.close();
        return "ok";
    } else if (message === "change voice" || message ==="change your voice") {
        if (voice <= 10) {
            voice++;
        } else {
            voice = 0;
        }
       
        return "ok";
    }
    else {
        
        reply = "Sorry, I cannot do that."
    }
    $(".conversation").append(`<p class='reply'>${reply}</p>`);
    return reply;
}
Recognition.onresult = ( event)=> {
    $("#Speak").addClass("Speak");
    $("#Speak").removeClass("loader");
    $("#Speak").empty();
    $("#Speak").append('<img class="speak" src="./microphone.png">');
   const transcript = event.results[event.resultIndex][0].transcript;
   $(".conversation").append(`<p class='message'>${transcript}</p>`);
   const replyk = reply(transcript);
   speakToMe(replyk);
}
Recognition.onaudioend = function() { 
    $("#Speak").addClass("Speak");
    $("#Speak").removeClass("loader");
    $("#Speak").empty();
    $("#Speak").append('<img class="speak" src="./microphone.png">');
  }

const speakToMe = (message) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.rate = 1;
    speech.pitch = 0.9;
    const voices = window.speechSynthesis.getVoices();
    speech.voice = voices[voice];
    window.speechSynthesis.speak(speech);
}
speak.addEventListener('click', () =>{Recognition.start();
$("#Speak").removeClass("Speak");
$("#Speak").addClass("loader");
$("#Speak").empty();
$('#Speak').append('<img class="tardis " src="./doctor-who.png">')
})



