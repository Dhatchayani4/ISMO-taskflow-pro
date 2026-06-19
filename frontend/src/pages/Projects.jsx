import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject
} from "../services/projectService";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.projects);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateProject = async () => {
    try {
      if (editingId) {
        await updateProject(editingId, {
          projectName,
          description,
          status: "Not Started"
        });
      } else {
        await createProject({
          projectName,
          description,
          status: "Not Started"
        });
      }

      setProjectName("");
      setDescription("");
      setEditingId(null);
      setShowForm(false);

      loadProjects();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      loadProjects();
    } catch (err) {
      console.log(err);
      alert("Failed to delete project");
    }
  };

  const handleEditProject = (project) => {
    setProjectName(project.projectName);
    setDescription(project.description);
    setEditingId(project.id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold">Projects</h1>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setProjectName("");
            setDescription("");
          }}
          className="bg-blue-600 px-5 py-3 rounded-xl"
        >
          + New Project
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-8">
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl bg-slate-800"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl bg-slate-800"
          />

          <button
            onClick={handleCreateProject}
            className="bg-green-600 px-5 py-3 rounded-xl"
          >
            {editingId ? "Update Project" : "Create Project"}
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-semibold">
                {project.projectName}
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditProject(project)}
                  className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <p className="text-slate-400">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;