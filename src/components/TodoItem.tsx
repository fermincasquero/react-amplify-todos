import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { DataStore } from "@aws-amplify/datastore";
import { Todo } from "../models";

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

  return (
    <li key={item.id} className="flex flex-wrap items-center w-full  gap-x-6 gap-y-4 py-5 sm:flex-nowrap">
      <div className="flex flex-1">
        <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
      </div>

      <dl className="flex gap-x-8 sm:w-auto items-center">
        <span>{item.status}</span>

        <div className="flex w-16 ">
          <button className="bg-red-600 p-1.5 hover:bg-red-500 rounded-sm" onClick={handleDelete}>
            <TrashIcon className="w-4 h-4 text-white " />
          </button>
        </div>
      </dl>
    </li>
  );
};

export default TodoItem;
