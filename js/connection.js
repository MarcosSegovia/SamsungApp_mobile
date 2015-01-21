// globals
//var localDevice = null;
//var globalChannel;
var channelId;
var currentDevice;
var channel;

$(document).ready(function(){

	
	channelId = "com.samsung.multiscreen.rubikapp"; 
	runtTitle = "Samsung-App";
	channel = null;
	currentDevice = null;

	
	$("#btnSubmit").on("click", findDeviceByPin);

	
	
});

onError = function(e){
	alert(error.message);
}


	findDeviceByPin = function(){
	    
	    code = $('#inputPin').val();
	    window.webapis.multiscreen.Device.findByCode(code, onFindByPin, onError);
	};

	onFindByPin = function(device){
		
	    currentDevice = device;
	    onSelectDevice();
	};

	onSelectDevice = function(){
	    //currentDevice.getApplication("Samsung-App", onGetApplication, onError);
	    currentDevice.connectToChannel(channelId, {name:"Mobile-"+Date.now()}, onConnect, onError);
	};

	/*onGetApplication = function(application){
		alert('jeje');
	    this.currentApp = application;
	    var self = this;
	    if(application.lastKnownStatus !== "running"){
	        this.currentApp.launch({"launcher":"mobile-chat"}, onLaunch, onError);
	    }else{
	        self.currentDevice.connectToChannel(channelId, {name:"Mobile-"+Date.now()}, onConnect, onError);
	    }
	    
	};

	onLaunch = function(application){
	    var self = this;
	    console.log(arguments, application);
	    self.currentDevice.connectToChannel(self.channelId, {name:"Mobile-"+Date.now()}, onConnect, onError);
	};*/

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
	    	alert(message.text);
	    });

	};
/*onFindByCodeSuccess = function(device)
{
	alert("DEVICE FOUND!");
	device.connectToChannel("com.mydomain.myapp.mychannel", {name:"MobileClient"}, function(channel) {

		console.log('Connected to the TV !');
		channel.on("message", function(msg, sender) {
			console.log(sender.attributes.name + "Says : " + msg);
		});
	});
}*/
