import { userd } from "../../../helpers/api/users-data";
import { ahandler } from "../../../helpers/api/ahandler";

const handler = async (req, res) => {
    const email = req.body;
    userd(email);
    return res.status(200).json({ message: "User Deleted" });
};

export default ahandler({
    post: handler,
});
