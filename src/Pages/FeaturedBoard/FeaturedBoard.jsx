import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks } from "../../hooks/useTasks";
import TaskCard from "../TaskCard/TaskCard";
import AddTaskModal from "../../modal/AddTaskModal";
import { FaPlusCircle } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const FeaturedBoard = () => {
  const { tasks, isLoading, updateTaskCategory, updateTaskPositions } =
    useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  // Handle Drag End
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If dropped outside the list
    if (!destination) return;

    // If dropped in the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Reorder within the same category
    if (source.droppableId === destination.droppableId) {
      const categoryTasks = tasks
        .filter((task) => task.category === source.droppableId)
        .sort((a, b) => a.position - b.position);

      const [movedTask] = categoryTasks.splice(source.index, 1);
      categoryTasks.splice(destination.index, 0, movedTask);

      // Update positions in the database
      const updatedTasks = categoryTasks.map((task, index) => ({
        ...task,
        position: index,
      }));

      updateTaskPositions.mutate(updatedTasks);
    } else {
      // Move to a different category
      updateTaskCategory.mutate({
        id: draggableId,
        category: destination.droppableId,
      });
    }
  };

  return (
    <div className="my-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-10 text-center shadow-lg mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">
          Manage Your Tasks Easily
        </h2>
        <p className="mt-2 text-sm md:text-lg w-10/12 mx-auto">
          Organize your work efficiently with drag-and-drop functionality. Move
          tasks between categories and stay productive!
        </p>
      </div>

      <div className="px-4 lg:px-8">
        {/* Top Section: Title & Add Task Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Task Management
          </h1>
          <button
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlusCircle className="h-5 w-5" />
            <span>Add a Task</span>
          </button>
        </div>

        {/* Task Board */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {["To-Do", "In Progress", "Done"].map((category) => (
              <Droppable key={category} droppableId={category}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-white p-5 rounded-lg shadow-lg border border-gray-200"
                  >
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                      {category}
                    </h2>
                    {tasks
                      ?.filter((task) => task.category === category)
                      .sort((a, b) => a.position - b.position)
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-3"
                            >
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        {/* Add Task Modal */}
        <AddTaskModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

export default FeaturedBoard;
