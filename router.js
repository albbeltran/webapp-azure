const express = require('express');
const router = express.Router();

const { query } = require('./database/db');


// create
router.post('/empleado', async (req, res) => {
    try {
        await query("INSERT INTO employees_sample.employees(id,name,password,department) VALUES (?, ?, ?, ?)",
            [req.body.id, req.body.name, req.body.password, req.body.department])

        // redirect with 303 code to redirect using GET method, not DELETE
        res.redirect(303, `/`);

    } catch (error) {
        res.status(400).json(error);
    }
})


// read
router.get('/empleado/:id', async (req, res) => {
    try {
        const employee = await query('SELECT id, name, department FROM employees WHERE id = ?', [req.params.id]);

        if (employee.length) res.status(200).json(employee[0]);
        else res.sendStatus(404);

    } catch (error) {
        res.status(400).json(error);
    }
})

router.get('/', async (req, res) => {
    const employees = await query('SELECT id, name, department FROM employees', []);
    console.log(employees)
    res.render('home', { employees })
})


// update
router.put('/empleado/:id', async (req, res) => {
    try {
        await query('UPDATE employees SET name = ?, department = ? WHERE id = ?',
            [req.body.name, req.body.department, req.body.id]);

        res.redirect('/');

    } catch (error) {
        res.status(400).json(error);
    }
})


// delete
router.delete('/empleado/:id', async (req, res) => {
    try {
        await query('DELETE FROM employees WHERE id = ?', [req.params.id]);

        // redirect with 303 code to redirect using GET method, not DELETE
        res.redirect(303, '/');
    } catch (error) {
        res.status(400).json(error);
    }
})


module.exports = router;