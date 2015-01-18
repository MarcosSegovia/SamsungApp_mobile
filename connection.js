// globals
//var localDevice = null;
//var globalChannel;

$(document).ready(function(){  
	$( "#btnSubmit" ).click(function() {

		pinCode = $('#inputPin').val();
		try {
		webapis.multiscreen.Device.findByCode(pinCode, onFindByCodeSuccess, onError);
		} catch(e) {
		    console.log("Error exception, error code: " + e.code + ", error message : " + e.message);
		}
	});

	function onFindByCodeSuccess(device)
	{
		alert("DEVICE FOUND!");
		device.connectToChannel("com.mydomain.myapp.mychannel", {name:"MobileClient"}, function(channel) {

			console.log('Connected to the TV !');
			channel.on("message", function(msg, sender) {
				console.log(sender.attributes.name + "Says : " + msg);
			});
		});
	}

	function onError(e){
		console.log("error callback invoked " + e.name + ", " + e.message);
	}
});