const mongoose = require('mongoose');
const LeaveSchema = require('./Leaves');
const AttendanceSchema = require('./Attendance');
const ProjectSchema = require('./Projects');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const MeetingSchema = require('./Meetings');

const EmployeeSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: String,
    designation: String,
    leaves: [LeaveSchema],
    attendance: [AttendanceSchema],
    projects: [ProjectSchema],
    meetings: [MeetingSchema]
},{timestamps: { createdAt: 'created', updatedAt: 'modified' }})

EmployeeSchema.pre('save', async function (next) {
    // Hash the password before saving the admin model
    const employee = this
    if (employee.isModified('password')) {
        employee.password = await bcrypt.hash(employee.password, 8)
    }
    next()
})

EmployeeSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const JWT = "BackendCRMProject";
    const employee = this
    const token = jwt.sign({ _id: employee._id }, JWT)
    employee.token = token;
    await employee.save()
    return token
}

EmployeeSchema.statics.findByCredentials = async (email, password) => {
    const employee = await Employee.findOne({email: email});
    if (!employee) {
        throw { message: 'login error' }
    }
    const isPasswordMatch = await bcrypt.compare(password, employee.password)
    if (!isPasswordMatch) {
        throw { message: 'login error' }
    }
    return employee
}

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee