import Link from "next/link";
import Image from "next/image";
import React from "react";

function HeaderTop() {
  return (
    <div className="mx-auto w-full bg-black">
      <div className="sectionPaddingX flex h-10 w-full items-center justify-between">
        <div className="text-xs font-normal text-primary">
          Besplatna isporuka za iznos porudžbine preko 7.000 RSD
        </div>
        <div className="flex items-center gap-4">
          <Link href="/brend/anker">
            <Image
              src="/images/brands/brand0.svg"
              alt="Brand 1"
              width={60}
              height={28}
              className="mt-1 object-contain hover:opacity-60"
            />
          </Link>
          <Link href="/brend/soundcore">
            <Image
              src="/images/brands/brand1.svg"
              alt="Brand 1"
              width={100}
              height={28}
              className="object-contain hover:opacity-60"
            />
          </Link>
          <Link href="/brend/eufy">
            <Image
              src="/images/brands/brand2.svg"
              alt="Brand 2"
              width={43}
              height={28}
              className="object-contain hover:opacity-60"
            />
          </Link>
          <Link href="/brend/nebula">
            <Image
              src="/images/brands/brand3.svg"
              alt="Brand 3"
              width={85}
              height={28}
              className="object-contain hover:opacity-60"
            />
          </Link>
          <Link href="/brend/anker-solix">
            <Image
              src="/images/brands/brand4.svg"
              alt="Brand 4"
              width={105}
              height={28}
              className="object-contain hover:opacity-60"
            />
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            href="/strana/o-nama"
            className="relative w-fit text-xs font-normal text-white hover:text-primary"
          >
            O nama
          </Link>
          <div className="mx-[18px] h-3 w-[1px] bg-primary"></div>
          <Link
            href="/kontakt"
            className="relative w-fit text-xs font-normal text-white hover:text-primary"
          >
            Kontakt
          </Link>
          <div className="mx-[18px] h-3 w-[1px] bg-primary"></div>

          <Link
            href="/strana/kako-kupiti"
            className="relative w-fit text-xs font-normal text-white hover:text-primary"
          >
            Pomoć pri kupovini
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
