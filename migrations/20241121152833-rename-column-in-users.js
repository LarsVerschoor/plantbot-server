'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.renameColumn('users', 'connectId', 'uuid');
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.renameColumn('users', 'uuid', 'connectId');
	}
};
