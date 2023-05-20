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
      products: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
        defaultValue: []
      },
      buyDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      limitDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sucursal"
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ZIPcode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ""
      },
      totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: DataTypes.ENUM("En fabricación", "Abonado", "Señado", "En camino", "Entregado"),
        allowNull: false,
        defaultValue: "Señado"
      },
      trackCode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      }
    },
    {
      timestamps: false,
    }
  );
};
