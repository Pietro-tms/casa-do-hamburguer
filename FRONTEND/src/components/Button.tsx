type ButtonType = {
    title: string;
    variant?: "default" | "outline";
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>


const Button = ({ title, variant="default", ...props }:ButtonType) => {
    const buttonVariant = () => {
        if(variant === "default"){
            return "h-[33px] w-full cursor-pointer rounded-md bg-action text-sm font-semibold text-content-inverse"
        } else if(variant === "outline") 
            return "h-[33px] w-full cursor-pointer rounded-md border-2 border-secondary bg-surface text-sm font-semibold text-secondary";
        
    }

  return (
    <button className={buttonVariant()} {...props}>
      {title}
    </button>
  );
};

export default Button;
