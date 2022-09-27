var nodemailer = require('nodemailer');
let email_user = 'eduardobonfandini@universo.univates.br';
let email_pass = '';
let email_to = 'trialforce@gmail.com';
let email_subject = 'Estou enviando um e-mail pelo node JS';
let email_content = 'Só um e-mail de exemplo, não se incomode.';
let email_html = 'Só um e-mail de <i>exemplo</i>, com <b>html</b> e acentuação.';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email_user,
    pass: email_pass
  }
});

var mailOptions = {
  from: email_user,
  to: email_to,
  subject: email_subject,
  html: email_html
};

transporter.sendMail(mailOptions, function(error, info)
{
  if (error) 
  {
    console.log('Erro ao enviar email:' + error);
  } 
  else 
  {
    console.log('Email enviado: ' + info.response);
  }
});