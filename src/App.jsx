import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DetailPage from './pages/DetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<DetailPage type="project" />} />
      <Route path="/internship/:slug" element={<DetailPage type="internship" />} />
    </Routes>
  )
}
