const webSocketClient = require('websocket').client

const client = new webSocketClient()

client.on('connetFaild',err=> {
    console.log(`connet to server failed: ${err}`)

})

client.on('connect', (connection)=> {
    console.log('connect to server is success')

    connection.on('error', err=> {
        console.log('Connection Error: ' + err.toString())
    
    })

    connection.on('message', msg=> {
        if(msg.type === 'utf8') {
            console.log(`Received from server ${msg.utf8Data}`)
        }
        
    })

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
//    setTimeout(()=>{ sendNumber()}, 2000)
sendNumber()
})

client.connect('ws:localhost:8888/', 'echo-protocal')