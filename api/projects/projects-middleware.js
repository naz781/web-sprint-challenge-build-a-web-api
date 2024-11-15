
const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        req.project = project;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Failed to process request', error: error.message });
    }
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    if (!(name && description && completed !== undefined)) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    next();
}

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

module.exports = {
    validateProjectId,
    validateProject,
    logger,
};
