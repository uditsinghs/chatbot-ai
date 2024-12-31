import { useState } from "react";
import axios from "../config/axios";
// import { useAuth } from "../context/auth"

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Project name is required!");
      return;
    }

    try {
      const { data } = await axios.post("/api/v1/project/create", {name}, {
        withCredentials: true,  
      });
      console.log(data);
      setIsOpen(false);
      setName('')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      {/* Create Project Button */}
      <button
        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={() => setIsOpen(true)}
      >
        Create Project
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleCreateProject}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-semibold mb-4">Create New Project</h2>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-black border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                onClick={() => {
                  setName("");
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
