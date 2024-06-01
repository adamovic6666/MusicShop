import { BackdropProps } from "@/app/_types/Index";

const Backdrop = ({ children, onClose }: BackdropProps) => {
  return (
    <div className="backdrop" onClickCapture={onClose}>
      {children}
    </div>
  );
};

export default Backdrop;
