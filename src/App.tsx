import { withAuthenticator } from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { Todo } from "./models";
import { useEffect, useMemo, useState } from "react";
import TodoModal from "./components/TodoModal";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    DataStore.query(Todo).then((todos) => {
      setTodos(todos);
    });

    const subscription = DataStore.observe(Todo).subscribe({
      next: async () => {
        const newTodos = await DataStore.query(Todo);

        setTodos(newTodos);
      },
      error: (e) => {
        console.log(e);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const todoItems = useMemo(() => {
    return todos.map((item) => <TodoItem item={item} key={item.id} />);
  }, [todos]);

  return (
    <div className="w-screen flex flex-row justify-center">
      <div className="max-w-screen-xl flex flex-1 flex-col mt-8">
        <div className="mt-8 flex flex-row w-full justify-between border-b border-gray-200 p-2 items-center">
          <h1 className="text-3xl font-semibold">Todo List</h1>

          <button
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm"
            onClick={() => setModalOpen(true)}
          >
            Add Todo
          </button>
        </div>

        <div className="flex flex-row w-full mt-8">
          <div></div>
          <div className="flex flex-1">
            <ul className="w-full divide-y divide-gray-100">{todoItems}</ul>
          </div>
        </div>
      </div>

      <TodoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default withAuthenticator(App);
