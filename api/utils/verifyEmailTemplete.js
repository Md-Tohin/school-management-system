const verifyEmailTemplete = ({ name,url }) => {
    return `
    <p>Dear ${name}</p>
    <p>Thank you for registering Binkeyit.</p>
    <a href="${url}" style="color: green; backgorund-color: blue; border: 1px solidrgb(11, 233, 196); margin-top: 10px; padding: 10px 20px;">Verify Email</a>
    `
}

export default verifyEmailTemplete