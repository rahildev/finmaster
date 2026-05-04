import axios from 'axios';
import type { HeroSection, TeacherInfo, Course, Video, Faq, Contact } from '@/types/landing';

/**
 * Admin API Service
 * CRUD əməliyyatları üçün backend ilə əlaqə
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const adminClient = axios.create({
  baseURL: `${API_BASE_URL}/api/admin`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const uploadClient = axios.create({
  baseURL: `${API_BASE_URL}/api/admin`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

function attachToken(config: any) {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
}

adminClient.interceptors.request.use(attachToken);
uploadClient.interceptors.request.use(attachToken);

// ==================== HERO SECTIONS ====================

export const getHeroSections = async (): Promise<HeroSection[]> => {
  const response = await adminClient.get('/hero');
  return response.data;
};

export const createHeroSection = async (data: Partial<HeroSection>): Promise<HeroSection> => {
  const response = await adminClient.post('/hero', data);
  return response.data;
};

export const updateHeroSection = async (id: number, data: Partial<HeroSection>): Promise<HeroSection> => {
  const response = await adminClient.put(`/hero/${id}`, data);
  return response.data;
};

export const deleteHeroSection = async (id: number): Promise<void> => {
  await adminClient.delete(`/hero/${id}`);
};

// ==================== TEACHER INFO ====================

export const getTeachers = async (): Promise<TeacherInfo[]> => {
  const response = await adminClient.get('/teacher');
  return response.data;
};

export const getTeacher = async (id: number): Promise<TeacherInfo> => {
  const response = await adminClient.get(`/teacher/${id}`);
  return response.data;
};

export const createTeacher = async (formData: FormData): Promise<TeacherInfo> => {
  const response = await uploadClient.post('/teacher', formData);
  return response.data;
};

export const updateTeacher = async (id: number, formData: FormData): Promise<TeacherInfo> => {
  // Laravel multipart PUT üçün _method əlavə et
  formData.append('_method', 'PUT');
  const response = await uploadClient.post(`/teacher/${id}`, formData);
  return response.data;
};

export const deleteTeacher = async (id: number): Promise<void> => {
  await adminClient.delete(`/teacher/${id}`);
};

// Legacy compatibility
export const getTeacherInfo = async (): Promise<TeacherInfo | null> => {
  const teachers = await getTeachers();
  return teachers.length > 0 ? teachers[0] : null;
};

export const createTeacherInfo = createTeacher;
export const updateTeacherInfo = updateTeacher;

// ==================== COURSES ====================

export const getCourses = async (): Promise<Course[]> => {
  const response = await adminClient.get('/courses');
  return response.data;
};

export const getCourse = async (id: number): Promise<Course> => {
  const response = await adminClient.get(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (formData: FormData): Promise<Course> => {
  const response = await uploadClient.post('/courses', formData);
  return response.data;
};

export const updateCourse = async (id: number, formData: FormData): Promise<Course> => {
  formData.append('_method', 'PUT');
  const response = await uploadClient.post(`/courses/${id}`, formData);
  return response.data;
};

export const deleteCourse = async (id: number): Promise<void> => {
  await adminClient.delete(`/courses/${id}`);
};

// ==================== VIDEOS ====================

export const getVideos = async (): Promise<Video[]> => {
  const response = await adminClient.get('/videos');
  return response.data;
};

export const getVideo = async (id: number): Promise<Video> => {
  const response = await adminClient.get(`/videos/${id}`);
  return response.data;
};

export const createVideo = async (formData: FormData): Promise<Video> => {
  const response = await uploadClient.post('/videos', formData);
  return response.data;
};

export const updateVideo = async (id: number, formData: FormData): Promise<Video> => {
  formData.append('_method', 'PUT');
  const response = await uploadClient.post(`/videos/${id}`, formData);
  return response.data;
};

export const deleteVideo = async (id: number): Promise<void> => {
  await adminClient.delete(`/videos/${id}`);
};

// ==================== FAQS ====================

export const getFaqs = async (): Promise<Faq[]> => {
  const response = await adminClient.get('/faqs');
  return response.data;
};

export const createFaq = async (data: Partial<Faq>): Promise<Faq> => {
  const response = await adminClient.post('/faqs', data);
  return response.data;
};

export const updateFaq = async (id: number, data: Partial<Faq>): Promise<Faq> => {
  const response = await adminClient.put(`/faqs/${id}`, data);
  return response.data;
};

export const deleteFaq = async (id: number): Promise<void> => {
  await adminClient.delete(`/faqs/${id}`);
};

// ==================== CONTACTS ====================

export const getContacts = async (): Promise<Contact[]> => {
  const response = await adminClient.get('/contacts');
  return response.data;
};

export const createContact = async (data: Partial<Contact>): Promise<Contact> => {
  const response = await adminClient.post('/contacts', data);
  return response.data;
};

export const updateContact = async (id: number, data: Partial<Contact>): Promise<Contact> => {
  const response = await adminClient.put(`/contacts/${id}`, data);
  return response.data;
};

export const deleteContact = async (id: number): Promise<void> => {
  await adminClient.delete(`/contacts/${id}`);
};

// ==================== USERS & PERMISSIONS ====================

export interface AdminUser {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  permissions: string[];
  created_at: string;
}

export interface Permission {
  key: string;
  label: string;
  icon: string;
}

export const getUsers = async (): Promise<AdminUser[]> => {
  const response = await adminClient.get('/users');
  return response.data;
};

export const getUser = async (id: number): Promise<AdminUser> => {
  const response = await adminClient.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (data: {
  name: string;
  username: string;
  email: string;
  password: string;
  permissions?: string[];
}): Promise<AdminUser> => {
  const response = await adminClient.post('/users', data);
  return response.data;
};

export const updateUser = async (
  id: number,
  data: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    permissions?: string[];
  }
): Promise<AdminUser> => {
  const response = await adminClient.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await adminClient.delete(`/users/${id}`);
};

export const getAvailablePermissions = async (): Promise<Permission[]> => {
  const response = await adminClient.get('/permissions/available');
  return response.data;
};

export default adminClient;
