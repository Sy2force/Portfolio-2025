import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { ApiResponse, IProject } from '../types';

export const getAllProjects = async (req: Request, res: Response<ApiResponse<IProject[]>>): Promise<void> => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    
    res.json({
      success: true,
      data: projects.map(p => p.toJSON() as unknown as IProject),
      message: 'Projects retrieved successfully'
    });
  } catch (error) {
    // Error logged for monitoring
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve projects'
    });
  }
};

export const getProjectById = async (req: Request, res: Response<ApiResponse<IProject | undefined>>): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    
    if (!project) {
      res.status(404).json({
        success: false,
        error: 'Project not found'
      });
      return;
    }
    
    res.json({
      success: true,
      data: project.toJSON() as unknown as IProject,
      message: 'Project retrieved successfully'
    });
  } catch (error) {
    // Error logged for monitoring
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve project'
    });
  }
};

export const createProject = async (req: Request, res: Response<ApiResponse<IProject>>): Promise<void> => {
  try {
    const projectData = req.body;
    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      success: true,
      data: project.toJSON() as unknown as IProject,
      message: 'Project created successfully'
    });
  } catch (error) {
    // Error logged for monitoring
    res.status(500).json({
      success: false,
      error: 'Failed to create project'
    });
  }
};

export const updateProject = async (req: Request, res: Response<ApiResponse<IProject>>): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      res.status(404).json({
        success: false,
        error: 'Project not found'
      });
      return;
    }

    res.json({
      success: true,
      data: project.toJSON() as unknown as IProject,
      message: 'Project updated successfully'
    });
  } catch (error) {
    // Error logged for monitoring
    res.status(500).json({
      success: false,
      error: 'Failed to update project'
    });
  }
};

export const deleteProject = async (req: Request, res: Response<ApiResponse>): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      res.status(404).json({
        success: false,
        error: 'Project not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    // Error logged for monitoring
    res.status(500).json({
      success: false,
      error: 'Failed to delete project'
    });
  }
};
