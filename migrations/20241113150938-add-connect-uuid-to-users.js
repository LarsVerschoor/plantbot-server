'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('users', 'connectId', {
			type: Sequelize.STRING,
			defaultValue: null,
			allowNull: true
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('users', 'connectId');
	}
};
