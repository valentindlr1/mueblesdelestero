const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "purchase",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      
    },
    {
      timestamps: false,
    }
  );
};
