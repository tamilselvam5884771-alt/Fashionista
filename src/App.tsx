import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui';
import { MainLayout } from './components/layout';
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
} from './pages';

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
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
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
