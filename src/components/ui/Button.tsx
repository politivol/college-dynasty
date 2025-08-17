import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonStyles = cva("px-4 py-2 rounded", {
  variants: {
    variant: {
      default: "bg-gray-200",
      primary: "bg-blue-500 text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonStyles>;

export function Button({ className, variant, ...props }: ButtonProps) {
  return <button className={cn(buttonStyles({ variant }), className)} {...props} />;
}
export default Button;
