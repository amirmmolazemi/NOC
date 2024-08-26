function Checkbox({ id, label, checked, onChange }) {
  return (
    <div className="flex items-center mb-4 mt-6">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
