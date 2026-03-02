import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Card, Spinner, Row, Col, Alert } from 'react-bootstrap';
import { studentService } from '../services/api';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ 
        studentId: '', 
        firstName: '', 
        lastName: '', 
        email: '', 
        phone: '',
        dateOfBirth: '',
        address: '',
        active: true
    });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await studentService.getAll();
            setStudents(res.data.data || []);
        } catch (err) { console.error(err); }
        finally { setInitialLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await studentService.register(formData);
            setShowModal(false);
            setFormData({ studentId: '', firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', address: '', active: true });
            fetchStudents();
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
                    <h2 className="fw-bold mb-1">Student Directory</h2>
                    <p className="text-muted small">Registered student accounts and profile management</p>
                </div>
                <button className="btn-brand" onClick={() => setShowModal(true)}>
                    <i className="bi bi-person-plus-fill me-2"></i> NEW STUDENT
                </button>
            </div>

            <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: '25px' }}>
                <Table responsive className="table-brand mb-0 align-middle">
                    <thead>
                        <tr>
                            <th>STUDENT ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE</th>
                            <th>DOB</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? students.map(s => (
                            <tr key={s.id}>
                                <td className="fw-bold font-monospace">{s.studentId}</td>
                                <td className="fw-bold">{s.firstName} {s.lastName}</td>
                                <td className="text-muted">{s.email}</td>
                                <td className="text-muted">{s.phone}</td>
                                <td className="text-muted">{s.dateOfBirth || 'N/A'}</td>
                                <td>
                                    <span className={`badge ${s.active ? 'bg-success' : 'bg-secondary'}`}>
                                        {s.active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center py-5 text-muted">No students registered yet.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">Register New Student</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="p-4 bg-light" style={{ borderRadius: '0 0 30px 30px' }}>
                        {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Student ID</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="e.g. BCA001" className="form-input-brand shadow-none"
                                        value={formData.studentId} onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Phone</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="e.g. +1 555-0123" className="form-input-brand shadow-none"
                                        value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">First Name</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="First name" className="form-input-brand shadow-none"
                                        value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Last Name</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="Last name" className="form-input-brand shadow-none"
                                        value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted small fw-bold text-uppercase">Email Address</Form.Label>
                            <Form.Control
                                type="email" placeholder="e.g. name@example.com" className="form-input-brand shadow-none"
                                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date" className="form-input-brand shadow-none"
                                        value={formData.dateOfBirth} onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold text-uppercase">Address</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="Address" className="form-input-brand shadow-none"
                                        value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="text-end mt-4">
                            <button type="submit" className="btn-brand" disabled={loading}>
                                {loading ? 'SAVING...' : 'REGISTER STUDENT'}
                            </button>
                        </div>
                    </Modal.Body>
                </Form>
            </Modal>
        </div>
    );
};

export default Students;
