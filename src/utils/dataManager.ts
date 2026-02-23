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
}

export interface ClassItem {
  id: number;
  name: string;
  grade: string;
  mainTeacher: string;
  assistantTeacher?: string;
  studentCount: number;
  students: Student[];
  custodyType?: 'lunch' | 'dinner' | 'both';
  status?: 'active' | 'closed';
}

export interface Mistake {
  id: number;
  studentId: number;
  studentName: string;
  subject: string;
  title: string;
  date: string;
  status: 'pending' | 'corrected';
  image: boolean;
}

export interface Homework {
  id: number;
  studentId: number;
  studentName: string;
  subject: string;
  title: string;
  date: string;
  status: 'pending' | 'completed' | 'reviewed';
  score?: string;
  comment?: string;
}

class DataManager {
  private students: Student[] = [
    { id: 1, name: '王小明', grade: '一年级', class: '1班', parent: '王先生', phone: '13800138001', status: 'active', enrollDate: '2025-09-01', address: '幸福小区1号楼', notes: '对花生过敏' },
    { id: 2, name: '李小红', grade: '二年级', class: '2班', parent: '李女士', phone: '13800138002', status: 'active', enrollDate: '2024-09-01' },
    { id: 3, name: '张小华', grade: '三年级', class: '1班', parent: '张先生', phone: '13800138003', status: 'active', enrollDate: '2023-09-01' },
    { id: 4, name: '赵小刚', grade: '六年级', class: '3班', parent: '赵女士', phone: '13800138004', status: 'graduated', enrollDate: '2020-09-01' },
    { id: 5, name: '孙悟空', grade: '一年级', class: '1班', parent: '菩提老祖', phone: '13800138005', status: 'active' },
    { id: 6, name: '猪八戒', grade: '一年级', class: '1班', parent: '高翠兰', phone: '13800138006', status: 'active' },
    { id: 7, name: '沙悟净', grade: '一年级', class: '2班', parent: '玉皇大帝', phone: '13800138007', status: 'active' },
  ];

  private mistakes: Mistake[] = [
    { id: 1, studentId: 5, studentName: '孙悟空', subject: '数学', title: '两位数加减法', date: '02-23', status: 'pending', image: true },
    { id: 2, studentId: 6, studentName: '猪八戒', subject: '英语', title: 'Unit 1 单词拼写', date: '02-23', status: 'corrected', image: true },
    { id: 3, studentId: 5, studentName: '孙悟空', subject: '数学', title: '应用题解析', date: '02-22', status: 'pending', image: true },
    { id: 4, studentId: 7, studentName: '沙悟净', subject: '语文', title: '古诗默写', date: '02-21', status: 'corrected', image: false },
  ];

  private teachers: string[] = ['张老师', '李老师', '王老师', '赵老师', '孙老师'];

  private homeworks: Homework[] = [
    { id: 1, studentId: 5, studentName: '孙悟空', subject: '数学', title: '口算第3页', date: '02-23', status: 'pending' },
    { id: 2, studentId: 5, studentName: '孙悟空', subject: '英语', title: '抄写 Unit 1', date: '02-23', status: 'completed', score: 'A', comment: '字迹工整' },
    { id: 3, studentId: 6, studentName: '猪八戒', subject: '数学', title: '口算第3页', date: '02-23', status: 'pending' },
    { id: 4, studentId: 6, studentName: '猪八戒', subject: '语文', title: '古诗背诵', date: '02-23', status: 'reviewed', score: 'B+', comment: '背诵流畅，注意发音' },
  ];

  private classes: ClassItem[] = [
    { 
      id: 1, 
      name: '一年级1班', 
      grade: '一年级', 
      mainTeacher: '张老师',
      assistantTeacher: '李老师',
      studentCount: 2,
      custodyType: 'lunch',
      status: 'active',
      students: [
        { id: 5, name: '孙悟空', grade: '一年级', class: '1班', school: '实验小学', parent: '菩提老祖', phone: '13800138005', status: 'active' },
        { id: 6, name: '猪八戒', grade: '一年级', class: '1班', school: '实验小学', parent: '高翠兰', phone: '13800138006', status: 'active' }
      ]
    },
    { 
      id: 2, 
      name: '二年级2班', 
      grade: '二年级', 
      mainTeacher: '李老师',
      studentCount: 0,
      custodyType: 'dinner',
      status: 'active',
      students: []
    },
    { 
      id: 3, 
      name: '三年级1班', 
      grade: '三年级', 
      mainTeacher: '王老师',
      studentCount: 0,
      custodyType: 'lunch',
      status: 'active',
      students: []
    },
  ];

  getStudents(): Student[] {
    return this.students;
  }

  getMistakes(): Mistake[] {
    return [...this.mistakes];
  }

  getTeachers(): string[] {
    return [...this.teachers];
  }

  getHomeworks(): Homework[] {
    return [...this.homeworks];
  }

  getMistakesByStudentId(studentId: number): Mistake[] {
    return this.mistakes.filter(m => m.studentId === studentId);
  }

  getHomeworksByStudentId(studentId: number): Homework[] {
    return this.homeworks.filter(h => h.studentId === studentId);
  }

  updateHomework(homework: Homework) {
    const index = this.homeworks.findIndex(h => h.id === homework.id);
    if (index !== -1) {
      this.homeworks[index] = homework;
    }
  }

  addMistake(mistake: Mistake) {
    this.mistakes.push(mistake);
  }

  addStudent(student: Student) {
    this.students.push(student);
  }

  updateStudent(updatedStudent: Student) {
    const index = this.students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
    }
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
    // Also remove from classes
    this.classes.forEach(cls => {
      cls.students = cls.students.filter(s => s.id !== id);
      cls.studentCount = cls.students.length;
    });
  }

  getClasses(): ClassItem[] {
    return this.classes;
  }

  addClass(cls: ClassItem) {
    this.classes.push(cls);
  }

  updateClass(updatedClass: ClassItem) {
    const index = this.classes.findIndex(c => c.id === updatedClass.id);
    if (index !== -1) {
      this.classes[index] = updatedClass;
    }
  }

  deleteClass(id: number) {
    this.classes = this.classes.filter(c => c.id !== id);
  }

  addStudentToClass(classId: number, student: Student) {
    const cls = this.classes.find(c => c.id === classId);
    if (cls) {
      // Check if student is already in class
      if (!cls.students.find(s => s.id === student.id)) {
        cls.students.push(student);
        cls.studentCount = cls.students.length;
      }
    }
  }

  removeStudentFromClass(classId: number, studentId: number) {
    const cls = this.classes.find(c => c.id === classId);
    if (cls) {
      cls.students = cls.students.filter(s => s.id !== studentId);
      cls.studentCount = cls.students.length;
    }
  }
}

export const dataManager = new DataManager();
