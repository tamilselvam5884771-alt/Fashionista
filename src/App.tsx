import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui';
import { MainLayout, BoutiqueLayout, ProtectedRoute } from './components/layout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { useAuthStore } from './store/useAuthStore';
import {
  Home,
  Explore,
  Design,
  Wedding,
  Profile,
  Wishlist,
  Wallet,
  Login,
  Signup,
  StyleGuide,
  BoutiqueDashboard,
} from './pages';

export function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <ToastProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Customer Application Layout Routes */}
          <Route element={<MainLayout />}>
            {/* Protected Customer Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/design"
              element={
                <ProtectedRoute>
                  <Design />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wedding"
              element={
                <ProtectedRoute>
                  <Wedding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Public Routes */}
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/style-guide" element={<StyleGuide />} />
          </Route>

          {/* Dedicated Boutique Owner Dashboard Route */}
          <Route
            path="/dashboard/*"
            element={
              <BoutiqueLayout>
                <BoutiqueDashboard />
              </BoutiqueLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
