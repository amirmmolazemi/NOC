function TextInput({ name, type, value, setInputs, error }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-4">
      <input
        name={name}
        type={type}
        placeholder={name}
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1 text-left">{error}</p>}
    </div>
  );
}

export default TextInput;
