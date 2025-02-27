import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useTasks } from "../../hooks/useTasks";
import EditTaskModal from "../../modal/EditTaskModal";

const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask.mutate(task._id);
      }
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Task Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">{task.title}</h3>

      {/* Task Description */}
      <p className="text-sm text-gray-600 mb-4">{task.description}</p>

      {/* Action Icons */}
      <div className="flex justify-end gap-4">
        {/* Edit Icon */}
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-300 border border-gray-200 hover:border-blue-300 cursor-pointer"
          onClick={() => setIsEditOpen(true)}
        >
          <HiPencil className="h-5 w-5" />
        </button>

        {/* Delete Icon */}
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-300 border border-gray-200 hover:border-red-300 cursor-pointer"
          onClick={handleDelete}
        >
          <FaTrash className="h-5 w-5" />
        </button>
      </div>

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        task={task}
      />
    </div>
  );
};

export default TaskCard;
