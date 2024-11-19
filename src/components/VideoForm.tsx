import { useForm } from "react-hook-form";
import { FormValues } from "../types";
import { Alert } from "./Alert";

type VideoFormProps = {
  onSubmit: (url: string) => Promise<void>;
  loading: boolean
};

export const VideoForm = ({ onSubmit, loading }: VideoFormProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

  const handleFormSubmit = async (data: FormValues) => {
    await onSubmit(data.url);
    reset();
  };

  return (
    <section 
      className="bg-white p-6 shadow-md rounded-md space-y-4"
    >

      <label 
        htmlFor="video_url" 
        className="text-lg md:text-xl font-semibold text-gray-700 block"
      >
        Enter the video URL
      </label>

      <form 
        className="flex flex-col gap-4 md:flex-row" 
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        
        <input
          id="video_url"
          type="url"
          placeholder="https://www.youtube.com/watch?v=example"
          className="w-full md:flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600"
          {...register("url", { required: "URL is required." })}
        />

        <button
            type="submit"
            className={`px-4 py-2 tracking-wide rounded-md w-full md:w-auto focus:outline-none whitespace-nowrap focus:ring-2 ${
              loading
                ? "bg-sky-700 text-white cursor-wait"
                : "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500"
            }`}
            aria-label="Generate Summary"
            disabled={loading}
          >
            {loading ? "Generating summary ..." : "Generate Summary"}
        </button>

      </form>

      {errors.url && <Alert message={errors.url?.message ?? ""} />}

    </section>
  );
};
