// import { useEffect, useRef, useState } from "react";
// import { Header, VideoForm, VideoSummary, Loading, EmptyStateMessage, Footer, Alert } from "./components";
// import { api } from "./config";
// import { DataResponse } from "./types";

// import "./App.css";

// function App() {
//   const [state, setState] = useState<{
//     loading: boolean;
//     data: DataResponse | null;
//     error: string | null;
//   }>({
//     loading: false,
//     data: null,
//     error: null,
//   });

//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (state.error) {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//       timeoutRef.current = setTimeout(() => {
//         setState((prev) => ({ ...prev, error: null }));
//       }, 4000);
//     }
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current); // Limpieza al desmontar
//     };
//   }, [state.error]);
  
//   const handleFormSubmit = async (url: string) => {
//     setState((prev) => ({ ...prev, loading: true, error: null }));
//     try {
//       const response = await api.post("/generate_video_summary", { url });
//       setState({ loading: false, data: response.data, error: null });
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
//       setState({ loading: false, data: null, error: errorMessage });
//     }
//   };

//   const renderContent = () => {
//     if (state.loading) return <Loading message="Generating summary, please wait..." />;
//     if (state.error) return <Alert message={state.error} />;
//     if (state.data) return <VideoSummary data={state.data} />;
//     return <EmptyStateMessage />;
//   };
  
//   return (
//     <div 
//       className="container mx-auto max-w-screen-lg px-4 py-2 flex flex-col space-y-6 min-h-screen"
//     >
      
//       {/* Header */}
//       <Header />

//       {/* Main content */}
//       <main 
//         className="flex-grow space-y-4"
//       >
//         <VideoForm onSubmit={handleFormSubmit} loading={state.loading} />
//         {renderContent()}
//       </main>

//       {/* Footer */}
//       <Footer />
      
//     </div>
//   );

// }

// export default App;

import { useEffect, useRef, useState } from "react";
import { Header, VideoForm, VideoSummary, Loading, EmptyStateMessage, Footer, Alert } from "./components";
import { api } from "./config";
import { DataResponse } from "./types";

import "./App.css";

function App() {
  const [state, setState] = useState<{
    loading: boolean;
    data: DataResponse | null;
    error: string | null;
  }>({
    loading: false,
    data: null,
    error: null,
  });

  const [formVisible, setFormVisible] = useState(true); // Estado para controlar visibilidad del formulario
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state.error) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setState((prev) => ({ ...prev, error: null }));
      }, 4000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [state.error]);

  const handleFormSubmit = async (url: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await api.post("/generate_video_summary", { url });
      setState({ loading: false, data: response.data, error: null });
      setFormVisible(false); // Ocultar formulario
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      setState({ loading: false, data: null, error: errorMessage });
    }
  };

  const handleReset = () => {
    setState({ loading: false, data: null, error: null });
    setFormVisible(true); // Mostrar formulario nuevamente
  };

  const renderContent = () => {
    if (state.loading) return <Loading message="Generating summary, please wait..." />;
    if (state.error) return <Alert message={state.error} />;
    if (state.data) {
      return (
        <>
          <button
            onClick={handleReset}
            className="text-sky-600 font-semibold text-lg hover:underline"
          >
            Generate a new summary
          </button>
          <VideoSummary data={state.data} />
        </>
      );
    }
    return <EmptyStateMessage />;
  };

  return (
    <div className="container mx-auto max-w-screen-lg px-4 py-2 flex flex-col space-y-6 min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-grow space-y-4">
        {formVisible && <VideoForm onSubmit={handleFormSubmit} loading={state.loading} />}
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

