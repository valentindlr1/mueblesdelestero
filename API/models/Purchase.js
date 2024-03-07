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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      products: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
        defaultValue: [],
      },
      buyDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      limitDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sucursal",
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ZIPcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      totalPaid: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM(
          "En fabricación",
          "Abonado",
          "Señado",
          "En camino",
          "Entregado",
          "Cancelado",
          "Devolución",
          "Listo",
          "Cambio",
          "Pago pendiente",
          "Pago en revisión",
        ),
        allowNull: false,
        defaultValue: "Pago pendiente",
      },
      trackCode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      comprobantes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
      }
    },
    {
      timestamps: false,
    }
  );
};
