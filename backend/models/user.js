"use strict";
const { NONE } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.User.hasMany(models.Post);
			models.User.hasMany(models.Comment);
			models.User.hasMany(models.Like);
			models.User.hasMany(models.Dislike);
		}
	}
	User.init(
		{
			firstname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			userImg: {
				type: DataTypes.STRING,
				defaultValue: NONE,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
