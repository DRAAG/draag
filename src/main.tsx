import '@vly-ai/integrations';
import { Toaster } from "@/components/ui/sonner";
import { RequireAuth } from "@/components/RequireAuth";
import { StoreLayout } from "@/components/store/StoreLayout";
import { ROUTER_BASENAME } from "@/lib/asset";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React, { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router";
import "./index.css";

// Lazy load route components for better code splitting
const Home = lazy(() => import("./pages/Home.tsx"));
const Category = lazy(() => import("./pages/Category.tsx"));
const Brand = lazy(() => import("./pages/Brand.tsx"));
const Brands = lazy(() => import("./pages/Brands.tsx"));
const Product = lazy(() => import("./pages/Product.tsx"));
const NewArrivals = lazy(() => import("./pages/NewArrivals.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Faq = lazy(() => import("./pages/Faq.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));

// Simple loading fallback for route transitions
function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

/** Silent error boundary — if VlyToolbar crashes it renders nothing instead of
 *  crashing the whole app (e.g. hook errors in the browser runtime). */
class ToolbarErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    console.warn("[VlyToolbar] Caught error, toolbar disabled:", err.message);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/** Hard guard so runtime errors never leave the preview as a blank page. */
class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string; stack: string }
> {
  state = { hasError: false, message: "", stack: "" };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error.message || "Unknown runtime error",
      stack: error.stack || "",
    };
  }
  componentDidCatch(err: Error) {
    console.error("[Preview] Root crash:", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <div className="max-w-lg text-center">
            <p className="text-sm font-semibold">Preview runtime error</p>
            <p className="mt-2 text-xs text-muted-foreground break-words">
              {this.state.message}
            </p>
            {this.state.stack && (
              <pre className="mt-3 text-left text-[10px] leading-4 text-muted-foreground/80 max-h-40 overflow-auto rounded border border-border/60 p-2">
                {this.state.stack}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/** Static hosts (GitHub Pages, a plain folder upload, …) only have a Convex URL
 *  when one is baked in at build time. Without it the account routes stop
 *  working, but the storefront is fully static and must still render. */
const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

/** Stands in for `/auth` and `/dashboard` when no backend URL was configured. */
function AccountsUnavailable() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="max-w-md text-center">
        <p className="eyebrow text-muted-foreground">Accounts</p>
        <h1 className="display mt-3 text-3xl">
          Sign-in isn&apos;t set up on this deployment
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The store works without an account — browse the catalogue and order on
          WhatsApp. Sign-in and the dashboard need a backend URL built into the
          site.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center rounded-sm bg-foreground px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-background transition-colors hover:bg-foreground/85"
        >
          Back to the store
        </Link>
      </div>
    </main>
  );
}



function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}


/** Routed under the deployment's base path so the same build works at `/` in
 *  dev and at `/<repo>/` on GitHub Pages (see `src/lib/asset.ts`). */
function AppRoutes() {
  return (
    <BrowserRouter basename={ROUTER_BASENAME}>
      <RouteSyncer />
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route element={<StoreLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brand/:slug" element={<Brand />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route
            path="/auth"
            element={
              convex ? (
                <AuthPage redirectAfterAuth="/dashboard" />
              ) : (
                <AccountsUnavailable />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              convex ? (
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              ) : (
                <AccountsUnavailable />
              )
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

const app = (
  <>
    <AppRoutes />
    <Toaster />
  </>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <ToolbarErrorBoundary>
        <VlyToolbar />
      </ToolbarErrorBoundary>
      {convex ? (
        <ConvexAuthProvider client={convex}>{app}</ConvexAuthProvider>
      ) : (
        app
      )}
    </RootErrorBoundary>
  </StrictMode>,
);
