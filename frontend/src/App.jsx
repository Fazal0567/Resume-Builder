import { ThemeProvider } from '@/components/theme-provider'
import "./App.css"
import Navbar from './components/custom/Navbar'
import { Toaster } from "@/components/ui/sonner"
import Home from './pages/Home'
import Footer from './components/custom/Footer'
import { createBrowserRouter } from 'react-router-dom'
import Profile from './pages/Profile'
import { RouterProvider } from 'react-router'
import { ResumeDialogProvider } from './contexts/ResumeDialogContext'
import EditResume from './pages/EditResume'
import NotFound from './pages/NotFound'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <Navbar />
        <Home/>
        <Footer />
      </>
    },
    {
      path: "/profile",
      element: <>
       <Navbar />
        <Profile/>
        <Footer />
      </>
    },
     {
      path: "/resume/edit/:id",
      element: <>
       <Navbar />
        <EditResume/>
        <Footer />
      </>
    },
    {
      path: "/*",
      element: <>
       <Navbar />
        <NotFound/>
        <Footer />
      </>
    },

  ])
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ResumeDialogProvider>
      
        <RouterProvider router={router} />
        
        <Toaster />
      </ResumeDialogProvider>
    </ThemeProvider>
  )
}

export default App