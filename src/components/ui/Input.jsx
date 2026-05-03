const Input = ({ type, required, placeholder }) => {
  return (
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-background-light border border-white/10 rounded-xl text-text-main focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all duration-300"
    />
  );
};

export default Input;
