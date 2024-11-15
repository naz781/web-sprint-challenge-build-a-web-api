
const express = require('express');
const Projects = require('./projects-model');
const { validateProjectId, validateProject } = require('./projects-middleware');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.json(projects);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get projects',
            error: error.message,
            stack: error.stack,
        });
    }
});

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
});

router.post('/', validateProject, async (req, res) => {
    try {
        const newProject = await Projects.insert(req.body);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create project',
            error: error.message,
            stack: error.stack,
        });
    }
});

router.put('/:id', validateProjectId, validateProject, async (req, res) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body);
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update project',
            error: error.message,
            stack: error.stack,
        });
    }
});

router.delete('/:id', validateProjectId, async (req, res) => {
    try {
        await Projects.remove(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete project',
            error: error.message,
            stack: error.stack,
        });
    }
});

router.get('/:id/actions', validateProjectId, async (req, res) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        res.json(actions);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get actions for the project',
            error: error.message,
            stack: error.stack,
        });
    }
});

module.exports = router;
