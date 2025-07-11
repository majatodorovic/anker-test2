import { list as LIST } from "@/api/api";
import AllPosts from "@/app/vesti/components/AllPosts";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

const getAllBlogPosts = async () => {
  return await LIST(`/news/category/list/all`).then(
    (res) => res?.payload?.items
  );
};

const Blog = async () => {
  const posts = await getAllBlogPosts();

  return (
    <>
      <BreadcrumbsStatic breadcrumbs={[{ name: "Vesti", url: "/vesti" }]} title={'Vesti'} />
      <AllPosts posts={posts} />
    </>
  );
};

export default Blog;

export const revalidate = 30;

export const metadata = {
  title: "Blog | Anker",
  description: "Anker Vesti",
  robots: {
    index: true,
    follow: true,
  },
};
