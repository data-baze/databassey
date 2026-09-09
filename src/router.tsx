import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/layouts/Layout';
import Home from './screens/home/Home';
import About from './screens/about/About';
import Contact from './screens/contact/Contact';
import Work from './screens/work/Work';
import Project from './screens/work/Project';
import Cv from './screens/cv/Cv';
import NotFound from './screens/not-found/NotFound';
const Blog = lazy(() => import('./screens/blog/Blog'));
const Article = lazy(() => import('./screens/blog/Article'));
const Studio = lazy(() => import('./screens/blog/Studio'));
const loading = <p className="container section" role="status">Loading…</p>;

export const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <Home /> },
    { path: 'work', element: <Work /> },
    { path: 'work/:slug', element: <Project /> },
    { path: 'about', element: <About /> },
    { path: 'blog', element: <Suspense fallback={loading}><Blog /></Suspense> },
    { path: 'blog/:slug', element: <Suspense fallback={loading}><Article /></Suspense> },
    { path: 'studio', element: <Suspense fallback={loading}><Studio /></Suspense> },
    { path: 'resume', element: <Cv /> },
    { path: 'cv', element: <Navigate to="/resume" replace /> },
    { path: 'contact', element: <Contact /> },
    { path: 'services', element: <Navigate to="/contact" replace /> },
    { path: '*', element: <NotFound /> },
  ],
}]);
