'use strict';

module.exports = (sequelize, DataTypes) => {
  var PRs = sequelize.define('PRs', {
    Title: DataTypes.STRING,
    Base: DataTypes.STRING,
    Head: DataTypes.STRING,
  });
  return PRs;
};
