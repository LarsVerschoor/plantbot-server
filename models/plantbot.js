'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Plantbot extends Model {
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
		}
	}
	Plantbot.init(
		{
			userId: DataTypes.INTEGER,
			name: DataTypes.STRING,
			encryptionKey: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Plantbot'
		}
	);
	return Plantbot;
};
