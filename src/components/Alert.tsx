type PrompsAlert = {
  message: string;
};

export const Alert = ({ message }: PrompsAlert) => {
  return (
    <p className="text-red-500 text-center bg-red-100 border border-red-300 p-2 rounded-md animate-fade-in">
      {message}
    </p>
  );
};
