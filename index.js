const express = require('express');
const https = require('https');
const http = require('http');
const mail = require('./mail.js');
const fs = require('fs');
require('dotenv/config');

const opts = {
  key: fs.readFileSync('./tls/key.pem','utf-8').toString(),
  cert: fs.readFileSync('./tls/cert.pem','utf-8').toString(),
  passphrase: 'jack'
}

const host = process.env.HOST || '192.168.1.12';
const port = process.env.PORT || 443;

const { PeerServer } = require('peer');
const peerServer = PeerServer({
  port: 9000,
  path: '/myapp',
  generateClientId: ()=>{
    return (Math.random().toString(36) + '0000000000000000000').substr(2, 11);
  },
  ssl: opts
});
const app = express();
const hTPapp = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/static',express.static(`${__dirname}/public`));
//GET home route
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/sites/booty.html`);
});
app.post('/invite',(req,res)=>{
  mail(req.body.email,req.body.name,req.body.id)
  res.sendStatus(200);
});
hTPapp.all('*',(req,res,next)=>{
  res.redirect(301,`https://${host}#`);
});
// we will pass our 'app' to 'https' server
http.createServer(hTPapp).listen(80,host,()=>{console.log("Redirecting server running...");});
const server = https.createServer(opts, app).listen(port,host,()=>{console.log(`Server started on https://${host} at ${new Date().toString()}`);});
