

$(function() {
	/*webapis.multiscreen.Device.search(function(devices) {
	
		console.log("num. devices = " + devices);

		var device = devices[0]; // Assuming for this example there is only one

		// We are also assuming in this example your SmartTV application is already running
		// To see how to launch an appliction please refer to device.getApplication and application.launch




		// --> ENVIAR mensaje con el codigo pin introducido por el usuario.
		// --> CARGAR el HTML de la pantalla de juego si el pin es correcto.




		device.connectToChannel("com.mydomain.myapp.mychannel", {name:"MobileClient"}, function(channel) {
			channel.on("message", function(msg, sender) {
				 
			});
		});


		// --> MIRAR qué usuario es y darle el icono correspondiente
		// --> Al recibir mensaje 'Card', siguiente mensaje recibe carta 
		// --> Al recibir mensaje 'Go', es el turno de ese usuario
		


		// --> Al hacer click en ENVIAR --> Antes de enviar a la tv se comprueba que las fichas son correctas, sino se devuelven
		// --> ACABAR TURNO --> Si se ha tirado alguna ficha se acaba el turno, si no se ha hecho jugada, se roba una ficha y se acaba el turno
	});
	*/
	
	// --> Al hacer click en SELECCIONAR --> selecciona las cartas que se van a usar en el turno --> Se tienen que iluminar de algun modo
/*
for (i=1; i<=12; i++){
console.log("entra");
		$("#ficha"+i).mouseup(function () {
			console.log($("#ficha"+i).css("border-top-style"));
			if ($("#ficha"+i).css("border-top-style") == "solid") {
				$("#ficha"+i).css("border", "none");
			}
			else {
				$("#ficha"+i).css("border", "2px solid green");
			}
		});
		
}
*/
 channel.on("message", function(msg, client){
	    	var message = JSON.parse(msg);
	    	alert('AHIO !');

	    	
	    });





// mega guarrada que estoy hasta el co.. de que no funcionen las variables 
	$("#button1").mouseup(function () {
		//alert("entra uno");
		$("#ficha1").mouseup(function () {
			//alert("entra dos");
					console.log($("#ficha1").css("border-top-style"));
					if ($("#ficha1").css("border-top-style") == "solid") {
						$("#ficha1").css("border", "none");
					}
					else {
						$("#ficha1").css("border", "2px solid green");
					}
				});
			
			
	$("#ficha2").mouseup(function () {
				if ($("#ficha2").css("border-top-style") == "solid") {
					$("#ficha2").css("border", "none");
				}
				else {
					$("#ficha2").css("border", "2px solid green");
				}
			});
		
	$("#ficha3").mouseup(function () {
				if ($("#ficha3").css("border-top-style") == "solid") {
					$("#ficha3").css("border", "none");
				}
				else {
					$("#ficha3").css("border", "2px solid green");
				}
			});
	$("#ficha4").mouseup(function () {
				if ($("#ficha4").css("border-top-style") == "solid") {
					$("#ficha4").css("border", "none");
				}
				else {
					$("#ficha4").css("border", "2px solid green");
				}
			});
			
	$("#ficha5").mouseup(function () {
				if ($("#ficha5").css("border-top-style") == "solid") {
					$("#ficha5").css("border", "none");
				}
				else {
					$("#ficha5").css("border", "2px solid green");
				}
			});
			
	$("#ficha6").mouseup(function () {
				if ($("#ficha6").css("border-top-style") == "solid") {
					$("#ficha6").css("border", "none");
				}
				else {
					$("#ficha6").css("border", "2px solid green");
				}
			});
			
	$("#ficha7").mouseup(function () {
				if ($("#ficha7").css("border-top-style") == "solid") {
					$("#ficha7").css("border", "none");
				}
				else {
					$("#ficha7").css("border", "2px solid green");
				}
			});
			
	$("#ficha8").mouseup(function () {
				if ($("#ficha8").css("border-top-style") == "solid") {
					$("#ficha8").css("border", "none");
				}
				else {
					$("#ficha8").css("border", "2px solid green");
				}
			});
			
	$("#ficha9").mouseup(function () {
				if ($("#ficha9").css("border-top-style") == "solid") {
					$("#ficha9").css("border", "none");
				}
				else {
					$("#ficha9").css("border", "2px solid green");
				}
			});
			
	$("#ficha10").mouseup(function () {
				if ($("#ficha10").css("border-top-style") == "solid") {
					$("#ficha10").css("border", "none");
				}
				else {
					$("#ficha10").css("border", "2px solid green");
				}
			});
			
	$("#ficha11").mouseup(function () {
				if ($("#ficha11").css("border-top-style") == "solid") {
					$("#ficha11").css("border", "none");
				}
				else {
					$("#ficha11").css("border", "2px solid green");
				}
			});
			
	$("#ficha12").mouseup(function () {
				if ($("#ficha12").css("border-top-style") == "solid") {
					$("#ficha12").css("border", "none");
				}
				else {
					$("#ficha12").css("border", "2px solid green");
				}
			});
			
	$("#ficha13").mouseup(function () {
				if ($("#ficha13").css("border-top-style") == "solid") {
					$("#ficha13").css("border", "none");
				}
				else {
					$("#ficha13").css("border", "2px solid green");
				}
			});
			
	$("#ficha14").mouseup(function () {
				if ($("#ficha14").css("border-top-style") == "solid") {
					$("#ficha14").css("border", "none");
				}
				else {
					$("#ficha14").css("border", "2px solid green");
				}
			});
			
	$("#ficha15").mouseup(function () {
				if ($("#ficha15").css("border-top-style") == "solid") {
					$("#ficha15").css("border", "none");
				}
				else {
					$("#ficha15").css("border", "2px solid green");
				}
			});
			
	$("#ficha16").mouseup(function () {
				if ($("#ficha16").css("border-top-style") == "solid") {
					$("#ficha16").css("border", "none");
				}
				else {
					$("#ficha16").css("border", "2px solid green");
				}
			});
			
	$("#ficha17").mouseup(function () {
				if ($("#ficha17").css("border-top-style") == "solid") {
					$("#ficha17").css("border", "none");
				}
				else {
					$("#ficha17").css("border", "2px solid green");
				}
			});
			
	$("#ficha18").mouseup(function () {
				if ($("#ficha18").css("border-top-style") == "solid") {
					$("#ficha18").css("border", "none");
				}
				else {
					$("#ficha18").css("border", "2px solid green");
				}
			});
			
	$("#ficha19").mouseup(function () {
				if ($("#ficha19").css("border-top-style") == "solid") {
					$("#ficha19").css("border", "none");
				}
				else {
					$("#ficha19").css("border", "2px solid green");
				}
			});
			
	$("#ficha20").mouseup(function () {
				if ($("#ficha20").css("border-top-style") == "solid") {
					$("#ficha20").css("border", "none");
				}
				else {
					$("#ficha20").css("border", "2px solid green");
				}
			});
	});
});

