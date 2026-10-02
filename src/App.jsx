import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import SignUpsProvider from './context/SignUpsProvider.jsx'
import Home from './pages/Home/Home.jsx'
import Events from './pages/Events/Events.jsx'
import EventDetails from './pages/EventDetails/EventDetails.jsx'
import Impact from './pages/Impact/Impact.jsx'

export default function App() {
  const { pathname } = useLocation()

  // Start each page at the top instead of keeping the previous scroll position.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <SignUpsProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/impact" element={<Impact />} />
        </Routes>
      </main>
      <Footer />
    </SignUpsProvider>
  )
}
