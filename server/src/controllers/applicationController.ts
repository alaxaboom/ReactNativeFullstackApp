import { Request, Response } from 'express';
import Application from '../models/application/model';
import { ApplicationStatus, ProductType } from '../models/application/types';
import { AuthenticatedRequest } from '../middleware/auth';

class ApplicationController {
  public async createApplication(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as AuthenticatedRequest).user.id;
      const {
        productType,
        loanAmount,
        periodMonths,
        interestRate,
        fee,
        totalToReturn,
        monthlyRepayment,
        firstInstallmentDueDate
      } = req.body;

      if (!Object.values(ProductType).includes(productType)) {
        res.status(400).json({ error: 'Invalid productType' });
        return;
      }

      const application = await Application.create({
        userId,
        productType,
        loanAmount,
        periodMonths,
        interestRate,
        fee,
        totalToReturn,
        monthlyRepayment,
        firstInstallmentDueDate,
        status: ApplicationStatus.PENDING
      });

      res.status(201).json(application);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async getMyApplications(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as AuthenticatedRequest).user.id;
      const applications = await Application.findAll({
        where: { userId, status: ApplicationStatus.PENDING }
      });
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async getMyCredits(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as AuthenticatedRequest).user.id;
      const credits = await Application.findAll({
        where: {
          userId,
          status: [
            ApplicationStatus.APPROVED,
            ApplicationStatus.PAID_OFF,
            ApplicationStatus.CLOSED,
            ApplicationStatus.IN_ARREARS
          ]
        }
      });
      res.json(credits);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async getApplicationById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as unknown as AuthenticatedRequest).user.id;
      const application = await Application.findOne({ where: { id, userId } });
      if (!application) {
        res.status(404).json({ error: 'Application not found' });
        return;
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async getCreditById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as unknown as AuthenticatedRequest).user.id;
      const credit = await Application.findOne({
        where: {
          id,
          userId,
          status: [
            ApplicationStatus.APPROVED,
            ApplicationStatus.PAID_OFF,
            ApplicationStatus.CLOSED,
            ApplicationStatus.IN_ARREARS
          ]
        }
      });
      if (!credit) {
        res.status(404).json({ error: 'Credit not found' });
        return;
      }
      res.json(credit);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async approveApplication(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const application = await Application.findByPk(id);
      if (!application) {
        res.status(404).json({ error: 'Application not found' });
        return;
      }
      await application.update({ status: ApplicationStatus.APPROVED });
      res.json(application);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async deleteApplicationOrCredit(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as unknown as AuthenticatedRequest).user.id;
      const record = await Application.findOne({ where: { id, userId } });
      if (!record) {
        res.status(404).json({ error: 'Record not found' });
        return;
      }
      await record.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export default new ApplicationController();