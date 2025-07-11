"use client";

import Image from "next/image";

const items = [
  {
    title: "200 Milliona+",
    description: "Preko 200 miliona prodatih proizvoda širom sveta.",
    icon: "/power-bank.svg",
  },
  {
    title: "12 Godina inovacija",
    description: "Pioniri u tehnologiji punjenja već 12 godina.",
    icon: "/green-innovation.svg",
  },
  {
    title: "146 Država",
    description: "Dostupno u 146 zemalja.",
    icon: "/earth.svg",
  },
  {
    title: "100 Miliona",
    description: "100 miliona globalnih kupaca.",
    icon: "/costumer.svg",
  },
];

const Benefits = () => {
  return (
    <div
      className="sectionPaddingX marginBottomSection bg-primary py-[70px]"
      data-aos="fade-up"
    >
      <div className="grid gap-5 max-xl:gap-8 md:grid-cols-2 2xl:grid-cols-4 3xl:gap-8">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-4">
            <div className="relative min-h-[90px] min-w-[90px]">
              <Image
                src={`/icons/benefits/${item.icon}`}
                alt={item.title}
                fill
                className="object-contain invert"
              />
            </div>
            <div className="flex flex-col items-start justify-between">
              <h3 className="transform text-2xl text-white transition-all duration-300 3xl:text-[27px]">
                {item.title}
              </h3>
              <div className="mb-5 mt-4 h-[1px] w-[86px] bg-white" />
              <p className="transform text-[15px] text-white opacity-90 transition-all duration-300 hover:opacity-100">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
