const Button = ({ children, type }) => {
  return (
    <button
      type={type}
      className="btn-primary w-full py-3 text-lg rounded-lg shadow-primary-glow active:scale-[0.98] transition-all"
    >
      {children}
    </button>
  );
};

export default Button;
