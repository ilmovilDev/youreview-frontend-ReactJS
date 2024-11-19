type Props = {
  message: string;
};

export const Loading = ({ message }: Props) => (
  <div className="flex justify-center items-center h-48">
    <p className="text-gray-600 font-medium text-lg animate-pulse">{message}</p>
  </div>
);
