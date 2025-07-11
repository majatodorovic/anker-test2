import Image from "next/image";

// HELPER: dekodira HTML entitete (ako CMS escape-uje sadržaj)
const decodeHtml = (html) => {
  if (!html) return "";
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
};

const StaticPage = ({ data }) => {
  const staticData = data?.items?.map((item) => {
    return item;
  });

  const keyGenerator = (prefix) => {
    return `${prefix}-${Math.random().toString(36)}`;
  };

  return (
    <>
      {staticData?.map((item) => {
        switch (item?.type) {
          case "multiple_images":
            return (
              <div
                key={keyGenerator("multiple_images")}
                className="prose mx-auto w-[90%] !max-w-full leading-tight 2xl:w-[100%]"
              >
                {item?.content?.map((image) => (
                  <div
                    key={keyGenerator("image")}
                    className="relative col-span-1 flex justify-center"
                  >
                    <div
                        className={`max-sm:h-[220px] sm:h-[350px] lg:h-[550px] 2xl:h-[800px]`}
                      >
                    <Image src={image?.file} alt={``} fill priority />
                    </div>
                  </div>
                ))}
              </div>
            );

          case "html_editor":
          case "textarea":
            return (
              <div
                key={keyGenerator(item?.type)}
                className="prose !max-w-full"
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(item?.content),
                }}
              ></div>
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default StaticPage;
