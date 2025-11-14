import { Request, Response } from 'express';
import Location from '../models/location/model';
import { LocationCreationAttributes } from '../models/location/types';
import { Op } from 'sequelize';

class LocationController {
  public async createLocation(
    req: Request<{}, {}, LocationCreationAttributes>,
    res: Response
  ): Promise<void> {
    try {
      const location = await Location.create(req.body);
      res.status(201).json(location);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
  public async getAllLocations(req: Request, res: Response): Promise<void> {
    try {
      const locations = await Location.findAll({
        order: [['name', 'ASC']],
      });
      res.json(locations);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async searchLocations(req: Request<{}, {}, {}, { q?: string }>, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      
      if (!q || q.trim() === '') {
        const locations = await Location.findAll({
          order: [['name', 'ASC']],
        });
        res.json(locations);
        return;
      }

      const searchTerm = q.trim();
      const locations = await Location.findAll({
        where: {
          name: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
        order: [['name', 'ASC']],
      });
      res.json(locations);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async getLocationById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const location = await Location.findByPk(id);
      if (!location) {
        res.status(404).json({ error: 'Location not found' });
        return;
      }
      res.json(location);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new LocationController();

