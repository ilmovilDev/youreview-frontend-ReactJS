import { useEffect, useRef, useState } from "react";
import { api } from "../config";
import { DataResponse } from "../types";
import { Alert } from "./Alert";

interface VideoSummaryProps {
  data: DataResponse;
}

export const VideoSummary = ({ data }: VideoSummaryProps) => {
  const [loading, setLoading] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (error) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setError(null);
      }, 4000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [error]);

  const downloadAudio = async (link: string) => {
    try {
      setLoading(true);
      const response = await api(link, { responseType: "blob" });
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "audio.mp3";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setIsDownloaded(true);
    } catch (error) {
      setError("There was an error while trying to download the audio.");
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsToggle = () => {
    setIsDetailsOpen((prev) => !prev);
  };

  return (
    <section className="bg-white p-6 shadow-md rounded-md mx-auto space-y-6">
      {/* Thumbnail Image */}
      <div className="mb-4">
        <img
          src={data.thumbnail}
          alt="Video Thumbnail"
          className="w-full h-auto rounded-md"
        />
      </div>

      {error && <Alert message={error} />}

      {/* Video Information */}
      <div className="space-y-4 text-gray-800">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center">{data.title}</h2>

        {/* Channel */}
        <p className="text-sm text-gray-600 text-center mb-4">
          Posted by: <span className="font-medium">{data.channel}</span>
        </p>

        {/* Summary */}
        <div>
          {/* Render HTML Summary */}
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.summary }}
          />
        </div>

        {/* Original Transcript and Download */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <details
            className="w-full md:w-auto cursor-pointer p-3"
            onToggle={handleDetailsToggle}
          >
            <summary className="text-sky-600 hover:text-sky-800">
              Show original text
            </summary>
            <p className="mt-2 text-gray-600">{data.transcription}</p>
          </details>

          {/* Audio Download Button */}
          {!isDetailsOpen && !isDownloaded && (
            <button
              onClick={() => downloadAudio(data.audio_download_link)}
              className={`px-4 py-2 rounded-md w-full md:w-auto focus:outline-none focus:ring-2 ${
                loading
                  ? "bg-sky-700 text-white cursor-wait"
                  : "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500"
              }`}
              disabled={loading}
            >
              {loading ? "Downloading..." : "Download Audio"}
            </button>
          )}
        </div>
        
      </div>
    </section>
  );
};

