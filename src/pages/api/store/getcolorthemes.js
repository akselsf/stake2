import mongoose from "mongoose";
const { StoreColorTheme } = require("../../../../mongooseschemas");
const handleGetColorThemes = async (req, res) => {
  await mongoose.connect(process.env.DBURI);

  const colorThemes = await StoreColorTheme.find({});
  const result = [];
  colorThemes.forEach((colorTheme) => {
    result.push({
      color: colorTheme.color,
      name: colorTheme.name,
      price: colorTheme.price,
    });
  });
  await mongoose.disconnect();
  res.status(200).json(result);
};

export default handleGetColorThemes;
