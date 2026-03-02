import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const studentService = {
    register: (data) => api.post('/students', data),
    getAll: () => api.get('/students'),
    search: (name) => api.get(`/students/search?name=${name}`),
};

export const courseService = {
    add: (data) => api.post('/courses', data),
    getAll: () => api.get('/courses'),
    search: (name) => api.get(`/courses/search?name=${name}`),
};

export const enrollmentService = {
    enroll: (data) => api.post('/enrollments', data),
    withdraw: (id) => api.post(`/enrollments/withdraw/${id}`),
    getAll: () => api.get('/enrollments'),
    getByStudent: (studentId) => api.get(`/enrollments/student/${studentId}`),
    getByCourse: (courseId) => api.get(`/enrollments/course/${courseId}`),
};
