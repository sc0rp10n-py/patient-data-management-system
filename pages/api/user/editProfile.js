import {edit} from "../../../helpers/api/users-data";
import {ahandler} from "../../../helpers/api/ahandler";


function editProfile(req, res) {
    // console.log("editProfile", req.body);
    const id = req.body.id;
    const params = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone
    }
    edit(id, params);
    return res.status(200).json({});
}

export default ahandler({
    post: editProfile
});
