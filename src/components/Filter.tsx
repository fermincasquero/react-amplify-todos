import { ChangeEvent } from "react";

interface IProps {
  items: Array<{ name: string; label: string }>;
  selected: string[];
  onChange: (selected: string[]) => void;
  name: string;
}

const StatusFilter: React.FC<IProps> = ({ items, onChange, selected, name }) => {
  const handleSelectedChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange([...selected, name]);
    } else {
      onChange(selected.filter((item) => name !== item));
    }
  };

  const handleCheckedAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange(items.map(({ name }) => name));
    } else {
      onChange([]);
    }
  };

  return (
    <fieldset className="mt-4">
      <legend className="text-base font-semibold leading-6 text-green-500">{name}</legend>
      <div className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
        <div className="relative flex items-start py-2">
          <div className="min-w-0 flex-1 text-sm leading-6">
            <label className="select-none text-gray-900">All</label>
          </div>
          <div className="ml-3 flex h-6 items-center">
            <input
              type="checkbox"
              onChange={handleCheckedAllChange}
              checked={selected.length === items.length}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
        </div>
        {items.map(({ name, label }) => (
          <div key={name} className="relative flex items-start py-2">
            <div className="min-w-0 flex-1 text-sm leading-6">
              <label htmlFor={name} className="select-none text-gray-900">
                {label}
              </label>
            </div>
            <div className="ml-3 flex h-6 items-center">
              <input
                id={name}
                name={name}
                type="checkbox"
                checked={selected.includes(name)}
                onChange={handleSelectedChange(name)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default StatusFilter;
