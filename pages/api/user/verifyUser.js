import { verify } from "../../../helpers/api/users-data";
import { ahandler } from "../../../helpers/api/ahandler";

const handler = async (req, res) => {
    const email = req.body;
    verify(email);
    return res.status(200).json({ message: "User verified" });
};

export default ahandler({
    post: handler,
});
