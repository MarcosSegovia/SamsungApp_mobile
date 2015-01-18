// globals
//var localDevice = null;
//var globalChannel;

$(document).ready(function(){  
	$( "#btnSubmit" ).click(function() {

		pinCode = $('#inputPin').val();

		webapis.multiscreen.Device.findByCode(pinCode, onFindByCodeSuccess, error);
	});

	function onFindByCodeSuccess(device)
	{
		device.connectToChannel("com.mydomain.myapp.mychannel", {name:"MobileClient"}, function(channel) {

			console.log('Connected to the TV !');
			channel.on("message", function(msg, sender) {
				console.log(sender.attributes.name + "Says : " + msg);
			});
		});
	}

	function error(){
		alert("fack");
	}
});