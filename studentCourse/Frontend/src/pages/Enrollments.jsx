import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Alert, Table, Badge, Button, Spinner } from 'react-bootstrap';
import { enrollmentService, courseService, studentService } from '../services/api';

const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [filteredEnrollments, setFilteredEnrollments] = useState([]);
    const [filters, setFilters] = useState({ courseId: '', studentId: '' });
    const [formData, setFormData] = useState({ studentId: '', courseCode: '' });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        refreshData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, enrollments]);

    const refreshData = async () => {
        try {
            const [eRes, cRes, sRes] = await Promise.all([
                enrollmentService.getAll(),
                courseService.getAll(),
                studentService.getAll()
            ]);
            setEnrollments(eRes.data.data || []);
            setCourses(cRes.data.data || []);
            setStudents(sRes.data.data || []);
        } catch (err) { console.error(err); }
        finally { setInitialLoading(false); }
    };

    const applyFilters = () => {
        let filtered = [...enrollments];
        if (filters.courseId) {
            filtered = filtered.filter(e => e.courseId === filters.courseId);
        }
        if (filters.studentId) {
            filtered = filtered.filter(e => e.studentId === filters.studentId);
        }
        setFilteredEnrollments(filtered);
    };

    const handleEnroll = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await enrollmentService.enroll(formData);
            setSuccess("Student enrolled successfully!");
            setFormData({ studentId: '', courseCode: '' });
            refreshData();
        } catch (err) { setError(err.response?.data?.message || err.message); }
        finally { setLoading(false); }
    };

    const handleWithdraw = async (id) => {
        if (window.confirm("Confirm withdrawal?")) {
            try {
                await enrollmentService.withdraw(id);
                setSuccess("Enrollment withdrawn successfully!");
                refreshData();
            } catch (err) { setError(err.response?.data?.message || err.message); }
        }
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
                    <h2 className="fw-bold mb-1">Enrollments</h2>
                    <p className="text-muted small">Student course enrollment management</p>
                </div>
            </div>

            <Row className="mb-4">
                <Col md={12}>
                    <Card className="border-0 shadow-sm" style={{ borderRadius: '25px' }}>
                        <Card.Body className="p-4">
                            <h5 className="fw-bold mb-3">New Enrollment</h5>
                            {error && <Alert variant="danger" className="py-2">{error}</Alert>}
                            {success && <Alert variant="success" className="py-2">{success}</Alert>}
                            <Form onSubmit={handleEnroll}>
                                <Row>
                                    <Col md={5}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="text-muted small fw-bold text-uppercase">Select Student</Form.Label>
                                            <Form.Select 
                                                className="form-input-brand shadow-none"
                                                value={formData.studentId}
                                                onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                                                required
                                            >
                                                <option value="">Choose a student...</option>
                                                {students.map(s => (
                                                    <option key={s.id} value={s.id}>{s.studentId} - {s.firstName} {s.lastName}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={5}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="text-muted small fw-bold text-uppercase">Select Course</Form.Label>
                                            <Form.Select 
                                                className="form-input-brand shadow-none"
                                                value={formData.courseCode}
                                                onChange={e => setFormData({ ...formData, courseCode: e.target.value })}
                                                required
                                            >
                                                <option value="">Choose a course...</option>
                                                {courses.map(c => (
                                                    <option key={c.id} value={c.courseCode}>
                                                        {c.courseCode} - {c.courseName} (${c.fees})
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <div className="d-flex align-items-end h-100">
                                            <button type="submit" className="btn-brand w-100" disabled={loading}>
                                                {loading ? '...' : 'ENROLL'}
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: '25px' }}>
                        <div className="p-3 border-bottom">
                            <Row>
                                <Col md={5}>
                                    <Form.Group className="mb-0">
                                        <Form.Select 
                                            className="form-input-brand shadow-none"
                                            value={filters.courseId}
                                            onChange={e => setFilters({ ...filters, courseId: e.target.value })}
                                        >
                                            <option value="">All Courses</option>
                                            {courses.map(c => (
                                                <option key={c.id} value={c.id}>{c.courseCode} - {c.courseName}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group className="mb-0">
                                        <Form.Select 
                                            className="form-input-brand shadow-none"
                                            value={filters.studentId}
                                            onChange={e => setFilters({ ...filters, studentId: e.target.value })}
                                        >
                                            <option value="">All Students</option>
                                            {students.map(s => (
                                                <option key={s.id} value={s.id}>{s.studentId} - {s.firstName} {s.lastName}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                        <Table responsive className="table-brand mb-0 align-middle">
                            <thead>
                                <tr>
                                    <th>STUDENT</th>
                                    <th>COURSE</th>
                                    <th>ENROLLMENT DATE</th>
                                    <th>FEES</th>
                                    <th>STATUS</th>
                                    <th>PAYMENT</th>
                                    <th className="text-end">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEnrollments.length > 0 ? filteredEnrollments.map(e => (
                                    <tr key={e.id}>
                                        <td className="fw-bold text-dark">{e.studentName}</td>
                                        <td className="small text-muted font-monospace">{e.courseCode} - {e.courseName}</td>
                                        <td className="text-muted">{e.enrollmentDate}</td>
                                        <td className="text-dark fw-bold">${e.feesPaid}</td>
                                        <td>
                                            <span className={`status-badge ${e.status === 'ENROLLED' ? 'badge-confirm' : 'badge-cancel'}`}>
                                                {e.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Badge bg={e.paymentStatus === 'PAID' ? 'success' : e.paymentStatus === 'PENDING' ? 'warning' : 'secondary'}>
                                                {e.paymentStatus}
                                            </Badge>
                                        </td>
                                        <td className="text-end">
                                            {e.status === 'ENROLLED' && (
                                                <Button variant="link" className="text-danger p-0" title="Withdraw" onClick={() => handleWithdraw(e.id)}>
                                                    <i className="bi bi-x-circle-fill fs-5"></i>
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5 text-muted small">No enrollment records found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Enrollments;
