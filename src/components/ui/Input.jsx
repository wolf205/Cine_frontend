import { forwardRef } from "react";

const Input = forwardRef(({ type, placeholder, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      {...props}
      className="w-full px-4 py-3 bg-background-card border border-white/10 rounded-lg text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300"
    />
  );
});

Input.displayName = "Input";

export default Input;
