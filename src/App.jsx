import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import ToastProvider from "./components/UI/Toast";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import { AccessibilityProvider } from "./components/UI/AccessibilityProvider";

// Lazy load components for better performance
const Home = React.lazy(() => import("./pages/Home"));
const CVForm = React.lazy(() => import("./pages/CVForm"));

const App = () => {
  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <div className="min-h-screen bg-gray-50">
          <ToastProvider />
          <main id="main-content" tabIndex={-1}>
            <Suspense 
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <LoadingSpinner size="lg" message="Loading CV Builder..." />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<CVForm />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
};

export default App;
