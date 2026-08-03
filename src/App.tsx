import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui';
import { MainLayout, BoutiqueLayout } from './components/layout';
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
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Customer Application Layout Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/design" element={<Design />} />
            <Route path="/wedding" element={<Wedding />} />
            <Route path="/profile" element={<Profile />} />
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
