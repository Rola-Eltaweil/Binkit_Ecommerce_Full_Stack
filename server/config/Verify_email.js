
import { Resend } from "resend"; // for email register verify
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.RESEND_API){
    console.log('RESEND_API is not defined');
}

const resend = new Resend(process.env.RESEND_API);

const send_Email = async({from,sendTo,subject,html})=>{
  try {
      const { data, error } = await resend.emails.send({
        from: "Binkeyit <onboarding@resend.dev>",
        to:sendTo ,
        subject: subject,
        html: html,
      });
      if(error){
        console.log('Error sending email:', error);
      }
  } catch (error) {
    console.log('Error 500 sending email:', error);
  }
}

export default send_Email



