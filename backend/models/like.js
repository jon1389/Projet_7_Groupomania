"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Like extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Like.belongsTo(models.User, {
				foreignKey: "UserId",
				onDelete: "CASCADE",
			});
			models.Like.belongsTo(models.Post, {
				foreignKey: "PostId",
				onDelete: "CASCADE",
			});
		}
	}
	Like.init(
		{
			like: {
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
			modelName: "Like",
		}
	);
	return Like;
};
