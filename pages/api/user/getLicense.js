import { ahandler } from "helpers/api/ahandler";
import fs from "fs";

const handler = async (req, res) => {
    try {
        let files = JSON.parse(fs.readFileSync("data/files.json"));
        let users = JSON.parse(fs.readFileSync("data/users.json"));
        const email = req.body;
        const user = users.find((user) => user.email === email);
        // console.log(email);
        const userFile = files.find(
            (file) =>
                (file.owner === email && file.type === "License") ||
                (user.type === "patient" &&
                    file.owner === email &&
                    file.type === "Government ID")
        );
        // console.log(userFile);
        // console.log(userFile);

        if (userFile) {
            const neww = fs.copyFileSync(
                userFile.path,
                "public/" + userFile.name
            );
            userFile.path = "/" + userFile.name;
            const o = {
                name: userFile.name,
                type: userFile.type,
                path: userFile.path,
            };
            return res.status(200).json(o);
        }
    } catch (err) {
        // console.log(err);
        return res.status(500).json({ message: "Error" });
    }
};

export default ahandler({
    post: handler,
});
