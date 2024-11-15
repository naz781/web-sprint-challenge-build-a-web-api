const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id);
        if (!action) {
            return res.status(404).json({ message: 'Action not found' });
        }
        req.action = action;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Failed to process request' });
    }
}

async function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!(project_id && description && notes)) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if (description.length > 128) {
        return res.status(400).json({ message: 'Description is too long' });
    }
    try {
        const project = await Projects.get(project_id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Failed to process request' });
    }
}

module.exports = {
    validateActionId,
    validateAction,
};
