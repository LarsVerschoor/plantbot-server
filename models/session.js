'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Session extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.User, {
				foreignKey: 'userId',
				as: 'user'
			});
			this.belongsTo(models.pendingRegistration, {
				foreignKey: 'registrationId',
				as: 'pendingRegistration'
			});
		}
	}
	Session.init(
		{
			sessionToken: DataTypes.STRING,
			csrfToken: DataTypes.STRING,
			expiresAt: DataTypes.DATE
		},
		{
			sequelize,
			modelName: 'Session'
		}
	);
	return Session;
};
