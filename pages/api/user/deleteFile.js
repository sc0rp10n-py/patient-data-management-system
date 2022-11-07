import { filed } from "../../../helpers/api/files-data";
import { ahandler } from "../../../helpers/api/ahandler";
import fs from "fs";
let files = JSON.parse(fs.readFileSync("data/files.json"));
const handler = async (req, res) => {
    // console.log("req.body", req.body);
    const id = req.body.id;
    const email = req.body.email;
    // console.log(id);
    const file = files.filter((file) => file.id === id && file.owner === email);
    // console.log(file[0].path);
    // return res.status(200).json({ message: "File Deleted" });
    if (file) {
        const neww = fs.unlinkSync(file[0].path);
        filed(id);
        return res.status(200).json({ message: "File Deleted" });
    } else {
        return res.status(500).json({ message: "Error" });
    }
};

export default ahandler({
    post: handler,
});
