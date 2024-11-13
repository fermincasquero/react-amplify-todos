import React, { useEffect, useState, useCallback } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Todo } from "../models";

interface TodoItemProps {
  item: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      const category = await item.category;
      setCategoryName(category?.name || "");
    };
    fetchCategory();
  }, [item.category]);

  const handleDelete = useCallback(async () => {
    try {
      await DataStore.delete(Todo, item.id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }, [item.id]);

  const handleChangeStatus = useCallback(async () => {
    try {
      await DataStore.save(
        Todo.copyOf(item, (updated) => {
          updated.status =
            item.status === "FINISHED" ? "UNFINISHED" : "FINISHED";
        })
      );
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  }, [item]);

  return (
    <li className="flex flex-wrap items-center w-full gap-x-6 gap-y-4 py-5 sm:flex-nowrap border-b border-gray-100">
      <div className="flex flex-1 flex-col">
        <div className="flex items-center">
          <p
            className={`text-sm font-semibold leading-6 ${
              item.status === "FINISHED"
                ? "line-through text-gray-500"
                : "text-gray-900"
            }`}
          >
            {item.name}
          </p>
          {categoryName && (
            <span className="rounded-full bg-blue-500 text-white px-2 py-px text-[10px] ml-1 h-fit">
              {categoryName}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
      <div className="flex gap-x-2 sm:w-auto items-center">
        <Checkbox
          checked={item.status === "FINISHED"}
          onChange={handleChangeStatus}
        />
        <DeleteButton onClick={handleDelete} />
      </div>
    </li>
  );
};

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={onChange}
    className="w-7 h-7 rounded-md border-2 border-yellow-600 focus:ring-transparent checked:bg-green-600 checked:hover:bg-green-500 checked:focus:bg-green-600"
  />
);

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => (
  <button
    className="bg-red-600 p-1.5 hover:bg-red-500 rounded-md"
    onClick={onClick}
  >
    <TrashIcon className="w-4 h-4 text-white" />
  </button>
);

export default React.memo(TodoItem);
