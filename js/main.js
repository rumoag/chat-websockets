const miWebSocket = new WebSocket('ws://192.168.0.18:8080');

new Vue({
    el: '#app',
    data: {
        nuevoMensaje: '',
        mensajes: [],
        usuario: '',
    },
    mounted: function (){
        this.iniciarWebSocket();
    },
    methods: {
        iniciarWebSocket: function (){
            function open () {
                // Abre conexión
                console.log("WebSocket abierto.");
            }

            let message = (evento) => {
                // Se recibe un mensaje
                console.log("WebSocket ha recibido un mensaje");
                // Mostrar mensaje en HTML
                this.mensajes.push(JSON.parse(evento.data));
            }

            function error (evento) {
                // Ha ocurrido un error
                console.error("WebSocket ha observado un error: ", evento);
            }

            function close () {
                // Cierra la conexión
                console.log("WebSocket cerrado.");
            }


            // Eventos de WebSocket
            miWebSocket.addEventListener('open', open);
            miWebSocket.addEventListener('message', message);
            miWebSocket.addEventListener('error', error);
            miWebSocket.addEventListener('close', close);
        },
        enviarMensaje: function (){
            miWebSocket.send(JSON.stringify({
                usuario: this.usuario,
                mensaje: this.nuevoMensaje,
            }));
            this.nuevoMensaje = '';
        },
    }
});