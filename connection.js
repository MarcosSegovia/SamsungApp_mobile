// globals
var localDevice = null;
var globalChannel;


$("#btnSubmit").click(function() {

	alert("co");
});
/*
webapis.multiscreen.Device.Device.getByCode(pinCode, new DeviceAsyncResult<localDevice>(){
		
		public void onResult(final Device device){

			device.connectToChannel("com.mydomain.myapp.mychannel", {name:"MobileClient"}, function(channel) {
				channel.on("message", function(msg, sender) {
					console.log(sender.attributes.name + "Says : " + msg);
				});
			});
		}
		public void onError(DeviceError error)
		{

		}
});*/