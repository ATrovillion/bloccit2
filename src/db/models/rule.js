'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define('Rule', {
    description: DataTypes.STRING,
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Topic",
        key: "id",
        as: "topicId",
      }
    }
  }, {});
  Rule.associate = function(models) {
    // associations can be defined here
    Rule.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE",
    })
  };
  return Rule;
};