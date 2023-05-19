import { Request, Response } from 'express';
import CustomRequest from '../interfaces/types';
import JobApplication from '../models/application.model';

export const getAllJobApplications = async (req: Request, res: Response) => {
    try {
        const jobApplications = await JobApplication.find().populate(['_id', 'name', 'email', 'message', 'createdAt', 'read']);
        res.status(200).json(jobApplications);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getJobApplicationById = async (req: Request, res: Response) => {
    try {
        const jobApplication = await JobApplication.findById(req.params.applicationId).populate(['_id', 'name', 'email', 'message', 'createdAt', 'read']);
        if (!jobApplication) {
            return res.status(404).json({ error: 'Job application not found' });
        }
        res.status(200).json(jobApplication);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createJobApplication = async (req: CustomRequest, res: Response) => {
    try {
        const jobApplication = new JobApplication({ ...req.body, applicant: req.userId });
        await jobApplication.save();
        res.status(201).json(jobApplication);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateJobApplication = async (req: Request, res: Response) => {
    try {
        const jobApplication = await JobApplication.findByIdAndUpdate(req.params.applicationId, req.body, { new: true });
        if (!jobApplication) {
            return res.status(404).json({ error: 'Job application not found' });
        }
        res.status(200).json(jobApplication);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteJobApplication = async (req: Request, res: Response) => {
    try {
        const jobApplication = await JobApplication.findByIdAndDelete(req.params.applicationId);
        if (!jobApplication) {
            return res.status(404).json({ error: 'Job application not found' });
        }
        res.status(200).json({ message: 'Job application deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
