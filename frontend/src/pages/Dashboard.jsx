import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import { getTasks } from "../services/taskService";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [projects, setProjects] = useState([]);
const [tasks, setTasks] = useState([]);
useEffect(() => {
  loadDashboardData();
}, []);
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

const loadDashboardData = async () => {
  try {
    const projectRes = await getProjects();
    const taskRes = await getTasks();

    setProjects(projectRes.data.projects);
    setTasks(taskRes.data.tasks);
  } catch (err) {
    console.log(err);
  }
};
  const totalProjects = projects.length;

const totalTasks = tasks.length;

const completedTasks = tasks.filter(
  (task) => task.status === "Completed"
).length;

const pendingTasks = tasks.filter(
  (task) => task.status === "Pending"
).length;
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">

        <h1 className="text-2xl font-bold mb-10">
          TaskFlow Pro
        </h1>

        <nav className="space-y-3">

          <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-600">
            Dashboard
          </button>

          <Link
  to="/projects"
  className="block w-full text-left px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700"
>
  Projects
</Link>

          <Link
  to="/tasks"
  className="block w-full text-left px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700"
>
  Tasks
</Link>

          

        </nav>

      </aside>

      {/* Main */}
      <main className="flex-1 p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-5xl font-bold mb-2">
              Welcome Back !
            </h1>

            <p className="text-slate-400 text-lg">
              Manage projects, tasks and team collaboration.
            </p>
          </div>

          <button
             onClick={handleLogout}
             className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl"
>
  Logout
</button>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400 mb-2">Total Projects</p>
           <h2 className="text-4xl font-bold">{totalProjects}</h2>
          </div>

          

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400 mb-2">Total Tasks</p>
            <h2 className="text-4xl font-bold">{totalTasks}</h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400 mb-2">Tasks Completed</p>
          <h2 className="text-4xl font-bold">{completedTasks}</h2>  
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400 mb-2">Pending Tasks</p>
            <h2 className="text-4xl font-bold">{pendingTasks}</h2>
          </div>

        </div>

        {/* Projects */}
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-2xl font-semibold">
              Recent Projects
            </h2>

            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl">
              + New Project
            </button>

          </div>

          <div className="space-y-4">

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">

  <div className="flex justify-between items-center mb-8">
    <h2 className="text-2xl font-semibold">
      Recent Projects
    </h2>
  </div>

  <div className="space-y-4">

    {projects.map((project) => (
      <div
        key={project.id}
        className="bg-slate-800 p-5 rounded-2xl flex justify-between items-center"
      >
        <span>{project.projectName}</span>

        <span className="text-green-400">
          {project.status}
        </span>
      </div>
    ))}

  </div>

</div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;