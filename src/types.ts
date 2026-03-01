export interface User {
  id: string;
  mobile: string;
  name: string;
  role: 'teacher' | 'parent' | 'admin';
  avatar?: string;
  classIds?: number[];
  childIds?: number[];
}

export interface Student {
  id: number;
  name: string;
  grade: string;
  class: string;
  school?: string;
  parent: string;
  phone: string;
  status: 'active' | 'graduated' | 'suspended';
  enrollDate?: string;
  address?: string;
  notes?: string;
  avatar?: string;
}

export interface ClassItem {
  id: number;
  name: string;
  grade: string;
  teacher: string;
  studentCount: number;
  students: Student[];
  custodyType?: string;
  status?: 'not_started' | 'in_progress' | 'closed';
}

export interface CustodyType {
  id: number;
  name: string;
}

export interface Attendance {
  id: string;
  studentId: number;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'normal' | 'late' | 'leave' | 'absent' | 'not_checked';
}

export interface Mistake {
  id: number;
  studentId: number;
  studentName: string;
  subject: string;
  title: string;
  date: string;
  status: 'pending' | 'corrected' | 'mastered';
  image: boolean;
  imageUrl?: string;
  reason?: string;
  knowledgePoint?: string;
}

export interface Homework {
  id: number;
  studentId: number;
  studentName: string;
  subject: string;
  title: string;
  date: string;
  status: 'pending' | 'submitted' | 'completed' | 'reviewed' | 'correction_needed';
  score?: string;
  rating?: string; // Added for compatibility
  comment?: string;
  images?: string[];
  feedback?: string;
  submitTime?: string;
}

export interface Review {
  id: string;
  studentId: number;
  date: string;
  overallRating: '优秀' | '良好' | '一般' | '需关注';
  tags: string[];
  content: string;
  images?: string[];
}

export interface Recipe {
  id: string;
  date: string;
  lunch: string[];
  lunchImage?: string;
  dinner: string[];
  dinnerImage?: string;
  snack: string[];
  snackImage?: string;
}

export interface LeaveRequest {
  id: string;
  studentId: number;
  studentName: string;
  classId?: number;
  className?: string;
  date: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  submitTime?: string;
  type: '病假' | '事假' | '其他';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectReason?: string;
  createdAt: string;
}

export type TeacherViewState = 'home' | 'management' | 'mine' | 'mistake' | 'leave' | 'notification' | 'attendance' | 'homework' | 'approval';
export type ParentViewState = 'home' | 'learning' | 'mine' | 'homework-detail' | 'mistake-detail' | 'leave-apply' | 'history' | 'recipe' | 'review';
