import { ChangeEvent, useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import classNames from "classnames";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { Todo } from "../models";

interface IProps {
  item: Todo;
}

const TodoItem: React.FC<IProps> = ({ item }) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    item.category.then((category) => {
      setCategoryName(category?.name || "");
    });
  }, [item.category]);

  const handleDelete = async () => {
    try {
      await DataStore.delete(Todo, item.id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeStatus = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      await DataStore.save(
        Todo.copyOf(item, (updated) => {
          updated.status = e.target.checked ? "FINISHED" : "UNFINISHED";
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <li
      key={item.id}
      className="flex flex-wrap items-center w-full  gap-x-6 gap-y-4 py-5 sm:flex-nowrap border-b border-gray-100"
    >
      <div className="flex flex-1 flex-col">
        <div className="flex items-center">
          <p
            className={classNames("text-sm font-semibold leading-6", {
              "line-through text-gray-500": item.status === "FINISHED",
              "text-gray-900": item.status === "UNFINISHED",
            })}
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

      <dl className="flex gap-x-2 sm:w-auto items-center">
        <input
          checked={item.status === "FINISHED"}
          onChange={handleChangeStatus}
          type="checkbox"
          className="w-7 h-7 rounded-md border-2 border-yellow-600 focus:ring-transparent checked:bg-green-600 checked:hover:bg-green-500 checked:focus:bg-green-600"
        />

        <button className="bg-red-600 p-1.5 hover:bg-red-500 rounded-md" onClick={handleDelete}>
          <TrashIcon className="w-4 h-4 text-white " />
        </button>
      </dl>
    </li>
  );
};

export default TodoItem;
