const Employee = require('../models/employee.model');

// Create and Save a new Employee
exports.create = async (req, res) => {
    try {
        const employee = new Employee({
            name: req.body.name,
            email: req.body.email,
            position: req.body.position,
            salary: req.body.salary
        });

        await employee.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Employee."
        });
    }
};

// Retrieve all Employees
exports.findAll = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render('index', { employees });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving employees."
        });
    }
};

// Find a single Employee
exports.findOne = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.render('edit', { employee });
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving employee with id " + req.params.id
        });
    }
};

// Update an Employee
exports.update = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            position: req.body.position,
            salary: req.body.salary
        }, { new: true });

        if (!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.redirect('/');
    } catch (err) {
        res.status(500).send({
            message: "Error updating employee with id " + req.params.id
        });
    }
};

// Delete an Employee
exports.delete = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndRemove(req.params.id);
        if (!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.redirect('/');
    } catch (err) {
        res.status(500).send({
            message: "Could not delete employee with id " + req.params.id
        });
    }
};