import fs from "fs";

const handler = async (req, res) => {
    let otpFile = JSON.parse(fs.readFileSync("data/otp.json"));
    try {
        let { email, otp } = req.body;
        otp = parseInt(otp);
        let otpData = otpFile.find((otpData) => otpData.email === email);
        if (otpData) {
            otpFile = otpFile.filter((otpData) => otpData.email !== email);
            fs.writeFileSync("data/otp.json", JSON.stringify(otpFile, null, 4));
            console.log("otpData", otpData.otp);
            console.log("otp", otp);
            if (otpData.otp === otp) {
                const d = new Date();
                if (d.getMinutes() - otpData.time < 5) {
                    return res.status(200).json({ message: "OTP verified" });
                } else {
                    return res.status(200).json({ message: "OTP expired" });
                }
            } else {
                return res.status(200).json({ message: "OTP incorrect" });
            }
        } else {
            return res.status(200).json({ message: "OTP not found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error" });
    }
};

export default handler;
