const express = require('express');
const Actions = require('./actions-model');
const { validateActionId, validateAction } = require('./actions-middlware');

const router = express.Router();

// Get all actions
router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.json(actions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get actions' });
    }
});

// Get action by ID
router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action);
});

// Create a new action
router.post('/', validateAction, async (req, res) => {
    try {
        const newAction = await Actions.insert(req.body);
        res.status(201).json(newAction);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create action' });
    }
});

// Update an action by ID
router.put('/:id', validateActionId, validateAction, async (req, res) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body);
        res.json(updatedAction);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update action' });
    }
});

// Delete an action by ID
router.delete('/:id', validateActionId, async (req, res) => {
    try {
        await Actions.remove(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete action' });
    }
});

module.exports = router;
