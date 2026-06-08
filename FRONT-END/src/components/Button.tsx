type ButtonType = {
    title: string;
    variant?: "default" | "outline";
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>


const Button = ({ title, variant="default", ...props }:ButtonType) => {
    const buttonVariant = () => {
        if(variant === "default"){
            return "h-[33px] w-full cursor-pointer rounded-md bg-[#C92A0E] text-sm font-semibold text-white"
        } else if(variant === "outline") 
            return "h-[33px] w-full cursor-pointer rounded-md border-2 border-[#C92A0E] bg-white text-sm font-semibold text-[#C92A0E]";
        
    }

  return (
    <button className={buttonVariant()} {...props}>
      {title}
    </button>
  );
};

export default Button;
