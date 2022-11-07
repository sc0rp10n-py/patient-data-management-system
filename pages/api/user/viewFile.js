import { ahandler } from "helpers/api/ahandler";
import fs from "fs";
let files = JSON.parse(fs.readFileSync("data/files.json"));

const handler = async (req, res) => {
    try {
        // console.log("req.body", req.body['file'].path);
        const email = req.body.email;
        const file = req.body.file;
        // console.log("file", file.name);
        const name = file.name;
        const type = file.type;
        let userFile = null;
        for (let i = 0; i < files.length; i++) {
            if (files[i].owner === email || files[i].shared.includes(email)) {
                if (files[i].name === name && files[i].type === type) {
                    userFile = files[i];
                }
            }
        }

        if (userFile) {
            const neww = fs.copyFileSync(
                userFile.path,
                "public/" + userFile.name
            );
            userFile.path = "/" + userFile.name;
            return res.status(200).json(userFile);
        }
    } catch (err) {
        // console.log(err);
        return res.status(500).json({ message: "Error" });
    }
};

export default ahandler({
    post: handler,
});
