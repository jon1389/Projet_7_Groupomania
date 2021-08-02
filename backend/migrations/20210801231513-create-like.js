"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Likes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			like: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			UserId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "cascade",
			},
			PostId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: "cascade",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Likes");
	},
};
