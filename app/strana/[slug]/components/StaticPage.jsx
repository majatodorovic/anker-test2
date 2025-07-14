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
                className="leading-tight"
              >
                {item?.content?.map((image) => (
                  <div
                    key={keyGenerator("image")}
                    className="w-full"
                  >
                    <Image
                      src={image?.file}
                      alt=""
                      width={16}
                      height={9}
                      className="w-full h-auto object-cover"
                      priority
                    />
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
