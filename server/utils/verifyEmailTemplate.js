const verifyEmailTemplate = ({name ,url})=>{
  return `
  <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
  <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome ${name} to the Binkeyit.</h2>
  <p>Congratulations! You're almost set to start using Binkeyit.
      Just click the button below to validate your email address.
  </p>
    <a href=${url} style="background: blue; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Verify your email</a>
  `
}

export default verifyEmailTemplate