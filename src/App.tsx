import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import BiographyList from './pages/BiographyList';
import BiographyDetail from './pages/BiographyDetail';
import BiographyForm from './pages/BiographyForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExperiencePage from './pages/ExperiencePage';
import AwardeePage from './pages/AwardeePage';
import OrganizationPage from './pages/OrganizationPage';
import SkillsPage from './pages/SkillsPage';
import TechnicalExperiencePage from './pages/TechnicalExperiencePage';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<Layout />}>
          <Route index element={<BiographyList />} />
          <Route path="create" element={<BiographyForm />} />
          <Route path="edit/:id" element={<BiographyForm />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="awardee" element={<AwardeePage />} />
          <Route path="organization" element={<OrganizationPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="technical-experience" element={<TechnicalExperiencePage />} />
          <Route path=":id" element={<BiographyDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
