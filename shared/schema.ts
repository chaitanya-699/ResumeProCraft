import { pgTable, text, serial, integer, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User account table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Resume table
export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  template: text("template").notNull(),
  data: text("data").notNull(), // JSON stringified resume data
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Resume data schema for validation
export const personalInfoSchema = z.object({
  fullName: z.string().optional().or(z.string().min(1, "Full name is required")),
  jobTitle: z.string().optional().or(z.string().min(1, "Job title is required")),
  email: z.string().optional().or(z.string().email("Invalid email format")),
  phone: z.string().optional().or(z.string().min(1, "Phone number is required")),
  address: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().optional().or(z.string().min(1, "Company name is required")),
  title: z.string().optional().or(z.string().min(1, "Job title is required")),
  location: z.string().optional(),
  startDate: z.string().optional().or(z.string().min(1, "Start date is required")),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().optional().or(z.string().min(1, "Institution name is required")),
  degree: z.string().optional().or(z.string().min(1, "Degree is required")),
  location: z.string().optional(),
  startDate: z.string().optional().or(z.string().min(1, "Start date is required")),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().optional().or(z.string().min(1, "Project name is required")),
  url: z.string().optional(),
  description: z.string().optional(),
});

export const resumeDataSchema = z.object({
  personalInfo: personalInfoSchema,
  summary: z.string().optional(),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.string().optional(),
  projects: z.array(projectSchema).optional(),
  template: z.enum(["classic", "modern", "minimal"]),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ResumeData = z.infer<typeof resumeDataSchema>;
