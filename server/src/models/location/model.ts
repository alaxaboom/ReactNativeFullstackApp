import { Model, DataTypes, Sequelize } from 'sequelize';
import { LocationAttributes, LocationCreationAttributes } from './types';

class Location extends Model<LocationAttributes, LocationCreationAttributes> implements LocationAttributes {
  declare id: number;
  declare name: string;
  declare address: string;
  declare latitude: number;
  declare longitude: number;
  declare phone: string | null;
  declare website: string | null;
  declare mail: string | null;
  declare category: string | null;
  declare closed_at: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;

  public static initModel(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        latitude: {
          type: DataTypes.DECIMAL(10, 8),
          allowNull: false,
        },
        longitude: {
          type: DataTypes.DECIMAL(11, 8),
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        website: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        mail: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        category: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        closed_at: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Location',
        tableName: 'locations',
        timestamps: true,
      }
    );
  }
}

export default Location;

