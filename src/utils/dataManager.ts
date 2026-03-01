import type { 
  User, Student, ClassItem, CustodyType, 
  Mistake, Homework, Review, Recipe, LeaveRequest, Attendance 
} from '../types';

class DataManager {
  private currentUser: User | null = null;

  private users: User[] = [
    { id: 'u_teacher_1', mobile: '13800000001', name: '张老师', role: 'teacher', classIds: [1, 3] },
    { id: 'u_parent_1', mobile: '13800138005', name: '孙悟空家长', role: 'parent', childIds: [5] },
    { id: 'u_parent_2', mobile: '13800138006', name: '猪八戒家长', role: 'parent', childIds: [6] },
  ];

  private students: Student[] = [
    { id: 1, name: '王小明', grade: '一年级', class: '1班', parent: '王先生', phone: '13800138001', status: 'active', enrollDate: '2025-09-01', address: '幸福小区1号楼', notes: '对花生过敏' },
    { id: 5, name: '孙悟空', grade: '一年级', class: '1班', parent: '菩提老祖', phone: '13800138005', status: 'active', school: '实验小学' },
    { id: 6, name: '猪八戒', grade: '一年级', class: '1班', parent: '高翠兰', phone: '13800138006', status: 'active', school: '实验小学' },
    { id: 7, name: '沙悟净', grade: '一年级', class: '2班', parent: '玉皇大帝', phone: '13800138007', status: 'active', school: '实验小学' },
  ];

  private classes: ClassItem[] = [
    { 
      id: 1, 
      name: '一年级1班', 
      grade: '一年级', 
      teacher: '张老师',
      studentCount: 3,
      custodyType: '午托',
      status: 'in_progress',
      students: []
    },
    { 
      id: 2, 
      name: '二年级2班', 
      grade: '二年级', 
      teacher: '李老师',
      studentCount: 0,
      custodyType: '晚托',
      status: 'not_started',
      students: []
    },
    { 
      id: 3, 
      name: '三年级1班', 
      grade: '三年级', 
      teacher: '王老师',
      studentCount: 0,
      custodyType: '午托',
      status: 'closed',
      students: []
    },
  ];

  private custodyTypes: CustodyType[] = [
    { id: 1, name: '午托' },
    { id: 2, name: '晚托' },
    { id: 3, name: '全托' },
  ];

  private mistakes: Mistake[] = [
    { id: 1, studentId: 5, studentName: '孙悟空', subject: '数学', title: '两位数加减法', date: '2026-03-01', status: 'pending', image: true, imageUrl: 'https://via.placeholder.com/300x400?text=Mistake+1', reason: '审题不清', knowledgePoint: '加减法' },
    { id: 2, studentId: 6, studentName: '猪八戒', subject: '英语', title: 'Unit 1 单词拼写', date: '2026-03-01', status: 'corrected', image: true, imageUrl: 'https://via.placeholder.com/300x400?text=Mistake+2' },
  ];

  private homeworks: Homework[] = [
    { id: 1, studentId: 5, studentName: '孙悟空', subject: '数学', title: '口算第3页', date: '2026-03-01', status: 'pending' },
    { id: 2, studentId: 5, studentName: '孙悟空', subject: '英语', title: '抄写 Unit 1', date: '2026-03-01', status: 'completed', score: 'A', comment: '字迹工整' },
    { id: 3, studentId: 6, studentName: '猪八戒', subject: '数学', title: '口算第3页', date: '2026-03-01', status: 'pending' },
  ];

  private attendances: Attendance[] = [
    { id: 'a1', studentId: 5, date: '2026-03-01', checkIn: '11:30', status: 'normal' },
    { id: 'a2', studentId: 6, date: '2026-03-01', checkIn: '11:35', status: 'normal' },
  ];

  private reviews: Review[] = [
    { id: 'r1', studentId: 5, date: '2026-03-01', overallRating: '优秀', tags: ['专注', '积极'], content: '今天表现很棒！' }
  ];

  private recipes: Recipe[] = [
    {
      id: 'rc1',
      date: '2026-03-01',
      lunch: ['红烧肉', '清炒菜心', '紫菜蛋花汤'],
      lunchImage: 'https://via.placeholder.com/400x300?text=Lunch',
      dinner: ['西红柿炒鸡蛋', '肉末茄子'],
      dinnerImage: 'https://via.placeholder.com/400x300?text=Dinner',
      snack: ['苹果', '酸奶'],
      snackImage: 'https://via.placeholder.com/400x300?text=Snack'
    }
  ];

  private leaveRequests: LeaveRequest[] = [
    { id: 'lr1', studentId: 5, studentName: '孙悟空', date: '2026-03-02', type: '病假', reason: '感冒发烧', status: 'pending', createdAt: '2026-03-01T10:00:00.000Z' }
  ];

  constructor() {
    this.initClassStudents();
  }

  private initClassStudents() {
    const class1 = this.classes.find(c => c.id === 1);
    if (class1) {
      class1.students = this.students.filter(s => [5, 6].includes(s.id));
      class1.studentCount = class1.students.length;
    }
  }

  login(mobile: string): User | null {
    const user = this.users.find(u => u.mobile === mobile);
    if (user) {
      this.currentUser = user;
      return user;
    }
    return null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
  }

  getStudents(): Student[] {
    return this.students;
  }

  getStudentById(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }

  getClasses(): ClassItem[] {
    return this.classes;
  }

  getClassById(id: number): ClassItem | undefined {
    return this.classes.find(c => c.id === id);
  }

  getMistakes(): Mistake[] {
    return [...this.mistakes];
  }

  getHomeworks(): Homework[] {
    return [...this.homeworks];
  }
  
  getPendingLeaveRequests(): LeaveRequest[] {
    return this.leaveRequests.filter(r => r.status === 'pending');
  }

  getLeaveRequests(studentId?: number): LeaveRequest[] {
    const list = studentId ? this.leaveRequests.filter(r => r.studentId === studentId) : this.leaveRequests;
    return [...list].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  }

  addLeaveRequest(request: LeaveRequest) {
    this.leaveRequests.unshift(request);
  }

  approveLeaveRequest(requestId: string) {
    const req = this.leaveRequests.find(r => r.id === requestId);
    if (req) {
      req.status = 'approved';
      const today = new Date().toISOString().split('T')[0];
      if (req.date === today) {
        this.updateAttendanceStatus(req.studentId, req.date, 'leave');
      }
    }
  }

  rejectLeaveRequest(requestId: string, reason: string) {
    const req = this.leaveRequests.find(r => r.id === requestId);
    if (req) {
      req.status = 'rejected';
      req.rejectReason = reason;
    }
  }

  updateAttendanceStatus(studentId: number, date: string, status: Attendance['status']) {
    let record = this.attendances.find(a => a.studentId === studentId && a.date === date);
    if (record) {
      record.status = status;
    } else {
      record = {
        id: `att_${Date.now()}`,
        studentId,
        date,
        status
      };
      this.attendances.push(record);
    }
  }

  getParentChildren(parentId: string): Student[] {
    const parent = this.users.find(u => u.id === parentId);
    if (!parent || !parent.childIds) return [];
    return this.students.filter(s => parent.childIds!.includes(s.id));
  }

  getChildHomeworks(studentId: number): Homework[] {
    return this.homeworks.filter(h => h.studentId === studentId);
  }

  getChildMistakes(studentId: number): Mistake[] {
    return this.mistakes.filter(m => m.studentId === studentId);
  }

  getChildReviews(studentId: number): Review[] {
    return this.reviews.filter(r => r.studentId === studentId);
  }

  getChildAttendance(studentId: number, date: string): Attendance | undefined {
    return this.attendances.find(a => a.studentId === studentId && a.date === date);
  }

  getTodayRecipe(): Recipe | undefined {
    return this.recipes[0];
  }

  submitLeaveRequest(studentId: number, date: string, type: LeaveRequest['type'], reason: string) {
    const student = this.students.find(s => s.id === studentId);
    const newRequest: LeaveRequest = {
      id: `lr_${Date.now()}`,
      studentId,
      studentName: student?.name || '未知学生',
      date,
      type,
      reason,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.leaveRequests.unshift(newRequest);
  }
}

export const dataManager = new DataManager();
