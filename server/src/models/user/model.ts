import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
import { UserAttributes, UserCreationAttributes } from './types';

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare phone: string;
  declare jmbg: string;
  declare password: string;
  declare email?: string | null;
  declare avatarPath?: string | null;
  declare location?: string | null;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    if (!this.password || !candidatePassword) {
      return false;
    }
    return bcrypt.compare(candidatePassword, this.password);
  }

  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static initModel(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
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
        jmbg: {
          type: DataTypes.STRING(13),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: true,
          validate: { isEmail: true },
        },
        avatarPath: {
          type: DataTypes.STRING(512),
          allowNull: true,
        },
        location: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
      }
    );
  }
}

export default User;