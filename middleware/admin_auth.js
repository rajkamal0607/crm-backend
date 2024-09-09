const jwt = require('jsonwebtoken');
const Employee = require('../model/Employees');

const admin_auth = async(req, res, next) => {
    try {
        const JWT = "BackendCRMProject";
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, JWT)
        const employee = await Employee.findOne({ _id: data._id })
        if (!employee) {
            throw new Error()
        }
        req.user = employee
        //req.token = token
        next()
    } catch (error) {
        res.status(200).send({ statusCode : 401, message: 'Not Authorize' })
    }

}
module.exports = admin_auth