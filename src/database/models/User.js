module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Todo, {
      foreignKey: "userId",
      onDelete: "cascade",
      hooks: true,
    });
  };

  return User;
};
