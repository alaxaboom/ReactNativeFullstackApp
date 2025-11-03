import { Model, DataTypes, Sequelize } from 'sequelize';
import { IncompleteUserAttributes, IncompleteUserCreationAttributes } from './types';

class IncompleteUser
  extends Model<IncompleteUserAttributes, IncompleteUserCreationAttributes>
  implements IncompleteUserAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public phone!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
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
        modelName: 'IncompleteUser',
        tableName: 'incomplete_users',
        timestamps: true,
      }
    );
  }
}

export default IncompleteUser;