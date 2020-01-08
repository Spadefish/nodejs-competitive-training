const http = require('http')
const port = 9098

const server = http.createServer((req, res) => {
    res.end('hello world')
})
debugger
server.listen(port, ()=> {
    console.log('Server listening on: http://localhost:%s', port)
})
