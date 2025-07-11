import { CartContextProvider } from "@/api/cartContext";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer/Footer";
import NavigationMobile from "@/components/Navigation/NavigationMobile";
import { UserProvider } from "@/context/userContext";
import CookieAlert from "@/components/CookieAlert/CookieAlert";
import Header from "@/components/Header/Header";
import { QueryProvider } from "@/components/QueryProvider";
import { ToastContainer } from "react-toastify";
import { AnalyticsGA4 } from "@/_components/shared/analyticsGA4";
import { AnalyticsGTM } from "@/_components/shared/analyticsGTM";
import { Suspense } from "react";
import Script from "next/script";
import AOSContainer from "@/helpers/AOSContainer";
import "aos/dist/aos.css";

const getHTMLLang = async () => {
  return process.env.HTML_LANG;
};

export default async function RootLayout({ children }) {
  return (
    <html lang={`${await getHTMLLang()}`}>
      <head>
        <link
          rel={`stylesheet`}
          href={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css`}
        />
        <Script
          src={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/js/regular.js`}
        ></Script>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
      </head>
      <body className="relative">
        <QueryProvider>
        <AOSContainer>
          <UserProvider>
            <CartContextProvider>
              <Header />
              <NavigationMobile />
              {children}
              <Footer />
              <ToastContainer />
            </CartContextProvider>
          </UserProvider>
          <Suspense>
            <AnalyticsGA4 />
              <AnalyticsGTM />
            </Suspense>
          </AOSContainer>
        </QueryProvider>
        <CookieAlert />
      </body>
    </html>
  );
}

export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "Početna | Anker",
  description: "Dobrodošli na Anker",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Početna | Anker",
    description: "Dobrodošli na Anker Online Shop",
    type: "website",
    url: "https://www.ankersrbija.rs/",
    siteName: "Anker Srbija",
    images: [
      {
        url: "https://www.ankersrbija.rs/images/logo/logo.svg", 
        width: 800,
        height: 600,
        alt: "Anker",
      },
    ],
    locale: "sr_RS",
  },
};
