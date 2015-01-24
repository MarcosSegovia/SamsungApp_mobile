// globals
//var localDevice = null;
//var globalChannel;
var channelId;
var currentDevice;
var channel;
var playerColour;

$(document).ready(function(){

	playerColour=null;

	$("#btnSubmit").on("click", findDeviceByPin);

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

	    channel = channel;

	    // Wire up some event handlers
	    channel.on("disconnect", function(myClient){

	    });

	    channel.on("clientConnect", function(client){

	    });

	    channel.on("clientDisconnect", function(){

	    });
3
	    channel.on("message", function(msg, client){
	    	
	    	var message = JSON.parse(msg);

	    	if(message.text == "Start")
	    	{
	    		//Cambiamos la escena a la de juego.
	    		$('body').empty();
	    		$('body').append('<section><button id="button1" class="select">SELECCIONAR</button><button id="button" class="send extra2">ENVIAR</button><button id="button2" class="end extra">ACABAR TURNO</button><img id="player_icon" src="img/'+playerColour+'.png"></section>');
	    		$('body').append('<div id="cardsrow1"> <img id="ficha1" class="ficha" src="img/blue1.png"> <img id="ficha2" class="ficha" src="img/blue1.png"><img id="ficha3" class="ficha" src="img/blue1.png"><img id="ficha4" class="ficha" src="img/blue1.png"><img id="ficha5" class="ficha" src="img/blue1.png"><img id="ficha6" class="ficha" src="img/blue1.png"><img id="ficha7" class="ficha" src="img/blue1.png"><img id="ficha8" class="ficha" src="img/blue1.png"><img id="ficha9" class="ficha" src="img/blue1.png"><img id="ficha10" class="ficha" src="img/blue1.png"></div>');
	    		$('body').append('<div id="cardsrow2"><img id="ficha11" class="ficha" src="img/blue1.png"><img id="ficha12" class="ficha" src="img/blue1.png"><img id="ficha13" class="ficha" src="img/blue1.png"><img id="ficha14" class="ficha" src="img/blue1.png"><img id="ficha15" class="ficha" src="img/blue1.png"><img id="ficha16" class="ficha" src="img/blue1.png"><img id="ficha17" class="ficha" src="img/blue1.png"><img id="ficha18" class="ficha" src="img/blue1.png"><img id="ficha19" class="ficha" src="img/blue1.png"><img id="ficha20" class="ficha" src="img/blue1.png">	</div>');
		
		        $('link[href="styleSincro.css"]').attr('href','style.css');
	    	}

	    	if(message.text == "Colour")
	    	{
	    		playerColour = message.colour;
	    	}
	    });


	};
