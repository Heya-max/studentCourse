import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { courseService, studentService, enrollmentService } from '../services/api';

const Dashboard = () => {
    const [counts, setCounts] = useState({ courses: 0, students: 0, enrollments: 0 });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [c, s, e] = await Promise.all([
                    courseService.getAll(),
                    studentService.getAll(),
                    enrollmentService.getAll()
                ]);
                setCounts({
                    courses: c.data.data.length,
                    students: s.data.data.length,
                    enrollments: e.data.data.length
                });
            } catch (err) { console.error(err); }
        };
        fetchCounts();
    }, []);

    const cards = [
        { label: 'Courses', value: counts.courses, icon: 'bi-book', color: '#6366f1' },
        { label: 'Students', value: counts.students, icon: 'bi-people', color: '#8b5cf6' },
        { label: 'Enrollments', value: counts.enrollments, icon: 'bi-person-check', color: '#ec4899' }
    ];

    return (
        <div className="animate-up">
            <header className="mb-5 d-flex align-items-center justify-content-between">
                <div>
                    <h2 className="fw-bold mb-1">Dashboard</h2>
                    <p className="text-muted small">Real-time overview of your college course management</p>
                </div>
                <div className="d-flex gap-2">
                    <div className="p-2 bg-white rounded shadow-sm text-center" style={{ width: '100px' }}>
                        <h6 className="small text-muted mb-0">Academic</h6>
                        <span className="fw-bold text-success">2025-26</span>
                    </div>
                </div>
            </header>

            <Row className="g-4 mb-5">
                {cards.map((card, i) => (
                    <Col md={4} key={i}>
                        <Card className="stat-card border-0 h-100">
                            <div className="d-flex align-items-center gap-4">
                                <div className="p-3 rounded-pill bg-light d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px' }}>
                                    <i className={`bi ${card.icon} fs-3`} style={{ color: card.color }}></i>
                                </div>
                                <div className="text-start">
                                    <h3 className="fw-bold mb-0">{card.value}</h3>
                                    <p className="text-muted small m-0 text-uppercase tracking-wider">{card.label}</p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Col lg={12}>
                <Card className="stat-card border-0 shadow-lg" style={{ background: 'var(--accent-gradient)', color: 'white' }}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h4 className="fw-bold mb-2">Welcome to EDUMANAGE!</h4>
                            <p className="mb-0 text-white-50 small">Take complete control over student enrollments and course management.</p>
                        </div>
                        <i className="bi bi-mortarboard d-none d-md-block" style={{ fontSize: '5rem', opacity: '0.2' }}></i>
                    </div>
                </Card>
            </Col>
        </div>
    );
};

export default Dashboard;
