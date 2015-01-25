// globals
//var localDevice = null;
//var globalChannel;
var channelId;
var currentDevice;
var playerColour;
var cardsPlayer;
var cardsNumber;
var actualChannel;
var table;
var tablenumberCard;


$(document).ready(function(){

	playerColour = null;
	actualChannel = null;
	cardsPlayer = new Array();
	table = new Array();
	cardsNumber = 0;
	tablenumberCard = 0;

	$(document).on("click", "#btnSubmit", findDeviceByPin);
	$(document).on("click", "#send_button", checkCardsSelected);
	$(document).on("click", "#end_button", sendMessageHost);
	//$("#btnSubmit").on("click", findDeviceByPin);
	//$("#send_button").live("click", checkCardsSelected);
	//$("#end_button").live("click", sendMessageHost);

});

	onError = function(e){
		alert(error.message);
	}


	findDeviceByPin = function(){
	    channelId = "com.samsung.multiscreen.rubikapp"; 
		runtTitle = "Samsung-App";
		channel = null;
		currentDevice = null;
	    code = $('#inputPin').val();
	    window.webapis.multiscreen.Device.findByCode(code, onFindByPin, onError);
	};

	onFindByPin = function(device){
		
	    currentDevice = device;
	    onSelectDevice();
	};

	onSelectDevice = function(){
	    currentDevice.connectToChannel(channelId, {name:"Mobile-"+Date.now()}, onConnect, onError);
	};

	onConnect = function(channel){

	    actualChannel = channel;
	    $('fieldset').append('<p id="connection"><b><font color="green">CONNECTED</font></b></p>');

	    // Wire up some event handlers
	    /*if(endTurn)
	    {
	    	var message = {
				type:"client command",
				text: "Finish"
			};
			channel.send(JSON.stringify(message), "host");
			endTurn=false;
	    }*/

	    channel.on("disconnect", function(myClient){

	    });

	    channel.on("clientConnect", function(client){

	    });

	    channel.on("clientDisconnect", function(){

	    });

	    channel.on("message", function(msg, client){
	    	
	    	var message = JSON.parse(msg);

	    	if(message.text == "Start")
	    	{
	    		//Cambiamos la escena a la de juego.
	    		$('body').empty();
	    		$('body').append('<section><button id="button">SELECT</button><button id="send_button">SEND</button><button id="end_button">END TURN</button><img id="player_icon" src="img/'+playerColour+'.png"></section>');
	    		$('body').append('<div id="cardsrow1"> <img id="ficha1" class="ficha" src="img/blue1.png"> <img id="ficha2" class="ficha" src="img/blue1.png"><img id="ficha3" class="ficha" src="img/blue1.png"><img id="ficha4" class="ficha" src="img/blue1.png"><img id="ficha5" class="ficha" src="img/blue1.png"><img id="ficha6" class="ficha" src="img/blue1.png"><img id="ficha7" class="ficha" src="img/blue1.png"><img id="ficha8" class="ficha" src="img/blue1.png"><img id="ficha9" class="ficha" src="img/blue1.png"><img id="ficha10" class="ficha" src="img/blue1.png"></div>');
	    		$('body').append('<div id="cardsrow2"><img id="ficha11" class="ficha" src="img/blue1.png"><img id="ficha12" class="ficha" src="img/blue1.png"><img id="ficha13" class="ficha" src="img/blue1.png"><img id="ficha14" class="ficha" src="img/blue1.png"><img id="ficha15" class="ficha" src="img/blue1.png"><img id="ficha16" class="ficha" src="img/blue1.png"><img id="ficha17" class="ficha" src="img/blue1.png"><img id="ficha18" class="ficha" src="img/blue1.png"><img id="ficha19" class="ficha" src="img/blue1.png"><img id="ficha20" class="ficha" src="img/blue1.png">	</div>');
		
		        $('link[href="styleSincro.css"]').attr('href','style.css');
	    	}

	    	if(message.text == "Colour")
	    	{
	    		playerColour = message.colour;
	    	}

	    	if(message.text == "Card")
	    	{
	    		console.log('jejejeje');
	    		cardsPlayer[cardsNumber] = new Array();
	    		cardsPlayer[cardsNumber]['number'] = message.number;
	    		cardsPlayer[cardsNumber]['colour'] = message.colour;
	    		cardsPlayer[cardsNumber]['selected'] = false;
	    		cardsNumber++;
	    	}

	    	if(message.text == "Table")
	    	{
	    		table[tablenumberCard] = new Array();
	    		table[tablenumberCard]['number'] = message.number;
	    		table[tablenumberCard]['colour'] = message.colour;
	    		tablenumberCard++;
	    	}
	    });

		


	};

	sendMessageHost = function()
	{
		var message = {
			type:"client command",
			text: "je"
		};

		actualChannel.send(JSON.stringify(message), "host");
	}
	

	//Algoritmo de comparación con la mesa.
	checkCardsSelected = function()
	{

	}
