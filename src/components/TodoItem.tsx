import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { DataStore } from "@aws-amplify/datastore";
import { Todo } from "../models";
import classNames from "classnames";

interface IProps {
  item: Todo;
}

const TodoItem: React.FC<IProps> = ({ item }) => {
  const handleDelete = async () => {
    try {
      await DataStore.delete(Todo, item.id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggleStatus = async () => {
    try {
      await DataStore.save(
        Todo.copyOf(item, (updated) => {
          updated.status = item.status === "FINISHED" ? "UNFINISHED" : "FINISHED";
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <li key={item.id} className="flex flex-wrap items-center w-full  gap-x-6 gap-y-4 py-5 sm:flex-nowrap border-b border-gray-100">
      <div className="flex flex-1 flex-col">
        <p
          className={classNames("text-sm font-semibold leading-6 text-gray-900", {
            "line-through": item.status === "FINISHED",
          })}
        >
          {item.name}
        </p>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>

      <dl className="flex gap-x-8 sm:w-auto items-center">
        <button
          className="bg-indigo-600 p-1.5 hover:bg-indigo-500 rounded-md text-sm text-white"
          onClick={handleToggleStatus}
        >
          Mark as {item.status === "FINISHED" ? "Undone" : "Done"}
        </button>

        <button className="bg-red-600 p-1.5 hover:bg-red-500 rounded-md" onClick={handleDelete}>
          <TrashIcon className="w-4 h-4 text-white " />
        </button>
      </dl>
    </li>
  );
};

export default TodoItem;
