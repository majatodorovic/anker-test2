import { get } from "@/api/api";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";
import Link from "next/link";

const getCategories = () => {
  return get("/categories/product/tree").then((res) => res?.payload);
};

const AllCategories = async () => {
  const categories = await getCategories();

  const renderCategories = (categories) => {
    return (categories ?? [])?.map((item) => {
      let has_children = item?.children?.length > 0 && item?.children;
      if (has_children) {
        return (
          <div key={item?.id} className={`col-span-1 h-fit w-full`}>
            <div className={`flex items-center justify-between`}>
              <Link
                href={`/${item?.link?.link_path}`}
                className={`hover:text-primary ${
                  !item?.parent_id ? "mb-3 text-xl font-bold" : ""
                }`}
              >
                {item?.name}
              </Link>
            </div>
            {renderCategories(item?.children)}
          </div>
        );
      } else {
        return (
          <div key={item?.id} className={`col-span-1 h-fit w-full`}>
            <Link
              href={`/${item?.link?.link_path}`}
              className={`hover:text-primary ${
                !item?.parent_id ? "mb-3 text-xl font-bold" : ""
              }`}
            >
              {item?.name}
            </Link>
          </div>
        );
      }
    });
  };

  return (
    <div className={`w-full bg-lightGray`}>
      <BreadcrumbsStatic
        breadcrumbs={[{ name: "Kategorije", slug: "/sve-kategorije" }]}
        title={"Kategorije"}
      />
      <div
        className={`sectionPaddingX sectionPaddingY grid max-w-[1920px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
      >
        {renderCategories(categories)}
      </div>
    </div>
  );
};

export default AllCategories;
