import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import PageTransition, { TransitionOverlay } from "./components/PageTransition";
import Chatbot from "./components/Chatbot";

// Route-level code splitting — pages are loaded on demand (Issue D fix)
const Home = lazy(() => import("./pages/Home"));
const Institution = lazy(() => import("./pages/Institution"));
const Explore = lazy(() => import("./pages/Explore"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Contest = lazy(() => import("./pages/Contest"));
const Download = lazy(() => import("./pages/Download"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    // TransitionOverlay is a pure component (no hooks) — safe to use as Suspense fallback.
    // PageTransition is mounted at App level to handle click-interceptor navigation overlays.
    <Suspense fallback={<TransitionOverlay />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/institution"} component={Institution} />
        <Route path={"/explore"} component={Explore} />
        <Route path={"/pricing"} component={Pricing} />
        <Route path={"/signup"} component={Signup} />
        <Route path={"/login"} component={Login} />
        <Route path={"/contest"} component={Contest} />
        <Route path={"/download"} component={Download} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          {/* PageTransition handles click-interceptor overlay (conditionally, >100ms only) */}
          <PageTransition />
          <Router />
          <Chatbot />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
