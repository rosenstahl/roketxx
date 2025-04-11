// src/App.jsx
import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Analytics from '@/components/common/Analytics';
import { initErrorTracking } from '@/utils/errorTracking';
import { reportWebVitals, measurePerformance } from '@/utils/performance';
import Navigation from '@/components/sections/Navigation/Navigation';
import Footer from '@/components/sections/Footer';
import CookieConsent from '@/components/common/CookieConsent';

// Lazy loaded sections
const Hero = lazy(() => import('@/components/sections/Hero'));
const Stats = lazy(() => import('@/components/sections/Stats'));
const About = lazy(() => import('@/components/sections/About'));
const Support = lazy(() => import('@/components/sections/Support'));
const Testimonials = lazy(() => import('@/components/sections/Testimonials'));
const FAQ = lazy(() => import('@/components/sections/FAQ'));
const Contact = lazy(() => import('@/components/sections/Contact'));
const PackageComparison = lazy(() => import('@/components/sections/PackageComparison'));

// Lazy loaded pages
const ContactPage = lazy(() => import('@/components/sections/Contact/ContactPage'));
const Impressum = lazy(() => import('@/pages/Impressum'));
const Datenschutz = lazy(() => import('@/pages/Datenschutz'));
const AGB = lazy(() => import('@/pages/AGB'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading spinner component
const LoadingSpinner = () => (
 <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
 </div>
);

// ScrollToTop component
const ScrollToTop = () => {
 const { pathname } = useLocation();
 
 useEffect(() => {
   window.scrollTo(0, 0);
 }, [pathname]);

 return null;
};

// HomePage component
const HomePage = () => (
 <main>
   <Suspense fallback={<LoadingSpinner />}>
     <Hero />
   </Suspense>
   <Suspense fallback={<LoadingSpinner />}>
     <Stats />
   </Suspense>
   <Suspense fallback={<LoadingSpinner />}>
     <About />
   </Suspense>
   <Suspense fallback={<LoadingSpinner />}>
     <PackageComparison />
   </Suspense>
   <Suspense fallback={<LoadingSpinner />}>
     <Support />
   </Suspense>
   <Suspense fallback={<LoadingSpinner />}>
     <Testimonials />
   </Suspense>
   <Suspense fallback={<LoadingSpinner />}>
     <FAQ />
   </Suspense>
   <Suspense fallback={<LoadingSpinner />}>
     <Contact />
   </Suspense>
 </main>
);

// Main App component
const App = () => {
 const [isPageLoading, setIsPageLoading] = useState(false);

 // Initialize error tracking
 useEffect(() => {
   initErrorTracking();
 }, []);

 // Initialize performance monitoring
 useEffect(() => {
   reportWebVitals();
   measurePerformance();
 }, []);

 // Preload critical components
 useEffect(() => {
   const preloadComponents = async () => {
     try {
       setIsPageLoading(true);
       await Promise.all([
         import('@/components/sections/Hero'),
         import('@/components/sections/About'),
         import('@/components/sections/PackageComparison')
       ]);
     } catch (error) {
       console.error('Preloading failed:', error);
     } finally {
       setIsPageLoading(false);
     }
   };

   preloadComponents();
 }, []);

 return (
   <Router>
     <Analytics />
     <Navigation />
     <div className="min-h-screen bg-background flex flex-col">
       <ScrollToTop />
       {isPageLoading && <LoadingSpinner />}
       
       <AnimatePresence mode="wait">
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route 
             path="/kontakt" 
             element={
               <Suspense fallback={<LoadingSpinner />}>
                 <ContactPage />
               </Suspense>
             } 
           />
           <Route 
             path="/impressum" 
             element={
               <Suspense fallback={<LoadingSpinner />}>
                 <Impressum />
               </Suspense>
             } 
           />
           <Route 
             path="/datenschutz" 
             element={
               <Suspense fallback={<LoadingSpinner />}>
                 <Datenschutz />
               </Suspense>
             } 
           />
           <Route 
             path="/agb" 
             element={
               <Suspense fallback={<LoadingSpinner />}>
                 <AGB />
               </Suspense>
             } 
           />
           <Route 
             path="*" 
             element={
               <Suspense fallback={<LoadingSpinner />}>
                 <NotFound />
               </Suspense>
             } 
           />
         </Routes>
       </AnimatePresence>
       
       <Footer />
       <CookieConsent />
     </div>
   </Router>
 );
};

export default App;