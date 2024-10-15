const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Feedback = sequelize.define('Feedback', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  diseases: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  diseaseType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});


sequelize
  .sync()
  .then(() => {
    console.log("Feedback table synchronized.");
  })
  .catch((err) => {
    console.error("Unable to synchronized Feedback table:", err);
  });
module.exports = Feedback;