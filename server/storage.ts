import {
  users,
  type User,
  type InsertUser,
  resumes,
  type Resume,
  type InsertResume,
} from "@shared/schema";

// modify the interface with any CRUD methods
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Resume CRUD operations
  createResume(resume: InsertResume): Promise<Resume>;
  getResume(id: number): Promise<Resume | undefined>;
  getResumesByUserId(userId: number): Promise<Resume[]>;
  updateResume(id: number, resume: Partial<InsertResume>): Promise<Resume | undefined>;
  deleteResume(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private resumes: Map<number, Resume>;
  userCurrentId: number;
  resumeCurrentId: number;

  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.userCurrentId = 1;
    this.resumeCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = this.resumeCurrentId++;
    const now = new Date();
    const resume: Resume = { 
      ...insertResume, 
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.resumes.set(id, resume);
    return resume;
  }
  
  async getResume(id: number): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }
  
  async getResumesByUserId(userId: number): Promise<Resume[]> {
    return Array.from(this.resumes.values()).filter(
      (resume) => resume.userId === userId
    );
  }
  
  async updateResume(id: number, resumeUpdate: Partial<InsertResume>): Promise<Resume | undefined> {
    const resume = this.resumes.get(id);
    if (!resume) return undefined;
    
    const updatedResume: Resume = {
      ...resume,
      ...resumeUpdate,
      updatedAt: new Date(),
    };
    
    this.resumes.set(id, updatedResume);
    return updatedResume;
  }
  
  async deleteResume(id: number): Promise<boolean> {
    return this.resumes.delete(id);
  }
}

export const storage = new MemStorage();
