module.exports = function (sequelize, Sequalize) {
  var UserSchema = sequelize.define(
    "User",
    {
      username: Sequalize.STRING,
      password: Sequalize.STRING,
      name: Sequalize.STRING,
      config: Sequalize.STRING,
    },
    {
      timestamps: false,
    }
  );
  return UserSchema;
};
