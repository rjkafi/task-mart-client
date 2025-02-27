import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";

const AddTaskModal = ({ isOpen, setIsOpen }) => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;

    addTask.mutate(
      { title, description, category: "To-Do" },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* Blurred Background */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-2xl max-w-md w-full border border-white/20">
          {/* Gradient Title */}
          <Dialog.Title className="text-2xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Add New Task
          </Dialog.Title>

          {/* Title Input */}
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description Input */}
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              rows="3"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-gray-100 rounded-lg cursor-pointer transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              onClick={handleSubmit}
            >
              Add Task
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddTaskModal;
