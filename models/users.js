module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    username : DataTypes.STRING,
    password : DataTypes.STRING,
    created_at : DataTypes.DATE,
    updated_at : DataTypes.DATE
  },{
    underscored: true,
    tableName: 'users'
  });

  return User;
}