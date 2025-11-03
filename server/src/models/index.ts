import { Sequelize } from 'sequelize';
import config from '../config/config';
import User from './user/model';
import PasswordResetToken from './passwordResetToken/model';
import Application from './application/model';
import IncompleteUser from './incompleteUser/model';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    ...dbConfig,
    define: {
      underscored: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
  }
);

User.initModel(sequelize);
PasswordResetToken.initModel(sequelize);
Application.initModel(sequelize);
IncompleteUser.initModel(sequelize);

User.hasMany(PasswordResetToken, { foreignKey: 'userId', onDelete: 'CASCADE' });
PasswordResetToken.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Application, { foreignKey: 'userId', onDelete: 'CASCADE' });
Application.belongsTo(User, { foreignKey: 'userId' });

export { User, PasswordResetToken, Application, IncompleteUser };