const { Task, Project } = require("../models");
const { Op } = require("sequelize");
exports.createTask = async (req, res) => {
  try {
    const project = await Project.findOne({
      where: {
        id: req.body.projectId,
        userId: req.user.id
      }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    const task = await Task.create({
      taskName: req.body.taskName,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
      dueDate: req.body.dueDate,
      projectId: req.body.projectId
    });

    res.status(201).json({
      success: true,
      task
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { search, status, priority } = req.query;

    const taskWhere = {};

    if (search) {
      taskWhere.taskName = {
        [Op.like]: `%${search}%`,
      };
    }

    if (status) {
      taskWhere.status = status;
    }

    if (priority) {
      taskWhere.priority = priority;
    }

    const tasks = await Task.findAll({
      where: taskWhere,
      include: [
        {
          model: Project,
          where: {
            userId: req.user.id,
          },
        },
      ],
    });

    res.json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Project,
        where: {
          userId: req.user.id
        }
      }]
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      task
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Project,
        where: {
          userId: req.user.id
        }
      }]
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    await task.update(req.body);

    res.json({
      success: true,
      task
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Project,
        where: {
          userId: req.user.id
        }
      }]
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    await task.destroy();

    res.json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
