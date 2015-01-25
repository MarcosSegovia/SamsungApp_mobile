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
var cardsSelected;
var numCardsSelected;
var buttonEnabled;


$(document).ready(function(){

	playerColour = null;
	actualChannel = null;
	cardsPlayer = new Array();
	table = new Array();
	cardsSelected = new Array();
	numCardsSelected = 0;
	cardsNumber = 0;
	tablenumberCard = 0;
	buttonEnabled = false;

	$(document).on("click", "#btnSubmit", findDeviceByPin);
	$(document).on("click", "#select_button", selectCards);
	$(document).on("click", "#send_button", checkCardsSelected);
	$(document).on("click", "#end_button", endTurnPlayer);

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
	    		$('body').append('<section><button id="select_button">SELECT</button><button id="send_button">SEND</button><button id="end_button">END TURN</button><img id="player_icon" src="img/'+playerColour+'.png"></section>');
	    		$('body').append('<div id="playerTurn"><font size="5" color="red"><b>WAIT FOR YOUR TURN...</b></font></div>')
	    		$('body').append('<div id="cardsrow"></div>');
	    		
		        $('link[href="css/styleSincro.css"]').attr('href','css/style.css');
	    	}

	    	if(message.text == "Go")
	    	{
	    		$('#playerTurn').empty();
	    		$('#playerTurn').append('<font size="5" color="green"><b>IT IS YOUR TURN</b></font>');
	    		buttonEnabled = true;
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

	    		$('#cardsrow').after('<img id="'+cardsPlayer[cardsNumber]['colour']+'-'+cardsPlayer[cardsNumber]['number']+'" class="ficha" src="img/cards/'+cardsPlayer[cardsNumber]['colour']+cardsPlayer[cardsNumber]['number']+'.png">');

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

	endTurnPlayer = function()
	{
		if(buttonEnabled)
		{
			//Limpiamos el array de cartas seleccionadas y deseleccionamos cartas
			cardsSelected.splice(0,cardsSelected.length);
			numCardsSelected = 0;

			for(var i=0; i<cardsNumber; i++)
			{
				$("#"+cardsPlayer[i]['colour']+'-'+cardsPlayer[i]['number']+"").css("border", "none");
			}

			//Limpiamos el array de la mesa
			table.splice(0, table.length);
			tablenumberCard = 0;

			//Enviamos el fin de turno al host
			sendMessageHost(true);
		}
	}

	sendMessageHost = function(getCard)
	{
		var message = {
			type:"client command",
			text: "EndTurn",
			card: getCard
		};

		actualChannel.send(JSON.stringify(message), "host");
		$('#playerTurn').empty();
	    $('#playerTurn').append('<font size="5" color="red"><b>WAIT FOR YOUR TURN...</b></font>');
	    buttonEnabled = false;
	}

	sendMessageVictoryToHost = function()
	{
		var message = {
			text: "WIN"
		};

		actualChannel.send(JSON.stringify(message), "host");
	}

	sendCardHost = function(number, colour)
	{
		var message = {
			text: "Card",
			number: number,
			colour: colour
		};

		actualChannel.send(JSON.stringify(message), "host");
	}

	selectCards = function()
	{
		$(document).on("click", ".ficha", function(){

			console.log('NUMERO CARTAS SELECCTIONADAS: '+cardsSelected.length);
			var cardId = $(this).attr("id");

				if ($("#"+cardId+"").css("border-top-style") == "solid") 
				{
					$("#"+cardId+"").css("border", "none");
					var containerId = cardId.split("-");

					for(var i=0; i<numCardsSelected; i++)
					{
						if(cardsSelected[i]['colour'] == containerId[0] && cardsSelected[i]['number'] == containerId[1])
						{
							cardsSelected.splice(i,1);
							numCardsSelected--;
						}
					}
				}
				else
				{
					$("#"+cardId+"").css("border", "2px solid yellow");
					var containerId = cardId.split("-");
					cardsSelected[numCardsSelected] = new Array();
					cardsSelected[numCardsSelected]['colour'] = containerId[0];
					cardsSelected[numCardsSelected]['number'] = containerId[1];
					numCardsSelected++;
				}
		});
					
	}

	//Algoritmo de comparación con la mesa.
	checkCardsSelected = function()
	{
		if(buttonEnabled)
		{
			//2 opciones de tirada:
			//1- Podemos inserir cartas siempre que sean continuas a las de la mesa.
			//2- Podemos inserir qualquier carta siempre que sean 2 o más y sean continuas entre ellas.
			var success = false;
			var deleteCards = new Array();
			var numberdeletes = 0;
			
			//Caso 2
			for(var i = 0; i<numCardsSelected; i++)
			{
				var actualCard = new Array();
				actualCard['number'] = cardsSelected[i]['number'];
				actualCard['colour'] = cardsSelected[i]['colour'];


				console.log('number: '+actualCard['number']);

				for(var j=0; j<numCardsSelected; j++)
				{
					
					if(actualCard['colour'] == cardsSelected[j]['colour'])
					{

						if(actualCard['number'] == parseFloat(cardsSelected[j]['number'])+parseFloat(1))
						{
							//Enviamos la carta
							sendCardHost(actualCard['number'], actualCard['colour']);

							//La eliminamos de nuestra mano
							for(var card = 0; card < cardsNumber; card++ )
							{
								if(cardsPlayer[card]['number']==actualCard['number'])
								{
									if(cardsPlayer[card]['colour']==actualCard['colour'])
									{
										cardsPlayer.splice(card,1);
										cardsNumber--;
									}
								}
							}
							$("#"+actualCard['colour']+'-'+actualCard['number']+"").remove();
							success = true;
							deleteCards[numberdeletes] = i;
							numberdeletes++;
							break;
						}

						if(actualCard['number'] == (cardsSelected[j]['number']-1))
						{
							//Enviamos la carta
							sendCardHost(actualCard['number'], actualCard['colour']);
							//La eliminamos de nuestra mano
							for(var card = 0; card < cardsNumber; card++ )
							{
								if(cardsPlayer[card]['number']==actualCard['number'])
								{
									if(cardsPlayer[card]['colour']==actualCard['colour'])
									{
										cardsPlayer.splice(card,1);
										cardsNumber--;
									}
								}
							}
							$("#"+actualCard['colour']+'-'+actualCard['number']+"").remove();
							success = true;
							deleteCards[numberdeletes] = i;
							numberdeletes++;
							break;
						}
					}
				}
			}

			//Borramos las cartas enviadas en el caso 2
			for(var del=0; del<numberdeletes; del++)
			{
				cardsSelected.splice(deleteCards[del],1);
				numCardsSelected--;
			}

			//Caso 1
			for(var i = 0; i < numCardsSelected; i++)
			{
				var actualCard = new Array();
				actualCard['number'] = cardsSelected[i]['number'];
				actualCard['colour'] = cardsSelected[i]['colour'];

				for(var j = 0; j < tablenumberCard; j++)
				{
					if(actualCard['colour'] == table[j]['colour'])
					{
						if(actualCard['number'] == parseFloat(table[j]['number'])+parseFloat(1))
						{
							//Enviamos la carta
							sendCardHost(actualCard['number'], actualCard['colour']);
							//La eliminamos de nuestra mano
							for(var card = 0; card < cardsNumber; card++ )
							{
								if(cardsPlayer[card]['number']==actualCard['number'])
								{
									if(cardsPlayer[card]['colour']==actualCard['colour'])
									{
										cardsPlayer.splice(card,1);
										cardsNumber--;
									}
								}
							}
							$("#"+actualCard['colour']+'-'+actualCard['number']+"").remove();
							success = true;
						}

						if(actualCard['number'] == (table[j]['number']-1))
						{
							//Enviamos la carta
							sendCardHost(actualCard['number'], actualCard['colour']);
							//La eliminamos de nuestra mano
							for(var card = 0; card < cardsNumber; card++ )
							{
								if(cardsPlayer[card]['number']==actualCard['number'])
								{
									if(cardsPlayer[card]['colour']==actualCard['colour'])
									{
										cardsPlayer.splice(card,1);
										cardsNumber--;
									}
								}
							}
							$("#"+actualCard['colour']+'-'+actualCard['number']+"").remove();
							success = true;
						}
					}
				}
			}

			//Si nos quedamos sin cartas, hemos ganado la partida.
			if(cardsNumber == 0)
			{
				sendMessageVictoryToHost();
			}

			//Si hemos podido enviar alguna de las cartas seleccionadas.
			if(success)
			{
				//Limpiamos el array de cartas seleccionadas y deseleccionamos cartas
				cardsSelected.splice(0,cardsSelected.length);
				numCardsSelected = 0;
				for(var i = 0; i < cardsNumber; i++)
				{
					$("#"+cardsPlayer[i]['colour']+'-'+cardsPlayer[i]['number']+"").css("border", "none");
				}

				//Limpiamos el array de la mesa
				table.splice(0, table.length);
				tablenumberCard = 0;


				//Informamos al host de que hemos terminado el turno
				sendMessageHost(false);
			}
		}
	}
