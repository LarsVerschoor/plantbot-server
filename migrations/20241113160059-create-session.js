'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Sessions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT
			},
			uuid: {
				allowNull: false,
				type: Sequelize.STRING
			},
			userId: {
				type: Sequelize.BIGINT,
				references: {
					model: 'Users',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			expiresAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Sessions');
	}
};
