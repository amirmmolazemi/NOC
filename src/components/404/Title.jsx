function Title({ darkMode, text }) {
  return (
    <h1
      className={`text-6xl md:text-8xl font-bold mb-4 ${
        darkMode ? "text-accent-light" : "text-accent"
      }`}
    >
      {text}
    </h1>
  );
}

export default Title;
