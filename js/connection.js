// globals
//var localDevice = null;
//var globalChannel;
var channelId;
var currentDevice;
var channel;

$(document).ready(function(){

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

	    channel.on("message", function(msg, client){
	    	
	    	var message = JSON.parse(msg);

	    	if(message.text == "Start")
	    	{
	    		//Cambiamos la escena a la de juego.
	    		$('body').empty();
	    		$('body').append('<section><button id="button1" class="select">SELECCIONAR</button><button id="button" class="send extra2">ENVIAR</button><button id="button2" class="end extra">ACABAR TURNO</button><img id="player_icon" src="img/j4.png"></section>');

		        $('link[href="styleSincro.css"]').attr('href','style.css');
	    	}
	    });


	};
