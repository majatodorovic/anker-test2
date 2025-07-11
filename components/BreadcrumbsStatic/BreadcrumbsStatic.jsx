"use client";
import Link from "next/link";

const BreadcrumbsStatic = ({ title, breadcrumbs = [] }) => {
  const capitalize = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);

  // Mapa slugova u naslove sa dijakritikom
  const slugToTitleMap = {
    "uslovi-koriscenja": "Uslovi korišćenja",
    "opsti-uslovi-poslovanja": "Opšti uslovi poslovanja",
    "politika-kolacica": "Politika kolačića",
    // Dodaj ostale slugove koje koristiš
  };

  // Funkcija koja vraća pravi naslov iz sluga
  const slugToTitle = (slug) => {
    if (!slug) return "";
    return (
      slugToTitleMap[slug] ||
      slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };

  return (
    <div data-aos="fade-right" className="w-full bg-white">
      <div className="sectionPaddingX">
        <div className="mb-20 flex items-center gap-2 overflow-x-auto pb-2 pt-10">
          <Link className={`text-base font-light`} href={`/`}>
            Anker
          </Link>

          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index + 1 === breadcrumbs.length;
            const slugKey = breadcrumb.name.toLowerCase().replaceAll(" ", "-");
            const label =
              slugToTitleMap[slugKey] || capitalize(breadcrumb.name);

            return (
              <div key={index} className="flex">
                <span className="mx-2 text-base">/</span>
                {breadcrumb.url ? (
                  <Link
                    href={breadcrumb.url}
                    className={`whitespace-nowrap font-light ${index + 1 === breadcrumbs.length && "text-primary underline"}`}
                  >
                    {label}
                  </Link>
                ) : (
                  <div
                    className={`whitespace-nowrap font-light ${index + 1 === breadcrumbs.length && "text-primary underline"}`}
                  >
                    {label}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {title && (
          <div className="flex flex-col gap-1.5 pb-10">
            <h1 className="text-2xl font-light lg:text-[29px]">
              {slugToTitle(title.toLowerCase().replaceAll(" ", "-"))}
            </h1>
            <div className="h-[2px] w-[200px] bg-primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BreadcrumbsStatic;
