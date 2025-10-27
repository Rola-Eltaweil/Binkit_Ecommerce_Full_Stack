const forgetpasswordTemplate=({name,otp})=>{
   return `
   <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
   <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the bnkeyit.</h2>
   <p>Hi ${name},</p>
   <p>We received a request to reset your password. Use the OTP below to change your password. If you didn't make this request, you can ignore this email.</p>
   <h3 style="background: yellow; width: max-content; padding: 0 10px; border-radius: 4px;">${otp}</h3>
   <p style="font-size: 14px;">This OTP is valid for only 1hour.</p>
   <p>Thanks,<br />The bnkeyit Team</p>`
}

export default forgetpasswordTemplate