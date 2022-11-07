import { ahandler } from "helpers/api/ahandler";
import fs from 'fs';
let files = JSON.parse(fs.readFileSync('data/files.json'));

const handler = async (req, res) => {
    const email = req.body;
    // console.log("email", email);
    // console.log("files", files);
    const userFiles = files.filter(x => x.owner === email);
    // console.log(userFiles);
    return res.status(200).json(userFiles);
};

export default ahandler({
    post: handler
});