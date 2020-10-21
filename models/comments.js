'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(models.Posts, {
        foreignKey: 'commentable_id',
        constraints: false,
      });
      Comments.belongsTo(models.Comments, {
        foreignKey: 'commentable_id',
        targetKey: 'commentable_id',
        constraints: false,
      });
      Comments.hasMany(models.Comments, {
        foreignKey: 'commentable_id',
        sourceKey: 'commentable_id',
        constraints: false,
        scope: {
          commentable_type: 'Comment',
        },
        onDelete: 'CASCADE',
        hooks: true,
      });
    }
  };
  Comments.init({
    message: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    commentable_type: DataTypes.STRING,
    commentable_id: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};