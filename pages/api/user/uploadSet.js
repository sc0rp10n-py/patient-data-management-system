import { create } from "../../../helpers/api/files-data";
import { ahandler } from "../../../helpers/api/ahandler";
import { userService } from "services";
import fs from 'fs';
let files = JSON.parse(fs.readFileSync('data/tempfiles.json'));

const handler = async (req, res) => {
    // const fileType = localStorage.getItem("fileType");
    // const user = userService.userValue;
    // console.log("fileType", fileType);
    // console.log("user", user);
    // console.log("req.body", req.body);
    const body = JSON.parse(req.body);
    const fileType = body['fileType'];
    const owner = body['owner'];
    const ownerId = body['ownerId'];
    const file = {
        name: "",
        path: "",
        type: fileType,
        owner: owner,
        ownerId: ownerId,
        verified: false,
    }
    files.push(file);
    fs.writeFileSync('data/tempfiles.json', JSON.stringify(files, null, 4));
    return res.status(200).json({});
};

export default ahandler({
    post: handler,
});
