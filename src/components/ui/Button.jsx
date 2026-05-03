const Button = ({ children, type }) => {
  return (
    <button type={type} className="btn-neon w-full py-3 text-lg">
      {children}
    </button>
  );
};

export default Button;
