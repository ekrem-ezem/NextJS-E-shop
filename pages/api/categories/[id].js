import connectDB from "../../../utils/connectDB";
import Categories from "../../../models/categoriesModel";
import Products from "../../../models/productModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateCategory(req, res);
      break;
    case "DELETE":
      await deleteCategory(req, res);
      break;
  }
};

const updateCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "身份验证无效。" });

    const { id } = req.query;
    const { name } = req.body;

    const newCategory = await Categories.findOneAndUpdate(
      { _id: id },
      { name }
    );
    res.json({
      msg: "更新成功！",
      category: {
        ...newCategory._doc,
        name,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "验证无效." });

    const { id } = req.query;

    const products = await Products.findOne({ category: id });
    if (products)
      return res.status(400).json({
        err: "请删除所有有关系的产品",
      });

    await Categories.findByIdAndDelete(id);

    res.json({ msg: "删除成功！" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
