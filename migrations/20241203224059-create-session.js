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
			sessionToken: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true
			},
			csrfToken: {
				allowNull: false,
				type: Sequelize.STRING
			},
			userId: {
				allowNull: true,
				defaultValue: null,
				type: Sequelize.BIGINT,
				references: {
					model: 'Users',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL'
			},
			registrationId: {
				allowNull: true,
				defaultValue: null,
				type: Sequelize.BIGINT,
				references: {
					model: 'pendingRegistrations',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL'
			},
			expiresAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Sessions');
	}
};
