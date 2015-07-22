module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define('Picture', {
    id : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    author : DataTypes.STRING(30),
    link : DataTypes.STRING,
    description : DataTypes.STRING,
    created_at : DataTypes.DATE,
    updated_at : DataTypes.DATE
  },{
    underscored: true,
    tableName: 'pictures'
  });

  return Picture;
}