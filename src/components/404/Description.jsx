function Description({ subtitle, message }) {
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">{subtitle}</h2>
      <p className="text-lg md:text-xl mb-8 font-semibold">{message}</p>
    </>
  );
}

export default Description;
