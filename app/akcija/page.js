import { Suspense } from "react";
import ActionProductsPage from "./components/ActionProductsPage";
import { list } from "@/api/api";

const getActionProducts = () => {
  return list("/products/section/list/action").then(
    (res) => res?.payload?.items,
  );
};

const Akcija = async () => {
  const actionProducts = await getActionProducts();

  return (
    <Suspense
      fallback={
        <div className="grid max-md:grid-cols-2 gap-y-[40px] md:grid-cols-3 2xl:grid-cols-4 gap-[11px]">
          <>
            {Array.from({ length: 12 }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="aspect-2/3 w-full col-span-1 bg-slate-300 object-cover animate-pulse"
                />
              );
            })}
          </>
        </div>
      }
    >
      <ActionProductsPage actionProducts={actionProducts} />
    </Suspense>
  );
};

export default Akcija;

export const metadata = {
  title: "Akcija | Anker",
  description: "Dobrodošli na Anker Online Shop",
};
