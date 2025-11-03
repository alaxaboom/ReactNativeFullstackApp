import { Model, DataTypes, Sequelize } from 'sequelize';
import { PasswordResetTokenAttributes, PasswordResetTokenCreationAttributes } from './types';

class PasswordResetToken extends Model<PasswordResetTokenAttributes, PasswordResetTokenCreationAttributes> implements PasswordResetTokenAttributes {
  public id!: number;
  public userId!: number;
  public token!: string;
  public expiresAt!: Date;
  public used!: boolean;
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
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        token: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        used: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'PasswordResetToken',
        tableName: 'password_reset_tokens',
        timestamps: true,
      }
    );
  }
}

export default PasswordResetToken;