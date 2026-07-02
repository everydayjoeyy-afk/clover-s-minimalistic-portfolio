import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import WritingPage from './pages/WritingPage'
import WritingPostPage from './pages/WritingPostPage'
import WorkPage from './pages/WorkPage'
import SayHiPage from './pages/SayHiPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/writing/:slug" element={<WritingPostPage />} />
          <Route path="/say-hi" element={<SayHiPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
