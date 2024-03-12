import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Container from './components/layout/Container';

function App() {
  return (
    <div className="App">
      <p>Costs</p>

      <BrowserRouter>
        <div>
          <Link to="/">Home</Link>
          <Link to="/company">Company</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/new-project">New Project</Link>
        </div>

        <Container customClass="min_height">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/new-project" element={<NewProject />} />
          </Routes>
        </Container>
      </BrowserRouter>

      <div>
        <p>Footer</p>
      </div>

    </div>
  );
}

export default App;
