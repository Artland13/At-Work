import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.scss";
import { Layout } from "./components/Layout/Layout";
import { Suspense, lazy } from "react";
const Home = lazy(() => import("./pages/Home/Home"));
const EditUser = lazy(() => import("./pages/EditUser/EditUser"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Suspense>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/EditUser/:id" element={<EditUser />} />
              <Route path="/error" element={<p>404 не найдено</p>} />
              <Route path="*" element={<Navigate to="/error" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
