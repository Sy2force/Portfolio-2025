import { Request, Response } from 'express';
import HomeContent from '../models/HomeContent.model';
import AboutContent from '../models/AboutContent.model';
import Skill from '../models/Skill.model';
import Service from '../models/Service.model';
import CVContent from '../models/CVContent.model';
import ContactContent from '../models/ContactContent.model';
import { logger } from '../server';
import path from 'path';

// ============= HOME CONTENT =============
export const getHomeContent = async (req: Request, res: Response) => {
  try {
    let content = await HomeContent.findOne();
    
    // Créer un contenu par défaut si n'existe pas
    if (!content) {
      content = await HomeContent.create({});
    }
    
    res.json(content);
  } catch (error) {
    logger.error('Get home content error:', error);
    res.status(500).json({ error: 'Failed to fetch home content' });
  }
};

export const updateHomeContent = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    
    let content = await HomeContent.findOne();
    
    if (!content) {
      content = await HomeContent.create(updates);
    } else {
      Object.assign(content, updates);
      await content.save();
    }
    
    res.json({
      message: 'Home content updated successfully',
      content,
    });
  } catch (error) {
    logger.error('Update home content error:', error);
    res.status(500).json({ error: 'Failed to update home content' });
  }
};

// ============= ABOUT CONTENT =============
export const getAboutContent = async (req: Request, res: Response) => {
  try {
    let content = await AboutContent.findOne();
    
    if (!content) {
      content = await AboutContent.create({
        name: 'Shay Acoca',
        bio: 'Développeur Full-Stack passionné',
        longBio: 'Expert en React, Node.js et MongoDB',
        email: 'shay.acoca@example.com',
      });
    }
    
    res.json(content);
  } catch (error) {
    logger.error('Get about content error:', error);
    res.status(500).json({ error: 'Failed to fetch about content' });
  }
};

export const updateAboutContent = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    
    let content = await AboutContent.findOne();
    
    if (!content) {
      content = await AboutContent.create(updates);
    } else {
      Object.assign(content, updates);
      await content.save();
    }
    
    res.json({
      message: 'About content updated successfully',
      content,
    });
  } catch (error) {
    logger.error('Update about content error:', error);
    res.status(500).json({ error: 'Failed to update about content' });
  }
};

// ============= SKILLS =============
export const getAllSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: -1 });
    res.json(skills);
  } catch (error) {
    logger.error('Get skills error:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({
      message: 'Skill created successfully',
      skill,
    });
  } catch (error) {
    logger.error('Create skill error:', error);
    res.status(500).json({ error: 'Failed to create skill' });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    res.json({
      message: 'Skill updated successfully',
      skill,
    });
  } catch (error) {
    logger.error('Update skill error:', error);
    res.status(500).json({ error: 'Failed to update skill' });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    logger.error('Delete skill error:', error);
    res.status(500).json({ error: 'Failed to delete skill' });
  }
};

// ============= SERVICES =============
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.json(services);
  } catch (error) {
    logger.error('Get services error:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({
      message: 'Service created successfully',
      service,
    });
  } catch (error) {
    logger.error('Create service error:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json({
      message: 'Service updated successfully',
      service,
    });
  } catch (error) {
    logger.error('Update service error:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    logger.error('Delete service error:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
};

// ============= CV CONTENT =============
export const getCVContent = async (req: Request, res: Response) => {
  try {
    const content = await CVContent.findOne().sort({ createdAt: -1 });
    res.json(content || {});
  } catch (error) {
    logger.error('Get CV content error:', error);
    res.status(500).json({ error: 'Failed to fetch CV content' });
  }
};

export const uploadCV = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const cvUrl = `/uploads/${req.file.filename}`;
    
    const content = await CVContent.create({
      pdfUrl: cvUrl,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      uploadedAt: new Date(),
    });
    
    res.json({
      message: 'CV uploaded successfully',
      content,
    });
  } catch (error) {
    logger.error('Upload CV error:', error);
    res.status(500).json({ error: 'Failed to upload CV' });
  }
};

export const updateCVContent = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    
    let content = await CVContent.findOne().sort({ createdAt: -1 });
    
    if (!content) {
      return res.status(404).json({ error: 'CV content not found' });
    }
    
    Object.assign(content, updates);
    await content.save();
    
    res.json({
      message: 'CV content updated successfully',
      content,
    });
  } catch (error) {
    logger.error('Update CV content error:', error);
    res.status(500).json({ error: 'Failed to update CV content' });
  }
};

// ============= CONTACT CONTENT =============
export const getContactContent = async (req: Request, res: Response) => {
  try {
    let content = await ContactContent.findOne();
    
    if (!content) {
      content = await ContactContent.create({
        email: 'shay.acoca@example.com',
      });
    }
    
    res.json(content);
  } catch (error) {
    logger.error('Get contact content error:', error);
    res.status(500).json({ error: 'Failed to fetch contact content' });
  }
};

export const updateContactContent = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    
    let content = await ContactContent.findOne();
    
    if (!content) {
      content = await ContactContent.create(updates);
    } else {
      Object.assign(content, updates);
      await content.save();
    }
    
    res.json({
      message: 'Contact content updated successfully',
      content,
    });
  } catch (error) {
    logger.error('Update contact content error:', error);
    res.status(500).json({ error: 'Failed to update contact content' });
  }
};
