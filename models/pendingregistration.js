'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class pendingRegistration extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasOne(models.Session, {
				foreignKey: 'registrationId',
				as: 'session'
			});
		}
	}
	pendingRegistration.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			verificationCode: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'pendingRegistration'
		}
	);
	return pendingRegistration;
};
