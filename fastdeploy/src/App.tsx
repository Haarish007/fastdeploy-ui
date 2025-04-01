import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import Routing from "./pages/Routing/Routing";

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });


  return (
    <MantineProvider  stylesTransform={emotionTransform}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <MantineEmotionProvider>
        <QueryClientProvider client={queryClient}>
          <Routing />
        </QueryClientProvider>
      </MantineEmotionProvider>
    </MantineProvider>
  );
}

export default App;
