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
	$(document).on("click", "#select_button", selectCards);
	$(document).on("click", "#send_button", checkCardsSelected);
	$(document).on("click", "#end_button", sendMessageHost);

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
	    		$('body').append('<div id="playerTurn"><font size="5" color="red"><b>WAIT FOR YOUR TURN...</b></font></div>')
	    		$('body').append('<div id="cardsrow"></div>');
	    		
		        $('link[href="styleSincro.css"]').attr('href','style.css');
	    	}

	    	if(message.text == "Go")
	    	{
	    		$('#playerTurn').empty();
	    		$('#playerTurn').append('<font size="5" color="green"><b>IT IS YOUR TURN</b></font>');
	    	}

	    	if(message.text == "Colour")
	    	{
	    		playerColour = message.colour;
	    	}

	    	if(message.text == "Card")
	    	{
	    		cardsPlayer[cardsNumber] = new Array();
	    		cardsPlayer[cardsNumber]['number'] = message.number;
	    		cardsPlayer[cardsNumber]['colour'] = message.colour;
	    		cardsPlayer[cardsNumber]['selected'] = false;

	    		//Añadimos la carta a nuestra mano

	    		$('#cardsrow').after('<img id="'+cardsPlayer[cardsNumber]['colour']+cardsPlayer[cardsNumber]['number']+'" class="ficha" src="img/cards/'+cardsPlayer[cardsNumber]['colour']+cardsPlayer[cardsNumber]['number']+'.png">');

	    		cardsNumber++;
	    	}

	    	if(message.text == "Table")
	    	{
	    		table[tablenumberCard] = new Array();
	    		table[tablenumberCard]['number'] = message.number;
	    		table[tablenumberCard]['colour'] = message.colour;
	    		tablenumberCard++;
	    	}

	    	if(message.type == "Information")
	    	{
	    		console.log(message.text);
	    	}
	    });

	};

	sendMessageHost = function()
	{
		var message = {
			type:"client command",
			text: "EndTurn"
		};

		actualChannel.send(JSON.stringify(message), "host");
		$('#playerTurn').empty();
	    $('#playerTurn').append('<font size="5" color="red"><b>WAIT FOR YOUR TURN...</b></font>');
	}
	

	//Algoritmo de comparación con la mesa.
	checkCardsSelected = function()
	{

	}
