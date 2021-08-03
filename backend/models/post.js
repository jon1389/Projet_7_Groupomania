"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate(models) {
			models.Post.belongsTo(models.User, {
				foreignKey: "UserId",
				onDelete: "CASCADE",
			});
			models.Post.hasMany(models.Comment);
		}
	}
	Post.init(
		{
			postTitle: {
				type: DataTypes.STRING,
				defaultValue: "",
			},
			postImg: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
