import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'

import ProjectDetails from './pages/ProjectDetails'
import ProjectStats from './pages/ProjectStats'
import ProjectTasks from './pages/ProjectTasks'

import ReportsList from './pages/ReportsList'
import ReportProject from './pages/ReportProject'
import ReportTasks from './pages/ReportTasks'
import ReportTeam from './pages/ReportTeam'
import ReportCustom from './pages/ReportCustom'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/projects'
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path='/projects/:id'
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path='/projects/:id/stats'
            element={
              <ProtectedRoute>
                <ProjectStats />
              </ProtectedRoute>
            }
          />
          <Route
            path='/projects/:id/tasks'
            element={
              <ProtectedRoute>
                <ProjectTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path='/projects/:id/reports'
            element={
              <ProtectedRoute>
                <ReportsList />
              </ProtectedRoute>
            }
          />
          <Route
            path='/projects/:id/reports/project'
            element={
              <ProtectedRoute>
                <ReportProject />
              </ProtectedRoute>
            }
          />
          <Route
            path='/projects/:id/reports/tasks'
            element={
              <ProtectedRoute>
                <ReportTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path='/projects/:id/reports/team'
            element={
              <ProtectedRoute>
                <ReportTeam />
              </ProtectedRoute>
            }
          />
          <Route
            path='/projects/:id/reports/custom'
            element={
              <ProtectedRoute>
                <ReportCustom />
              </ProtectedRoute>
            }
          />

          <Route path='/' element={<Navigate to='/dashboard' replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
