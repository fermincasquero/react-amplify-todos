import React from "react";

interface FilterItem {
  name: string;
  label: string;
}

interface StatusFilterProps {
  items: FilterItem[];
  selected: string[];
  onChange: (selected: string[]) => void;
  name: string;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  items,
  onChange,
  selected,
  name,
}) => {
  const handleItemChange = (itemName: string, isChecked: boolean) => {
    const newSelected = isChecked
      ? [...selected, itemName]
      : selected.filter((item) => item !== itemName);
    onChange(newSelected);
  };

  const handleSelectAll = (isChecked: boolean) => {
    onChange(isChecked ? items.map((item) => item.name) : []);
  };

  const isAllSelected = selected.length === items.length;

  return (
    <fieldset className="mt-4">
      <legend className="text-base font-semibold leading-6 text-green-500">
        {name}
      </legend>
      <div className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
        <CheckboxItem
          label="All"
          checked={isAllSelected}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
        {items.map(({ name: itemName, label }) => (
          <CheckboxItem
            key={itemName}
            id={itemName}
            label={label}
            checked={selected.includes(itemName)}
            onChange={(e) => handleItemChange(itemName, e.target.checked)}
          />
        ))}
      </div>
    </fieldset>
  );
};

interface CheckboxItemProps {
  id?: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  id,
  label,
  checked,
  onChange,
}) => (
  <div className="relative flex items-start py-2">
    <div className="min-w-0 flex-1 text-sm leading-6">
      <label htmlFor={id} className="select-none text-gray-900">
        {label}
      </label>
    </div>
    <div className="ml-3 flex h-6 items-center">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
    </div>
  </div>
);

export default StatusFilter;
