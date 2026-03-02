import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Card, Spinner, Row, Col, Badge, Alert } from 'react-bootstrap';
import { courseService } from '../services/api';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ 
        courseCode: '', 
        courseName: '', 
        description: '', 
        duration: '',
        fees: 0,
        maxCapacity: 30,
        startDate: '',
        endDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await courseService.getAll();
            setCourses(res.data.data || []);
        } catch (err) { console.error(err); }
        finally { setInitialLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await courseService.add(formData);
            setShowModal(false);
            setFormData({ courseCode: '', courseName: '', description: '', duration: '', fees: 0, maxCapacity: 30, startDate: '', endDate: '' });
            fetchCourses();
        } catch (err) { setError(err.response?.data?.message || err.message); }
        finally { setLoading(false); }
    };

    if (initialLoading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Spinner animation="border" variant="primary" />
        </div>
    );

    return (
        <div className="animate-up">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h2 className="fw-bold mb-1">Course Catalog</h2>
                    <p className="text-muted small">Course management and capacity tracking</p>
                </div>
                <button className="btn-brand" onClick={() => setShowModal(true)}>
                    <i className="bi bi-calendar-plus-fill me-2"></i> ADD COURSE
                </button>
            </div>

            <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: '25px' }}>
                <Table responsive className="table-brand mb-0 align-middle">
                    <thead>
                        <tr>
                            <th>COURSE CODE</th>
                            <th>COURSE NAME</th>
                            <th>DURATION</th>
                            <th>FEES</th>
                            <th>CAPACITY</th>
                            <th>AVAILABLE</th>
                            <th>START DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length > 0 ? courses.map(c => (
                            <tr key={c.id}>
                                <td className="fw-bold font-monospace">{c.courseCode}</td>
                                <td className="fw-bold">{c.courseName}</td>
                                <td className="text-muted">{c.duration}</td>
                                <td className="fw-bold text-dark">${c.fees}</td>
                                <td className="text-muted">{c.maxCapacity}</td>
                                <td>
                                    <Badge bg={c.availableSeats > 0 ? 'success' : 'danger'}>
                                        {c.availableSeats}
                                    </Badge>
                                </td>
                                <td className="text-muted">{c.startDate || 'TBD'}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7" className="text-center py-5 text-muted">No courses available yet.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">Add New Course</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="p-4 bg-light" style={{ borderRadius: '0 0 30px 30px' }}>
                        {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Course Code</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="e.g. CS101" className="form-input-brand shadow-none"
                                        value={formData.courseCode} onChange={e => setFormData({ ...formData, courseCode: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Duration</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="e.g. 3 months" className="form-input-brand shadow-none"
                                        value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted small fw-bold text-uppercase">Course Name</Form.Label>
                            <Form.Control
                                type="text" placeholder="e.g. Introduction to Computer Science" className="form-input-brand shadow-none"
                                value={formData.courseName} onChange={e => setFormData({ ...formData, courseName: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted small fw-bold text-uppercase">Description</Form.Label>
                            <Form.Control
                                as="textarea" rows={2} placeholder="Course description" className="form-input-brand shadow-none"
                                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Course Fees ($)</Form.Label>
                                    <Form.Control
                                        type="number" step="0.01" className="form-input-brand shadow-none"
                                        value={formData.fees} onChange={e => setFormData({ ...formData, fees: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Max Capacity</Form.Label>
                                    <Form.Control
                                        type="number" className="form-input-brand shadow-none"
                                        value={formData.maxCapacity} onChange={e => setFormData({ ...formData, maxCapacity: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Start Date</Form.Label>
                                    <Form.Control
                                        type="date" className="form-input-brand shadow-none"
                                        value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">End Date</Form.Label>
                                    <Form.Control
                                        type="date" className="form-input-brand shadow-none"
                                        value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="text-end mt-4">
                            <Button variant="link" className="text-muted text-decoration-none me-3" onClick={() => setShowModal(false)}>CANCEL</Button>
                            <button type="submit" className="btn-brand" disabled={loading}>
                                {loading ? 'SAVING...' : 'ADD COURSE'}
                            </button>
                        </div>
                    </Modal.Body>
                </Form>
            </Modal>
        </div>
    );
};

export default Courses;
