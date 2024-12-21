const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});




const sendEmail = async (to, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: 'Password Reset Request - OTP Enclosed',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 8px;">
                <h2 style="color: #333333; text-align: center;">Password Reset OTP</h2>
                <p style="color: #555555; font-size: 16px;">Dear User,</p>
                <p style="color: #555555; font-size: 16px;">
                    We received a request to reset the password for your account. Please use the OTP below to proceed with resetting your password. 
                    <span style="color: red; font-weight: bold;">Do not share this OTP with anyone.</span>
                </p>

                <div style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; text-align: center; margin: 20px 0;">
                    <span style="font-size: 22px; font-weight: bold; color: #333;">${otp}</span>
                </div>

                <p style="color: #555555; font-size: 16px;">
                    This OTP is valid for <span style="color: red; font-weight: bold;">10 minutes</span> Only.
                </p>

                <p style="color: #555555; font-size: 16px;">
                    If you did not request this password reset, please ignore this email. Your account will remain secure.
                </p>

                <p style="color: #555555; font-size: 16px;">
                    Best regards,<br/>
                    The Support Team
                </p>

                <hr style="border: 0; height: 1px; background-color: #eeeeee; margin: 20px 0;">
                <p style="color: #999999; font-size: 12px; text-align: center;">
                    This is an automated message. Please do not reply.
                </p>
            </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;

