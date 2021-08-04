"use strict";
const { NONE } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			models.User.hasMany(models.Post);
			models.User.hasMany(models.Comment);
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
			isAdmin: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
