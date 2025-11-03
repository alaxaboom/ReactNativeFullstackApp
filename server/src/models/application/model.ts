import { Model, DataTypes, Sequelize } from 'sequelize';
import { ApplicationAttributes, ApplicationCreationAttributes, ApplicationStatus, ProductType } from './types';

class Application extends Model<ApplicationAttributes, ApplicationCreationAttributes> implements ApplicationAttributes {
  declare id: number;
  declare userId: number;
  declare productType: ProductType;
  declare loanAmount: number;
  declare periodMonths: number;
  declare interestRate: number;
  declare fee: number;
  declare totalToReturn: number;
  declare monthlyRepayment: number;
  declare firstInstallmentDueDate: Date;
  declare status: ApplicationStatus;
  declare createdAt: Date;
  declare updatedAt: Date;

  public static initModel(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onDelete: 'CASCADE',
        },
        productType: {
          type: DataTypes.ENUM(...Object.values(ProductType)),
          allowNull: false,
        },
        loanAmount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        periodMonths: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        interestRate: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: false,
        },
        fee: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        totalToReturn: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        monthlyRepayment: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        firstInstallmentDueDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(ApplicationStatus)),
          defaultValue: ApplicationStatus.PENDING,
          allowNull: false,
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
        modelName: 'Application',
        tableName: 'applications',
        timestamps: true,
      }
    );
  }
}

export default Application;