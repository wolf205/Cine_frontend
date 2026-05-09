import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
  size = "md",
  color = "text-green-500",
  className = "",
}) => {
  // Cấu hình kích thước linh hoạt
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2
        className={`animate-spin ${sizeClasses[size] || sizeClasses.md} ${color}`}
      />
    </div>
  );
};

export default LoadingSpinner;
