const { default: mongoose } = require('mongoose');
const Employee = require('../model/Employees');
const moment = require('moment');

exports.addEmployee = async function (req, res) {
    try {
        const { name, email, password, dob, designation } = req.body;
        if (!name || !email || !password || !dob || !designation) {
            return res.status(400).send({ status: 400, message: "Please fill all the Fields" });
        }
        await new Employee({
            name,
            email,
            password,
            dob,
            designation
        }).save();
        res.status(200).send({ status: 200, message: "Employee added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


exports.employeeLogin = async function (req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ status: 400, message: "Please fill all the Fields" });
        }
        const employeeData = await Employee.findByCredentials(email, password);
        if (!employeeData) {
            return res.status(400).send({ status: 400, message: "Login Error" });
        }
        const token = await employeeData.generateAuthToken();
        res.status(200).send({ status: 200, data: employeeData, token: token, message: "Login Successful" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


exports.attendance = async function (req, res) {
    try {
        const employee = req.user;
        const { checkin, checkout } = req.body;
        if (checkin) {
            employee.attendance.push({
                startTime: checkin
            })
            await employee.save();
            return res.status(200).send({ status: 200, message: "check in successful" })
        }

        if (checkout) {
            employee.attendance.push({
                endTime: checkout
            })
            await employee.save();
            return res.status(200).send({ status: 200, message: "check out successful" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

exports.addProjectTasks = async function (req, res) {
    try {
        const { name, task, deadline, _id } = req.body;
        if (!name || !task || !deadline) {
            return res.status(400).send({ status: 400, message: 'Please fill all the fields' });
        }
        const employeeData = await Employee.findOne({ _id: _id });
        if(employeeData){
            employeeData.projects.push({
                name,
                task,
                deadline
            })
            await employeeData.save();
        }
        res.status(200).send({ status: 200, message: 'Projects and Tasks are assigned' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

exports.getEmployeeData = async function (req, res) {
    try {
        const employee = await Employee.findOne({ _id: req.user._id });
        res.status(200).send({ status: 200, data: employee, message: "User Fetched Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

exports.getEmployeeBirthdays = async function (req, res) {
    try {
        const bdayMonth = [];
        const getData = await Employee.find();
        for (let i = 0; i < getData.length; i++) {
            const element = getData[i];
            if (new Date().getMonth() + 1 == new Date(element.dob).getMonth() + 1) {
                bdayMonth.push({
                    "name": element.name,
                    "dob": element.dob
                })
            }
        }
        res.status(200).send({ status: 200, data: bdayMonth });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

exports.addMeetings = async function (req, res) {
    try {
        const { type, time, _id } = req.body;
        if (!type || !time) {
            return res.status(400).send({ status: 400, message: 'Please fill all the fields' });
        }
        const employeeData = await Employee.findOne({ _id: _id });
        if(employeeData){
            employeeData.meetings.push({
                type,
                time
            })
            await employeeData.save();
        }
        res.status(200).send({ status: 200, message: "meeting added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


exports.getAllEmployees = async function (req, res) {
    try {
        const getAllData = await Employee.find();
        res.status(200).send({ status: 200, data: getAllData, message: "All employee data fetched successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


exports.updateEmployee = async function (req, res) {
    try {
        const { name, email, dob, designation, _id } = req.body;
        if (!name || !email || !dob || !designation) {
            return res.status(400).send({ status: 400, message: "Please fill all the Fields" });
        }
        await Employee.updateOne({ _id: _id }, { $set: { name: name, email: email, dob: dob, designation: designation } });
        res.status(200).send({ status: 200, message: "Data updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


exports.removeEmployee = async function (req, res) {
    try {
        const { _id } = req.body;
        await Employee.deleteOne({ _id: _id });
        res.status(200).send({ status: 200, message: "Data removed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


exports.applyLeave = async function (req, res) {
    try {
        const employee = req.user;
        const { leaveType, manager, reason, from, to } = req.body;
        if (!leaveType || !manager || !reason || !from || !to) {
            return res.status(400).send({ status: 400, message: "Please fill all the Fields" });
        }
        employee.leaves.push({
            type: leaveType,
            reportingManager: manager,
            reason: reason,
            from: from,
            to: to
        })
        await employee.save();
        res.status(200).send({ status: 200, data: employee, message: "Leave applied successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}


exports.getAllLeaves = async function (req, res) {
    try {
        const leavesArr = [];
        const getLeaveData = await Employee.find().select({ name: 1, leaves: 1 });
        for (let i = 0; i < getLeaveData.length; i++) {
            const elementemployee = getLeaveData[i];
            for (let j = 0; j < elementemployee.leaves.length; j++) {
                const elementleave = elementemployee.leaves[j];
                leavesArr.push({
                    user_id: elementemployee._id,
                    name: elementemployee.name,
                    leaveType: elementleave.type,
                    from: elementleave.from,
                    to: elementleave.to,
                    reason: elementleave.reason,
                    status: elementleave.status,
                    leave_id: elementleave._id
                })
            }
        }
        res.status(200).send({ status: 200, data: leavesArr, message: "All leaves fetched successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

