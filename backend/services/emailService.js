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
  } catch (error) {
    console.error('Error sending email:', error.response.data); 
  }
};

module.exports = sendEmail;
