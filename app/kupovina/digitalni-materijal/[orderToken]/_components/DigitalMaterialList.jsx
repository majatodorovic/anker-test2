"use client";
import { formatDate } from "@/helpers/convertDate";

const DigitalMaterialList = ({ digitalMaterial }) => {
  if (digitalMaterial.items.length === 0) {
    return (
      <div className={`mx-auto mt-10 max-sm:w-[95%] sm:mx-[3rem]`}>
        <p className="text-center">Nema digitalnih materijala</p>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto mt-10 grid grid-cols-1 gap-5 max-sm:w-[95%] sm:mx-[3rem] md:grid-cols-2 xl:grid-cols-4`}
    >
      {digitalMaterial.items &&
        digitalMaterial.items.map((item) => {
          return (
            <div key={item.id}>
              <h3 className={`text-xl`}>{item.title}</h3>
              {item._details.download_file_path &&
                (item._details.download_file_path.startsWith("data:video/") ? (
                  <video controls className="mt-4 h-auto w-full">
                    <source
                      src={item._details.download_file_path}
                      type="video/mp4"
                    />
                    Vaš pregledač ne podržava video tag.
                  </video>
                ) : (
                  <a
                    href={item._details.download_file_path}
                    download
                    className="text-blue-500 hover:underline"
                  >
                    Preuzmi dokument
                  </a>
                ))}
              <p className={`mb-4 mt-2 text-sm text-gray-500`}>
                {item.short_description &&
                  `Kratak opis: ${item.short_description}`}
                {item.short_description}
              </p>
              <p className="mb-2 text-gray-700">
                {item.description && `Opis: ${item.description}`}
              </p>
              <p className="mb-2 text-gray-700">
                {item.expiration_date &&
                  `Ističe: ${formatDate(item.expiration_date)}`}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default DigitalMaterialList;
