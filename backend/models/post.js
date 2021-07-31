"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Post.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
				},
				onDelete: "cascade",
			});

			models.Post.hasMany(models.Comment, { onDelete: "cascade" });
		}
	}
	Post.init(
		{
			postTitle: {
				type: DataTypes.STRING,
			},
			postImg: {
				type: DataTypes.STRING,
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
