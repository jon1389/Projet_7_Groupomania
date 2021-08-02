"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Dislike extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Dislike.belongsTo(models.User, {
				foreignKey: "UserId",
				onDelete: "CASCADE",
			});
			models.Dislike.belongsTo(models.Post, {
				foreignKey: "PostId",
				onDelete: "CASCADE",
			});
		}
	}
	Dislike.init(
		{
			dislike: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			PostId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Dislike",
		}
	);
	return Dislike;
};
