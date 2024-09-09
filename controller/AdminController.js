const Admin = require('../model/Admin');
const Employee = require('../model/Employees');

exports.addAdmin = async function(req,res){
    try {
        const { name,email,password,dob,designation } = req.body;
        if(!name || !email || !password || !dob || !designation){
            return res.status(400).send({ status: 400, message: "Please fill all the Fields" });
        }
        await new Admin({
            name,
            email,
            password,
            dob,
            designation
        }).save();
        res.status(200).send({ status: 200, message: "Admin added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


exports.adminLogin = async function(req,res){
    try {
        const { email,password } = req.body;
        if(!email || !password){
            return res.status(400).send({ status: 400, message: "Please fill all the Fields" });
        }
        const adminData = await Admin.findByCredentials(email,password);
        if(!adminData){
            return res.status(400).send({ status: 400, message: "Login Error" });
        }
        res.status(200).send({ status: 200, data: adminData, message: "Login Successful" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


exports.getAllAdmin = async function(req,res){
    try {
        const getAdmins = await Admin.find();
        res.status(200).send({ status: 200, data: getAdmins, message: "Admins Data Fetched Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


exports.updateLeave = async function(req,res){
    try {
        const { user_id, leave_id, status } = req.body;
        await Employee.updateOne({_id:user_id,'leaves._id':leave_id},{$set:{"leaves.$.status":status}});
        res.status(200).send({ status: 200, message: "Leave request updated Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}