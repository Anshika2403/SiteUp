// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     }
// });

// async function sendEmail({to, subject, text}) {
//     try{
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to,
//             subject,
//             text,
//         };

//         const info = await transporter.sendMail(mailOptions);
//         return true;
//     }catch(err){
//       console.error("Failed to send email:", err.message || err);
//       throw new Error("Failed to send mail: " + err.message); // Provide more context in the error
//     }
// }

// module.exports = sendEmail;

const axios = require('axios');

const sendEmail = async ({to,subject,text}) => {
  const apiKey = process.env.BREVO_API;
  const url = 'https://api.brevo.com/v3/smtp/email';  
  console.log(to,subject,text);
  const emailData = {
    sender: { email:process.env.EMAIL_USER }, 
    to: [{ email: to }],    
    subject: subject,
    textContent: text,
  };

  try {
    const response = await axios.post(url, emailData, {
      headers: {
        'api-key':apiKey,   
        'Content-Type': 'application/json',
      },
    });

    console.log('Email sent successfully:', response.data); 
  } catch (error) {
    console.error('Error sending email:', error.response.data); 
  }
};

module.exports = sendEmail;
