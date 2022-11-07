import formidable from "formidable";
import path from "path";
import { promises as fss } from "fs";
import { create } from "../../../helpers/api/files-data";
import { ahandler } from "../../../helpers/api/ahandler";
import fs from 'fs';
let tempfiles = JSON.parse(fs.readFileSync('data/tempfiles.json'));
export const config = {
    api: {
        bodyParser: false,
    },
};

const readFile = (req) => {
    const form = formidable(
        {
            uploadDir: path.join(process.cwd(), "data/documents"),
            filename: (name, ext, path, form) => {
                return path.originalFilename;
            }
        }
    );
    
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            tempfiles[0].name = files.file['originalFilename'];
            tempfiles[0].path = files.file['filepath'];
            // console.log("tempfiles", tempfiles);
            create(tempfiles[0]);
            const temp = [];
            fs.writeFileSync('data/tempfiles.json', JSON.stringify(temp, null, 4));
            resolve({ fields, files });
        });
    });
};

const handler = async (req, res) => {
    // console.log(req.body);
    // console.log(req.body);
    try {
        await fss.readdir(path.join(process.cwd(), "data/documents"));
    } catch (err) {
        await fss.mkdir(path.join(process.cwd(), "data/documents"));
    }
    await readFile(req);
    res.json({ message: "success" });
};

export default ahandler({
    post: handler
});