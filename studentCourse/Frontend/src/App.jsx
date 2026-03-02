import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Container, Button, Navbar, Offcanvas } from 'react-bootstrap';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Enrollments from './pages/Enrollments';

const App = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <Router>
            {/* Sidebar Desktop */}
            <aside className="sidebar d-none d-lg-block">
                <LogoSection />
                <NavigationLinks />
                <SidebarFooter />
            </aside>

            {/* Navbar Mobile only */}
            <Navbar bg="white" className="d-lg-none px-3 shadow-sm sticky-top">
                <Button variant="link" className="p-0 me-3 text-dark" onClick={() => setShowSidebar(true)}>
                    <i className="bi bi-list fs-2"></i>
                </Button>
                <Navbar.Brand className="fw-bold">EDUMANAGE</Navbar.Brand>
            </Navbar>

            {/* Sidebar Mobile (Offcanvas) */}
            <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} className="sidebar p-0 scroll-hidden" style={{ width: '280px', border: 'none' }}>
                <Offcanvas.Body className="p-0">
                    <div className="p-4">
                        <LogoSection />
                        <div className="mt-5">
                            <NavigationLinks onLinkClick={() => setShowSidebar(false)} />
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            <main className="main-content">
                <div className="animate-up">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/students" element={<Students />} />
                        <Route path="/enrollments" element={<Enrollments />} />
                    </Routes>
                </div>
            </main>
        </Router>
    );
};

const LogoSection = () => (
    <div className="text-center mb-5 px-3">
        <div className="p-3 rounded-circle bg-white d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{ width: '60px', height: '60px' }}>
            <i className="bi bi-mortarboard-fill fs-3 text-primary"></i>
        </div>
        <h4 className="fw-bold mb-0">EDUMANAGE</h4>
        <small style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: '700' }}>COLLEGE_ADMIN</small>
    </div>
);

const NavigationLinks = ({ onLinkClick }) => (
    <nav className="nav flex-column gap-2 px-3">
        <NavLink to="/" className={({ isActive }) => `nav-link-side ${isActive ? 'active' : ''}`} onClick={onLinkClick}>
            <i className="bi bi-columns-gap"></i> Dashboard
        </NavLink>
        <NavLink to="/courses" className={({ isActive }) => `nav-link-side ${isActive ? 'active' : ''}`} onClick={onLinkClick}>
            <i className="bi bi-book"></i> Courses
        </NavLink>
        <NavLink to="/students" className={({ isActive }) => `nav-link-side ${isActive ? 'active' : ''}`} onClick={onLinkClick}>
            <i className="bi bi-people"></i> Students
        </NavLink>
        <NavLink to="/enrollments" className={({ isActive }) => `nav-link-side ${isActive ? 'active' : ''}`} onClick={onLinkClick}>
            <i className="bi bi-person-check"></i> Enrollments
        </NavLink>
    </nav>
);

const SidebarFooter = () => (
    <div className="position-absolute bottom-0 start-0 w-100 p-4 border-top border-secondary border-opacity-10 mt-auto">
        <div className="d-flex align-items-center gap-3 mb-3">
            <div className="p-2 bg-secondary bg-opacity-10 rounded text-muted">
                <i className="bi bi-gear"></i>
            </div>
            <span className="small text-muted">System Settings</span>
        </div>
        <p className="small text-muted mb-0" style={{ fontSize: '0.65rem' }}>&copy; 2026 EDUMANAGE INC.</p>
    </div>
);

export default App;
