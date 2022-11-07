import { ahandler } from "helpers/api/ahandler";
import fs from "fs";
let files = JSON.parse(fs.readFileSync("data/files.json"));

const handler = async (req, res) => {
    try {
        const email = req.body;
        const userFiles = files.filter(
            (file) => file.owner === email && file.type === "License"
        );
        // console.log(userFiles);

        if (userFiles) {
            const neww = fs.copyFileSync(
                userFiles[0].path,
                "public/" + userFiles[0].name
            );
            userFiles[0].path = "/" + userFiles[0].name;
            return res.status(200).json(userFiles);
        }
    } catch (err) {
        // console.log(err);
        return res.status(500).json({ message: "Error" });
    }
};

export default ahandler({
    post: handler,
});