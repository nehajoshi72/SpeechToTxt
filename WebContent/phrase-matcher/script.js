
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
var synth = window.speechSynthesis;
 

var phrases = [
  'Simplify your everyday life with the Google Home, a voice-activated speaker powered by the Google Assistant. Use voice commands to enjoy music, get answers from Google and manage everyday tasks. Google Home is compatible with Android and iOS operating systems, and can control compatible smart devices such as Chromecast or Nest.TikiLIVE The Cable Alternative offers access to premium cable and satellite channels from your smart devices at a fraction of the cost. Access all your favorite TV shows, news programs, sporting events and more anywhere you are. Enjoy a robust library of hundreds of high-quality video episodes and movies as well as 24/7 commercial free music channels. TikiLIVE provides you with a free unlimited Cloud DVR so you can record as much TV as you want. TikiLIVE is a monthly service that does not require a long-term commitment from you. Pay monthly and cancel at any time with no termination fee. Free yourself from your cable and satellite TV provider.Simplify your everyday life with the Google Home, a voice-activated speaker powered by the Google Assistant. Use voice commands to enjoy music, get answers from Google and manage everyday tasks. Google Home is compatible with Android and iOS operating systems, and can control compatible smart devices such as Chromecast or Nest.TikiLIVE The Cable Alternative offers access to premium cable and satellite channels from your smart devices at a fraction of the cost. Access all your favorite TV shows, news programs, sporting events and more anywhere you are. Enjoy a robust library of hundreds of high-quality video episodes and movies as well as 24/7 commercial free music channels. TikiLIVE provides you with a free unlimited Cloud DVR so you can record as much TV as you want. TikiLIVE is a monthly service that does not require a long-term commitment from you. Pay monthly and cancel at any time with no termination fee. Free yourself from your cable and satellite TV provider Simplify your everyday life with the Google Home, a voice-activated speaker powered by the Google Assistant. Use voice commands to enjoy music, get answers from Google and manage everyday tasks. Google Home is compatible with Android and iOS operating systems, and can control compatible smart devices such as Chromecast or Nest.TikiLIVE The Cable Alternative offers access to premium cable and satellite channels from your smart devices at a fraction of the cost. Access all your favorite TV shows, news programs, sporting events and more anywhere you are. Enjoy a robust library of hundreds of high-quality video episodes and movies as well as 24/7 commercial free music channels. TikiLIVE provides you with a free unlimited Cloud DVR so you can record as much TV as you want. TikiLIVE is a monthly service that does not require a long-term commitment from you. Pay monthly and cancel at any time with no termination fee. Free yourself from your cable and satellite TV provider'
 /* 'where are you going',
  'can I call you tomorrow',
  'why did you talk while I was talking',
  'she enjoys reading books and playing games',
  'where are you going',
  'have a great day',
  'she sells seashells on the seashore'*/
]

//var phrasePara = document.querySelector('.phrase');
//var resultPara = document.querySelector('.result');
var diagnosticPara = document.querySelector('.output');

//var testBtn = document.querySelector('button');

var testBtn =document.getElementById('mic');
var start =document.getElementById('start');

var play = document.getElementById('play');
var finalspeechresult= new Array(); 
var recognition = new SpeechRecognition();
var speechEndRequested = false;
var i=0;
var j=0;
var isPause = false;

function testSpeech() {
	
  //testBtn.disabled = true;
 // testBtn.textContent = 'Test in progress';
  diagnosticPara.textContent = '...KT Transcript';

  //var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
  
  //var speechRecognitionList = new SpeechGrammarList();
  //speechRecognitionList.addFromString(grammar, 1);
  //recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;
  
  var utterThis = new SpeechSynthesisUtterance("Welcome to Knowledge Trasition Facilitator  an initiative by " +
		  "Adaptive Commerce Team. I can record topic with their description along with the presenter and recipients"); 
  utterThis.pitch = '1';
  utterThis.rate = '1';
  synth.speak(utterThis);
  
  testBtn.style.display = "none";
  start.style.display = "inline";
  
  var utterThis = new SpeechSynthesisUtterance("Tell me the topic name?"); 
  utterThis.pitch = '1';
  utterThis.rate = '1';
  synth.speak(utterThis);
  
  captureData();
}

  //speak();
//console.log(utterThis);
function captureData()
{
  recognition.start();

  recognition.onresult = function(event) {
  //window.event = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object 
	/*  for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				speechResult = event.results[i][0].transcript;*/
	  
	
   var speechResult = event.results[0][0].transcript;
   

   diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
   
   if (j==0)
	   {
	   //var topic = speechResult.split("topic");
	   //console.log("Value of i" +i);
	   finalspeechresult[i]= speechResult+"-";
	   console.log("Inside if topic" +finalspeechresult[i]);
	   j++;
	   var utterThis = new SpeechSynthesisUtterance("Thanks. I have recorded the topic   Please provide me the recipient name");
	   utterThis.pitch = '1';
	   utterThis.rate = '1';
	   synth.speak(utterThis);
	   }
  /*  if(speechResult === phrase) {
      resultPara.textContent = 'I heard the correct phrase!';
      resultPara.style.background = 'lime';
    } else {
      resultPara.textContent = 'That didn\'t sound right.';
      resultPara.style.background = 'red';
    }*/
   
	   
   else if (j==1) 
	   {
		   //var recipients = speechResult.split("recipient is");
		   //console.log("Value of i" +i);
		   finalspeechresult[i] = finalspeechresult[i]+speechResult+":" ;
		   console.log("Inside else if recipient" +finalspeechresult[i]);
		   var utterThis = new SpeechSynthesisUtterance("Thanks. I have recorded the recipient name  Please provide me the presenter name");
		   utterThis.pitch = '1';
		   utterThis.rate = '1';
		   synth.speak(utterThis);
		   j++;
	   }
	   
   else if (j==2)
	   {
		   //var presenter = speechResult.split("presenter is");
		   console.log("Value of i" +i);
		   finalspeechresult[i] = finalspeechresult[i]+ speechResult +";" ;
		   console.log("Inside else if presenter" +finalspeechresult[i]);
		   var utterThis = new SpeechSynthesisUtterance("Thanks. I have recorded the presenter name  Please provide me the description");
		   utterThis.pitch = '1';
		   utterThis.rate = '1';
		   synth.speak(utterThis);
		   j++;
	   
	   }
	   else 
	   {
	   if (speechResult.includes("topic has ended") || speechResult.includes("let's start with the new topic"))
		   {
		   console.log("else final" +finalspeechresult[i]);
		   var utterThis = new SpeechSynthesisUtterance("Tell me the new topic name?"); 
		   utterThis.pitch = '1';
		   utterThis.rate = '1';
		   synth.speak(utterThis);
		   i++;
		   j=0;
		   }
	   
	   else if (speechResult.includes("recording ended"))
		   {
		   stopRecognizeSpeech();
		   }
	   
	   else
		   {
		   
		   finalspeechresult[i] = finalspeechresult[i] + speechResult + ' ';
		   }
		   
		   
	  
	  //
	   
	   }
   //
   
  /* testBtn.style.display = "inline";
	  stop.style.display = "none"*/
    
    
    
  }
	  
  

 /* recognition.onspeechend = function() {
	  testBtn.style.display = "inline";
	  stop.style.display = "none"
  }*/

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    if(isPause)
    {
    diagnosticPara.textContent = 'Speech Recognition paused';
    }
    else
    	{
    	diagnosticPara.textContent = 'Speech Recognition in progress';
    	}
  }
  
  /*recognition.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart');
  }*/
  
  /*recognition.onaudioend = function(event) {
      //Fired when the user agent has finished capturing audio.
      console.log('SpeechRecognition.onaudioend');
  }*/
  
  recognition.onend = function(event) {
      //Fired when the speech recognition service has disconnected.
      console.log('SpeechRecognition.onend');
      if (!speechEndRequested) {
			recognition.start();
		} else {
			speechEndRequested = false;
			testBtn.style.display = "inline";
			start.style.display = "none";
			diagnosticPara.textContent = 'Speech Recognition stopped';
		}
  }
  
  recognition.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch');
  }
  
  /*recognition.onsoundstart = function(event) {
      //Fired when any sound � recognisable speech or not � has been detected.
      console.log('SpeechRecognition.onsoundstart');
  }*/
  
 /* recognition.onsoundend = function(event) {
      //Fired when any sound � recognisable speech or not � has stopped being detected.
      console.log('SpeechRecognition.onsoundend');
      
  }*/
  
  /*recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');
  }*/
  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
  }
  
  
  
}

play.addEventListener('click', startRecording);


//var test = document.getElementById("test");


function downloadExcel(Messages) { 

	//var ColumnHead = "Column Header Text";
	//var Messages = "\n message1.\n message2.";
	console.log(Messages.length);
	//var combMsg = "<table width='100%' border='2px'><tr bgcolor='#87AFC6'><td>test run</td><td width='2000px'>hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jkhfuihf aih laskjhf alhfljkhfb aljhga ljrhal jkhfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jkhfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jkv hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jkhfuihf aih laskjhf alhfljkhfb aljhga ljrhal jkhfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk jhedgfbsdh fjsdhbf gb as;ljkbfgksjfahgfb alhgabjdhbfga sdbnfa lhfbljkfgb ajlrhbfg al;jkbf ajlfgbvljbjlfgvba lkjdfvbal kjdgasbelrgiehlrg aefhbg aljedhfa. kjdbfv,awjh</td></tr><tr bgcolor='#87AFC6'><td>test run</td><td width='2000px'>hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jkhfuihf aih laskjhf alhfljkhfb aljhga ljrhal jkhfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jkhfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jkv hfuihf aih laskjhf alhfljkhfb aljhga ljrhal jkhfuihf aih laskjhf alhfljkhfb aljhga ljrhal jkhfuihf aih laskjhf alhfljkhfb aljhga ljrhal jk jhedgfbsdh fjsdhbf gb as;ljkbfgksjfahgfb alhgabjdhbfga sdbnfa lhfbljkfgb ajlrhbfg al;jkbf ajlfgbvljbjlfgvba lkjdfvbal kjdgasbelrgiehlrg aefhbg aljedhfa. kjdbfv,awjh</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>"
	//var combMsg="<table width='100%' border='2px'>";
	var combMsg;
	var defMsg;
	for(var i=0;i<Messages.length;i++)
		{
	var topic = Messages[i].split("-");
	var topicName = topic[0];
	console.log("topic[1]" +topic[1]);
	if(topic[1].includes(":")){
	var recepients = topic[1].split(":");
	var recepientName = recepients[0];
	console.log("recepients[1]" +recepients[1]);
	}
	var presenter  = recepients[1].split(";");
	var presenterName = presenter[0];
	console.log("presenter[1]" +presenter[1]);
	var desc = presenter[1];
	
	console.log("Topic" +topicName);
	console.log ("Receipients" +recepientName);
	console.log ("Presenters" +presenterName);
	console.log ("Description" +desc);
	console.log ("Timestamp" +timeStamp());
         if(i==0)
		{
        	 
    	combMsg = "<tr><td width='2000px' bgcolor='#C0C0C0' text-align='center'>"+topic[0]+"</td>"+ "<td width='2000px' bgcolor='#C0C0C0'>"+desc+"</td>"+"<td width='2000px' bgcolor='#C0C0C0'>"+recepientName+"</td>" + "<td width='2000px' bgcolor='#C0C0C0'>"+presenterName+"</td>+<td width='2000px' bgcolor='#C0C0C0'>"+timeStamp()+"</td></tr>";
        	 
        	 //combMsg = "\n" + topicName + "\t" + recepientName + "\t" + presenterName + "\t" + desc + "\t" + timeStamp();
		}
	else
		{
	  
		//combMsg = combMsg + "\n" + topicName + "\t" + recepientName + "\t" + presenterName + "\t" + desc +"\t" + timeStamp();
		
		combMsg = combMsg + "<tr><td width='2000px' bgcolor='#C0C0C0' text-align='center'>"+topic[0]+"</td>"+ "<td width='2000px' bgcolor='#C0C0C0'>"+desc+"</td>"+"<td width='2000px' bgcolor='#C0C0C0'>"+recepientName+"</td>" + "<td width='2000px' bgcolor='#C0C0C0'>"+presenterName+"</td>+<td width='2000px' bgcolor='#C0C0C0'>"+timeStamp()+"</td></tr>";
		}
		}
	for(var i=0;i<50;i++)
		{
		if(i==0)
			{
			defMsg ="<tr><td width='2000px' bgcolor='#C0C0C0'></td><td bgcolor='#C0C0C0' width='2000px'></td><td bgcolor='#C0C0C0' width='2000px'></td><td bgcolor='#C0C0C0' width='2000px'></td><td bgcolor='#C0C0C0' width='2000px'></td></tr>";
			}
		else
			{
		defMsg = defMsg + "<tr><td width='2000px' bgcolor='#C0C0C0'></td><td bgcolor='#C0C0C0' width='2000px'></td><td bgcolor='#C0C0C0' width='2000px'></td><td bgcolor='#C0C0C0' width='2000px'></td><td bgcolor='#C0C0C0' width='2000px'></td></tr>";
			}
		
		}
	//combMsg =combMsg +"</td>";
	var finalMessage ="<table width='100%' border='2px'><tr><td bgcolor='#FFFF00' width='1000px'><span style='font-weight:bold'>Topic</span></td><td bgcolor='#FFFF00' width='1500px'>Description</td><td bgcolor='#FFFF00' width='1500px'>Recipients</td><td bgcolor='#FFFF00' width='1500px'>Presenter</td><td bgcolor='#FFFF00' width='1500px'>Timestamp</td></tr>"+ combMsg+defMsg+"</table>";
	
	
	//var finalMessage = "Topic" + "\t" + "Description" + "\n" + combMsg;
	//finalMessage = wordWrap(finalMessage, 40);
   var link = document.createElement("a");
    link.download = "KTRecorder.xls";
    link.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(finalMessage);
    //link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' + encodeURIComponent(finalMessage);
    link.click();
	//window.open('data:application/vnd.ms-excel,' + encodeURIComponent(finalMessage));
	    //e.preventDefault();
  asyncRequest = new XMLHttpRequest();
    //asyncRequest.addEventListener("readystatechange", stateChange, false);
    asyncRequest.open('POST', '/SpeechToTxt/EmailServlet', true); 
    asyncRequest.setRequestHeader("Content-Type","text/html");
    
    asyncRequest.send(encodeURIComponent(Messages));
    
    //link.click();
	}


function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    var utterThis = new SpeechSynthesisUtterance("Welcome to KT recorder Tool    How may I help you today?");
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
   // var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
   // for(i = 0; i < voices.length ; i++) {
      //if(voices[i].name === selectedOption) {
       // utterThis.voice = 'en-US';
     // }
   // }
    utterThis.pitch = '1';
    utterThis.rate = '1';
    synth.speak(utterThis);
  
}

function stopRecognizeSpeech() {
	recognition.abort();
	//isPause = false;
	testBtn.style.display = "inline";
	start.style.display = "none";
	if (!(finalspeechresult === undefined || finalspeechresult.length == 0))
		{
		var utterThis = new SpeechSynthesisUtterance("Thanks. I have recorded all the topics with their respective descriptions in today's KT Happy Learning!");
		 utterThis.pitch = '1';
		   utterThis.rate = '1';
		   synth.speak(utterThis);
	downloadExcel(finalspeechresult);
		}
	else
		{
		var utterThis = new SpeechSynthesisUtterance("No recording is done!");
		 utterThis.pitch = '1';
		   utterThis.rate = '1';
		   synth.speak(utterThis);
		}
	
	var utterance = new SpeechSynthesisUtterance("Speech recognition ended!");
	speechSynthesis.speak(utterance);
	speechEndRequested = true;
}

function pauseRecognizeSpeech() {
	var utterance = new SpeechSynthesisUtterance("Speech recognition paused!");
	speechSynthesis.speak(utterance);
	speechEndRequested = true;
	testBtn.style.display = "inline";
	start.style.display = "none";
	isPause = true;
	recognition.abort();
	//captureData();
	
}

function startRecording() {
	if(isPause)
		{
		captureData();
		}
	else
		{
		testSpeech();
		}
	isPause = false;
}


function timeStamp() {
	// Create a date object with the current time
	  var now = new Date();

	// Create an array with the current month, day and time
	  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

	// Create an array with the current hour, minute and second
	  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

	// Determine AM or PM suffix based on the hour
	  var suffix = ( time[0] < 12 ) ? "AM" : "PM";

	// Convert hour from military time
	  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

	// If hour is 0, set it to 12
	  time[0] = time[0] || 12;

	// If seconds and minutes are less than 10, add a zero
	  for ( var i = 1; i < 3; i++ ) {
	    if ( time[i] < 10 ) {
	      time[i] = "0" + time[i];
	    }
	  }

	// Return the formatted string
	  return date.join("/") + " " + time.join(":") + " " + suffix;
	}


function resizeVideoPage(){
	
	window.open('index.html','PopupWindow','resizable=0');
   /* var width = 600;
    var height = 400;
    window.resizeTo(width, height);
    window.moveTo(((screen.width - width) / 2), ((screen.height - height) / 2));  */    
  }


