import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Toaster } from "sonner";
import ControlLayer from "./layouts/ControlLayer";
import AuthButton from "./components/global/AuthButton";
import Widget from "./components/global/Widget";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <ControlLayer>
        <AuthButton />
        <Widget />
      </ControlLayer>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
