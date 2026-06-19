const { Project, Task } = require("../models");
const { Op } = require("sequelize");

exports.getDashboardStats = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        userId: req.user.id,
      },
    });

    const projectIds = projects.map((p) => p.id);

    const totalProjects = projects.length;

    const totalTasks = await Task.count({
      where: {
        projectId: {
          [Op.in]: projectIds,
        },
      },
    });

    const completedTasks = await Task.count({
      where: {
        projectId: {
          [Op.in]: projectIds,
        },
        status: "Completed",
      },
    });

    const pendingTasks = await Task.count({
      where: {
        projectId: {
          [Op.in]: projectIds,
        },
        status: "Pending",
      },
    });

    const projectsInProgress = await Project.count({
      where: {
        userId: req.user.id,
        status: "In Progress",
      },
    });

    res.json({
      success: true,
      stats: {
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        projectsInProgress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};