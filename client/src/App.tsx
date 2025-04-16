import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { Cursor } from "@/components/Cursor";
import { useEffect } from "react";
import { ThemeProvider } from "@/lib/theme";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Set page title
    document.title = "Hrishikesh Yadav | AI/ML & UI/UX Developer";
    
    // Disable default cursor on desktop
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (mediaQuery.matches) {
      document.body.style.cursor = "none";
    }
    
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <ThemeProvider>
      <Cursor />
      <Router />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
