import fs from 'fs';

const handler = async (req, res) => {
    const {path} = req.body;
    const p = process.cwd() + "/public" + path;
    const n = fs.unlinkSync(p);
    res.json({ message: "success" });
}

export default handler;