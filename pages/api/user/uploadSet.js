// import { create } from "../../../helpers/api/files-data";
import { ahandler } from "../../../helpers/api/ahandler";
// import { userService } from "services";
import fs from 'fs';
let files = JSON.parse(fs.readFileSync('data/tempfiles.json'));

const handler = async (req, res) => {
    const body = JSON.parse(req.body);
    const fileName = body['fileName'];
    const fileType = body['fileType'];
    const owner = body['owner'];
    const ownerId = body['ownerId'];
    const file = {
        name: fileName,
        path: "",
        type: fileType,
        owner: owner,
        ownerId: ownerId,
        verified: false,
    }
    files.push(file);
    await fs.writeFileSync('data/tempfiles.json', JSON.stringify(files, null, 4));
    return res.status(200).json({});
};

export default ahandler({
    post: handler,
});
