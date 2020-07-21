const nodemailer = require('nodemailer');
require('dotenv/config');
const sender = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jackdunfey01@gmail.com',
    pass: '125ytube!'
  }
});
function sendEMail(towhom,name,id){
  sender.sendMail({
      from: 'jackdunfey01@gmail.com',
      to: `${towhom}`,
      subject: 'Invitation to virtual meeting',
      text: `${name}, <user> has invited you to join a virtual meeting @ https://${process.env.HOST}. The host id is ${id}`
    }, (error, info)=>{
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
module.exports = sendEMail;
