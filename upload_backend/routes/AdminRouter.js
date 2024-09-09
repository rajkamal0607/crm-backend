const express = require('express');
const router = express.Router();
const adminController = require('../controller/AdminController');

router.post('/api/admin/add', async(req,res) => {
    adminController.addAdmin(req,res);
})

router.post('/api/admin/login', async(req,res) => {
    adminController.adminLogin(req,res);
})

router.get('/api/admin/getalladmin', async(req,res) => {
    adminController.getAllAdmin(req,res);
})

router.post('/api/admin/updateleave', async(req,res) => {
    adminController.updateLeave(req,res);
})

module.exports = router;