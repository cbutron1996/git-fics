'use strict';

module.exports = (sequelize, DataTypes) => {
  var Stories = sequelize.define('Stories', {
    Title: DataTypes.STRING,
    Author: DataTypes.STRING,
    Description: DataTypes.STRING,
    NumChapters: DataTypes.INTEGER,
  });
  return Stories;
};
