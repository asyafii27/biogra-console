import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BiographyList from './pages/BiographyList';
import BiographyDetail from './pages/BiographyDetail';
import BiographyForm from './pages/BiographyForm';
import '@mantine/core/styles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BiographyList />} />
          <Route path="biography/create" element={<BiographyForm />} />
          <Route path="biography/edit/:id" element={<BiographyForm />} />
          <Route path="biography/:id" element={<BiographyDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
