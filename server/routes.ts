import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertResumeSchema, resumeDataSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Resume endpoints
  app.post("/api/resumes", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const resumeData = insertResumeSchema.parse(req.body);
      
      // Validate the JSON data string
      const parsedData = JSON.parse(resumeData.data);
      resumeDataSchema.parse(parsedData);
      
      // Create resume
      const resume = await storage.createResume(resumeData);
      
      res.status(201).json(resume);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else if (error instanceof SyntaxError) {
        res.status(400).json({ message: "Invalid JSON in resume data" });
      } else {
        res.status(500).json({ message: "Failed to create resume" });
      }
    }
  });

  app.get("/api/resumes/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid resume ID" });
      }
      
      const resume = await storage.getResume(id);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      res.json(resume);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resume" });
    }
  });

  app.get("/api/users/:userId/resumes", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const resumes = await storage.getResumesByUserId(userId);
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resumes" });
    }
  });

  app.put("/api/resumes/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid resume ID" });
      }
      
      // Validate request body
      const resumeUpdate = insertResumeSchema.partial().parse(req.body);
      
      // If data is provided, validate it
      if (resumeUpdate.data) {
        const parsedData = JSON.parse(resumeUpdate.data);
        resumeDataSchema.parse(parsedData);
      }
      
      const updatedResume = await storage.updateResume(id, resumeUpdate);
      if (!updatedResume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      res.json(updatedResume);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else if (error instanceof SyntaxError) {
        res.status(400).json({ message: "Invalid JSON in resume data" });
      } else {
        res.status(500).json({ message: "Failed to update resume" });
      }
    }
  });

  app.delete("/api/resumes/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid resume ID" });
      }
      
      const deleted = await storage.deleteResume(id);
      if (!deleted) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete resume" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
