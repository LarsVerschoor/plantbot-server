'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.Plantbot, {
				foreignKey: 'userId',
				as: 'plantbots'
			});
			this.hasMany(models.Session, {
				foreignKey: 'userId',
				as: 'sessions'
			});
		}
	}
	User.init(
		{
			password: DataTypes.STRING,
			email: DataTypes.STRING,
			uuid: DataTypes.UUID
		},
		{
			sequelize,
			modelName: 'User'
		}
	);
	return User;
};
