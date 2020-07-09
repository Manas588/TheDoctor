window.speechSynthesis.getVoices().forEach(voice=>console.log(voice.name));
const speak = document.getElementById("Speak");
const text = document.getElementById("display");


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const Recognition = new SpeechRecognition();

Recognition.onstart = () => console.log("Voice Activated");

let name = document.cookie.split("=")[1]?document.cookie.split("=")[1]:"";


const reply = (message) => {
    message = message.toLowerCase();
    let reply;
   
    if (message.includes("my name is")||message.includes("i am")||message.includes("call me")) {
         name = message.split(" ")[message.split(" ").length - 1];
         document.cookie ="name="+name;
        
         reply = `Hello ${name}`;
    } else if(message.includes("who are you") || message.includes("what is your name") || message.includes("what's your name")) {
        
        reply =  `I am the doctor`
      
    }else if (message === "hello" || message === "hey") {
       
        reply = `${message}, ${name} how can i help you !`;
    } else if (message.includes("search")) {
        let query = message.split(" ");
        query.shift();
        query = query.reduce((q, i)=>(q + "+" + i),"");
        const searchLink = `https://www.google.com/search?q=${query}`
        $(".conversation").append(`<p class='reply'>Here are some results for ${message.split("search")}: <a href="${searchLink}" target="_blank" style=" color: white;">Search</a></p>`);
        window.open(searchLink, '_blank');
        return "Here are some search results for" + message.split("search");
    } else if( message.includes("clear")||message.includes("clean")) {
        $(".conversation").empty();
        return "Okay"
    }
    else {
        
        reply = "Sorry, I did not get that."
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
    speech.voice = voices[4];
    window.speechSynthesis.speak(speech);
}
speak.addEventListener('click', () =>{Recognition.start();
$("#Speak").removeClass("Speak");
$("#Speak").addClass("loader");
$("#Speak").empty();
});
