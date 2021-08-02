"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Comment.belongsTo(models.User, {
				foreignKey: "UserId",
				onDelete: "CASCADE",
			});
			models.Comment.belongsTo(models.Post, {
				foreignKey: "PostId",
				onDelete: "CASCADE",
			});
		}
	}
	Comment.init(
		{
			commentText: {
				type: DataTypes.STRING,
				allowNull: false,
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
			modelName: "Comment",
		}
	);
	return Comment;
};
