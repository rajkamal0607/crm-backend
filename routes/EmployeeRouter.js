const express = require('express');
const router = express.Router();
const employeeController = require('../controller/EmployeeController');
const admin_auth = require('../middleware/admin_auth');

router.post('/api/employee/add', async(req,res) => {
    employeeController.addEmployee(req,res);
})

router.post('/api/employee/login', async(req,res) => {
    employeeController.employeeLogin(req,res);
})

router.post('/api/employee/attendance', admin_auth, async(req,res) => {
    employeeController.attendance(req,res);
})

router.post('/api/employee/addprojecttasks', async(req,res) => {
    employeeController.addProjectTasks(req,res);
})

router.get('/api/employee/getemployeedata', admin_auth, async(req,res) => {
    employeeController.getEmployeeData(req,res);
})

router.get('/api/employee/getemployeebirthdays', async(req,res) => {
    employeeController.getEmployeeBirthdays(req,res);
})

router.post('/api/employee/addmeetings', async(req,res) => {
    employeeController.addMeetings(req,res);
})

router.get('/api/employee/getallemployees', async(req,res) => {
    employeeController.getAllEmployees(req,res);
})

router.post('/api/employee/updateemployee', async(req,res) => {
    employeeController.updateEmployee(req,res);
})

router.post('/api/employee/removeemployee', async(req,res) => {
    employeeController.removeEmployee(req,res);
})

router.post('/api/employee/applyleave', admin_auth, async(req,res) => {
    employeeController.applyLeave(req,res);
})

router.get('/api/employee/getallleaves', async(req,res) => {
    employeeController.getAllLeaves(req,res);
})

module.exports = router