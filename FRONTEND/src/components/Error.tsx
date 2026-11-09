import {CircleAlert} from "lucide-react";

const Error = ({ error }: { error: string | null | undefined }) => {
  return error ? (
      <div className="flex flex-row items-center justify-items-start text-danger p-1 text-start">
        <CircleAlert className="mr-1 inline h-4 w-4" />
        <p>{error}</p>
      </div>
  ) : null;
};

export default Error;
