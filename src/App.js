import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer'
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Navbar />
        <Container customClass="min_height">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/company" element={<Company />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/new-project" element={<NewProject />} />
            <Route path="/projects/:id" element={<Project />} />
          </Routes>
        </Container>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
