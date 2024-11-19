const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

// List all employees
router.get('/', employeeController.findAll);

// Display add employee form
router.get('/add', (req, res) => {
    res.render('add');
});

// Create new employee
router.post('/add', employeeController.create);

// Display edit form
router.get('/edit/:id', employeeController.findOne);

// Update employee
router.post('/edit/:id', employeeController.update);

// Delete employee
router.get('/delete/:id', employeeController.delete);

module.exports = router;