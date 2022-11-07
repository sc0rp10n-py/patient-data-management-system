import { addShare } from "../../../helpers/api/files-data";
import { ahandler } from "../../../helpers/api/ahandler";

const handler = async (req, res) => {
    try {
        const body = JSON.parse(req.body);
        const email = body.email;
        const id = body.id;
        // console.log("email", email);
        // console.log("id", id);
        // const email = req.body;
        addShare(id, email);
        return res.status(200).json({ message: "File Shared" });
    } catch (err) {
        return res.status(500).json({ message: "Error" });
    }
};

export default ahandler({
    post: handler,
});
