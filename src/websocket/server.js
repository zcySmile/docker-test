const WebSocketServer = require('websocket').server
const http = require('http')

const server = http.createServer((req,res)=> {
    console.log(`${new Date()} receive from ${req.url}`)
    res.writeHead(404)
    res.end()
})

server.listen(8888, ()=> {
    console.log(`${new Date} http server is listening on port 8888`)
})

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
})

function orginIsAllowed(origin) {
    let origins = ['http://localhost',undefined]
    return origins.includes(origin)
}

wsServer.on('request', (req)=> {
    console.log('req:'+ req.origin)
    if(!orginIsAllowed(req.origin)){
        req.reject()
        console.log(`${new Date()} connet from origin ${req.origin} is rejected`)
        return
    }

    const connection = req.accept('echo-protocal', req.origin)

    console.log(`${new Date()} connection is accept`)

    connection.on('message', (message)=> {
        if(message.type === 'utf8'){
            console.log('receive Message' + message.utf8Data)
            connection.sendUTF(message.utf8Data)
        }
        else if(message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    })

    connection.on('close', (code, description)=> {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    })
})