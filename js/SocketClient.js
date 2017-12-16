var wssUrl = "ws://localhost:7001/";
var socket;

var cmd = {
	connect: '/connect ',
	disconnect: '/disconnect ',
	broadcast: '/broadcast ',
	private:'/private',
	private:'/group',
	private:'/channel',
}

var SocketClient = {

	socket: null,

	init: function(user){
	
		socket = new WebSocket(wssUrl);
		
		socket.onopen = function(){
			socket.send(cmd.connect + user);
		};

		socket.onmessage = function (evt) { 
			ChatController.dispatch(evt.data);
		};

		socket.onclose = function() {
		};
		
	},
	
	sendMessage: function(msg){
		socket.send(cmd.broadcast + msg);
	},
	sendPrivate:function(msg){
		socket.send(cmd.private + msg);
	},
	sendChannel:function(msg){
		socket.send(cmd.channel + msg);
	},
	sendGroup:function(msg){
		socket.send(cmd.group + msg);
	},
	
	close: function(){
		socket.close();
	}
	
	
};
