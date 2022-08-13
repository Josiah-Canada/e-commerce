// import important parts of sequelize library
// const { INTEGER } = require('sequelize');
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    // should category,product,tag,and productTag all be their own categories with id, etc being sub categories?
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    ,
    
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        unique: true,
        validate: {
          isDecimal: true
        }
      }
    ,
    
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      }
    ,
    
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        //referencethe category model's id
        references: {
          model: 'category',
          key: 'id'
        }
      }
    ,
  },
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
