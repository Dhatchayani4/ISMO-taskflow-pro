import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../services/taskService";

import { getProjects } from "../services/projectService";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  useEffect(() => {
    loadTasks();
    loadProjects();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.projects);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveTask = async () => {
    try {
      const payload = {
        taskName,
        description,
        projectId,
        priority,
        status,
        dueDate
      };

      if (editingId) {
        await updateTask(editingId, payload);
      } else {
        await createTask(payload);
      }

      setTaskName("");
      setDescription("");
      setProjectId("");
      setPriority("Medium");
      setStatus("Pending");
      setDueDate("");
      setEditingId(null);
      setShowForm(false);

      loadTasks();
    } catch (err) {
      console.log(err);
      alert("Task operation failed");
    }
  };

  const handleEditTask = (task) => {
    setTaskName(task.taskName);
    setDescription(task.description);
    setProjectId(task.projectId);
    setPriority(task.priority);
    setStatus(task.status);
    setDueDate(task.dueDate || "");
    setEditingId(task.id);
    setShowForm(true);
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold">
          Tasks
        </h1>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
          }}
          className="bg-blue-600 px-5 py-3 rounded-xl"
        >
          + New Task
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-8">

          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl bg-slate-800"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl bg-slate-800"
          />

          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl bg-slate-800"
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.projectName}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl bg-slate-800"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl bg-slate-800"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl bg-slate-800"
/>
          <button
            onClick={handleSaveTask}
            className="bg-green-600 px-5 py-3 rounded-xl"
          >
            {editingId ? "Update Task" : "Create Task"}
          </button>

        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
          >
            <div className="flex justify-between mb-4">

              <h2 className="font-semibold text-xl">
                {task.taskName}
              </h2>

              <div className="flex gap-2">

                <button
                  onClick={() => handleEditTask(task)}
                  className="bg-yellow-600 px-3 py-2 rounded-lg text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-600 px-3 py-2 rounded-lg text-sm"
                >
                  Delete
                </button>

              </div>

            </div>

            <p className="text-slate-400 mb-3">
              {task.description}
            </p>

            <div className="flex justify-between text-sm">
              <span>{task.priority}</span>
              <span>{task.status}</span>
              <p className="text-slate-400 mb-2">
               Due: {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "Not Set"}
</p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Tasks;