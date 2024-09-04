function Checkbox({ checked, setShowPassword }) {
  return (
    <div className="flex items-center mb-4 mt-6 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setShowPassword((prev) => !prev)}
        className="mr-2 h-4 w-4 text-blue-600 cursor-pointer focus:ring-blue-500 border-gray-300 rounded"
      />
      <label className="text-sm font-medium">Show Password</label>
    </div>
  );
}

export default Checkbox;
