'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      // define association here
      Posts.belongsTo(models.Users, {
        foreignKey: 'user_id',
      });
      Posts.hasMany(models.Comments, {
        foreignKey: 'postId',
      });
    }
  };
  Posts.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};