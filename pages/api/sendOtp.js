let nodemailer = require('nodemailer');
import fs from 'fs';


const handler = async (req, res) => {
    const otpFile = JSON.parse(fs.readFileSync('data/otp.json'));
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        const d = new Date();
        const time = d.getMinutes();
        const data = {
            email,
            otp,
            time,
        }
        otpFile.push(data);
        fs.writeFileSync('data/otp.json', JSON.stringify(otpFile, null, 4));
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'OTP for File Upload Verification',
            text: `Your OTP is ${otp}`,
        };
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent!!!');
            }
        }
        );
        return res.status(200).json({ message: 'OTP sent' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error" });
    }
};

export default handler;