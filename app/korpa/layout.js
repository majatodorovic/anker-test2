import { headers } from "next/headers";

// Metadata koja koristi samo headers
export const generateMetadata = async () => {
  const header_list = headers();
  const canonical = header_list?.get("x-pathname");

  return {
    title: `Korpa | Anker`,
    description: "Dobrodošli na Anker",
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `Korpa | Anker`,
      description: "Dobrodošli na Anker",
      type: "website",
      locale: "sr_RS",
    },
  };
};

// Glavni layout komponent
export default async function CartLayout({ children }) {
  return <div className="min-h-screen bg-lightGray mx-auto">{children}</div>;
}

export const revalidate = 30;
