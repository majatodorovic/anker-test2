import CategoryData from "./CategoryData";

const Category = async ({ path }) => {
  return <CategoryData slug={path} />;
};

export default Category;
