const Error = ({ error }: { error: string | null | undefined }) => {
  return error ? (
      <div className="border-2 border-danger rounded-md text-danger p-1 text-center">
        <p>{error}</p>
      </div>
  ) : null;
};

export default Error;
