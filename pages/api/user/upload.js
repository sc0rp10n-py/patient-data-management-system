import formidable from "formidable";
import path from "path";
import { promises as fss } from "fs";
import { create } from "../../../helpers/api/files-data";
import { ahandler } from "../../../helpers/api/ahandler";
import fs from 'fs';
export const config = {
    api: {
        bodyParser: false,
    },
};

const readFile = (req, tempfiles) => {
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
            console.log("tempfiles", tempfiles);
            const tf = tempfiles.find((tf) => tf.name === files.file['originalFilename']);
            console.log("tf", tf);
            tf.name = files.file['originalFilename'];
            tf.path = files.file['filepath'];
            create(tf);
            const temp = [];
            fs.writeFileSync('data/tempfiles.json', JSON.stringify(temp, null, 4));
            resolve({ fields, files });
        });
    });
};

const handler = async (req, res) => {
    // console.log(req.body);
    // console.log(req.body);
    let tempfiles = await JSON.parse(fs.readFileSync('data/tempfiles.json'));
    try {
        await fss.readdir(path.join(process.cwd(), "data/documents"));
    } catch (err) {
        await fss.mkdir(path.join(process.cwd(), "data/documents"));
    }
    await readFile(req, tempfiles);
    res.json({ message: "success" });
};

export default ahandler({
    post: handler
});