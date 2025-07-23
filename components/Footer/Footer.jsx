"use client";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "../Newsletter/Newsletter";

const Footer = () => {
  return (
    <div className="mx-auto mt-20 w-full bg-black pt-[70px] text-white lg:mt-[100px] 2xl:mt-[120px]">
      <div className="sectionPaddingX">
        <div className="flex items-center justify-between border-b border-l-0 border-r-0 border-t-0 border-b-primary pb-6 max-xl:flex-col max-sm:items-start">
          <div className="flex items-center gap-20 max-xl:flex-col max-xl:gap-0">
            <div>
              <Link href={`/`}>
                <Image
                  src={"/images/logo/logo.svg"}
                  width={214}
                  height={45}
                  alt="Croonus Logo"
                />
              </Link>
            </div>
            <div className="flex items-center max-xl:mt-10 max-sm:flex-col max-sm:items-start max-sm:gap-1 sm:gap-5">
              <div className="flex flex-col">
                <div>Pozovite nas:</div>
                <a
                  href={`tel:${process.env.TELEPHONE}`}
                  className="font-light hover:text-primary"
                >
                  {process.env.TELEPHONE}
                </a>
              </div>
              <div className="bg-primary sm:h-8 sm:w-[1px]"></div>
              <div>
                <div>Anker Experience Store:</div>
                <Link
                  href="https://www.google.com/maps/place/%D0%A2%D0%A6+%22%D0%93%D0%B0%D0%BB%D0%B5%D1%80%D0%B8%D1%98%D0%B0%22/@44.8021781,20.4440487,771m/data=!3m1!1e3!4m10!1m2!2m1!1sTC+Galerija+2.+sprat,+Beograd!3m6!1s0x475a6552e46a468f:0x8a7d95d9015cc2cf!8m2!3d44.8027352!4d20.4464364!15sCh1UQyBHYWxlcmlqYSAyLiBzcHJhdCwgQmVvZ3JhZFodIht0YyBnYWxlcmlqYSAyIHNwcmF0IGJlb2dyYWSSAQ9zaG9wcGluZ19jZW50ZXKaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUmhiVXBFWDFsQkVBRaoBbAoNL2cvMTFma3ZwbWZieBABKhciE3RjIGdhbGVyaWphIDIgc3ByYXQoHTIfEAEiG7IwwGHsc2T_Q6JoeCCbRl_jeT44WH99t87QaDIfEAIiG3RjIGdhbGVyaWphIDIgc3ByYXQgYmVvZ3JhZOABAPoBBQjRARAv!16s%2Fg%2F11fkvpmfbx?entry=ttu"
                  target="_blank"
                >
                  <div className="font-light">
                    TC Galerija 2. sprat, Beograd
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1 max-xl:mt-10">
            <a
              href="https://www.facebook.com/ankersrbija"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              Facebook
            </a>
            <div className="mx-2 h-3 w-[1px] bg-primary"></div>
            <a
              href="https://www.instagram.com/ankersrbija?igsh=OTBpOHZ2ZG0xZW9k"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              Instagram
            </a>
            <div className="mx-2 h-3 w-[1px] bg-primary"></div>
            <a
              href="https://www.youtube.com/user/AnkerOceanwing"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              Youtube
            </a>
            <div className="mx-2 h-3 w-[1px] bg-primary"></div>
            <a
              href="https://www.tiktok.com/discover/anker-srbija"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              TikTok
            </a>
          </div>
        </div>
        <div className="flex justify-between gap-10 pt-8 max-xl:flex-col 2xl:gap-20">
          <div className="flex w-full flex-col">
            <div className="flex flex-wrap items-center gap-1 text-[15px]">
              <Link
                href={`/strana/opsti-uslovi-poslovanja`}
                className="hover:text-primary"
              >
                Opšti uslovi poslovanja
              </Link>
              <div className="mx-2 h-3 w-[1px] bg-primary"></div>

              <Link
                href={`/strana/opsti-uslovi-poslovanja#politika-reklamacija`}
                className="hover:text-primary"
              >
                Reklamacije
              </Link>
              <div className="mx-2 h-3 w-[1px] bg-primary"></div>
              <Link
                href={`/strana/politika-privatnosti`}
                className="hover:text-primary"
              >
                Politika privatnosti
              </Link>
              <div className="mx-2 h-3 w-[1px] bg-primary"></div>
              <Link
                href={`/strana/politika-kolacica`}
                className="hover:text-primary"
              >
                Politika kolačića
              </Link>
              <div className="mx-2 h-3 w-[1px] bg-primary"></div>
              <Link
                href={`/strana/opsti-uslovi-poslovanja#pravo-na-odustajanje-od-ugovora`}
                className="hover:text-primary"
              >
                Pravo na odustajanje od ugovora
              </Link>
              <div className="mx-2 h-3 w-[1px] bg-primary"></div>

              <Link
                href={`/strana/opsti-uslovi-poslovanja#politika-reklamacija`}
                className="hover:text-primary"
              >
                Zamena artikala
              </Link>
              <div className="mx-2 h-3 w-[1px] bg-primary"></div>

              <Link href={`/strana/kako-kupiti`} className="hover:text-primary">
                Kako kupiti
              </Link>
              <div className="mx-2 h-3 w-[1px] bg-primary"></div>

              <Link href={`/strana/o-nama`} className="hover:text-primary">
                O nama
              </Link>
              <div className="mx-2 h-3 w-[1px] bg-primary"></div>
              <Link href={`/kontakt`} className="hover:text-primary">
                Kontakt
              </Link>
              <div className="mx-2 h-3 w-[1px] bg-primary"></div>
              <Link href={`/sve-kategorije`} className="hover:text-primary">
                Kategorije
              </Link>
            </div>
            <p className="mb-[50px] mt-[50px] max-w-[680px] text-[13px] lg:mt-[90px]">
              Cene na sajtu su iskazane u dinarima sa uračunatim porezom, a
              plaćanje se vrši isključivo u dinarima. Isporuka se vrši SAMO na
              teritoriji Republike Srbije. Nastojimo da budemo što precizniji u
              opisu proizvoda, prikazu slika i samih cena, ali ne možemo
              garantovati da su sve informacije kompletne i bez grešaka. Svi
              artikli prikazani na sajtu su deo naše ponude i ne podrazumeva da
              su dostupni u svakom trenutku. Raspoloživost robe možete proveriti
              pozivanjem Call Centra na{" "}
              <a
                href={`tel:${process.env.TELEPHONE}`}
                className="hover:text-primary"
              >
                {process.env.TELEPHONE}
              </a>{" "}
              (po ceni lokalnog poziva).
            </p>
            <div className="flex flex-wrap items-center gap-1">
              <a
                href={`http://www.mastercard.com/rs/consumer/credit-cards.html`}
                rel={"noreferrer"}
                target={"_blank"}
              >
                <Image
                  src={"/icons/bank/idcheck.webp"}
                  width={50}
                  height={30}
                  alt="Master Card"
                  className="h-[30px] w-auto rounded-md border border-white bg-white"
                />
              </a>
              <a
                href={`https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html`}
                rel={"noreferrer"}
                target={"_blank"}
              >
                <Image
                  src={"/icons/bank/visaSecure.webp"}
                  width={50}
                  height={30}
                  alt="Master Card"
                  className="h-[30px] w-auto rounded-md border border-white bg-white"
                />
              </a>
              <a
                href={`https://www.otpbanka.rs`}
                rel={"noreferrer"}
                target={"_blank"}
              >
                <Image
                  src={"/icons/bank/otp.jpg"}
                  width={200}
                  height={70}
                  alt="Master Card"
                  className="h-[30px] w-auto rounded-md border border-white bg-white"
                />
              </a>
              <div>
                <Image
                  src={"/icons/bank/mastercard.webp"}
                  width={50}
                  height={30}
                  alt="Master Card"
                  className="h-[30px] w-auto rounded-md border border-white bg-white"
                />
              </div>
              <div>
                <Image
                  src={"/icons/bank/maestro.webp"}
                  width={50}
                  height={30}
                  alt="Master Card"
                  className="h-[30px] w-auto rounded-md border border-white bg-white"
                />
              </div>
              <div>
                <Image
                  src={"/icons/bank/dinacard.webp"}
                  width={50}
                  height={30}
                  alt="Master Card"
                  className="h-[30px] w-auto rounded-md border border-white bg-white"
                />
              </div>

              <div>
                <Image
                  src={"/icons/bank/visa.webp"}
                  width={50}
                  height={30}
                  alt="Visa"
                  className="h-[30px] w-auto rounded-md border border-white bg-white"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:min-w-[360px]">
            <Newsletter />
            <div className="mt-12 text-sm">Generalni zastupnik:</div>
            <div className="mb-2 mt-5">
              <Image
                src={"/images/logo/logo-atom.png"}
                width={168}
                height={30}
                alt="Logo"
              />
            </div>
            <div className="text-[15px]">
              <Link
                href="https://www.google.com/maps/place/%D0%9A%D0%BD%D0%B5%D0%B3%D0%B8%D1%9A%D0%B5+%D0%97%D0%BE%D1%80%D0%BA%D0%B5+25,+%D0%91%D0%B5%D0%BE%D0%B3%D1%80%D0%B0%D0%B4+11000/@44.8009529,20.4692087,771m/data=!3m2!1e3!4b1!4m6!3m5!1s0x475a700af8d1c09f:0xb9b11943161101fc!8m2!3d44.8009529!4d20.4692087!16s%2Fg%2F11bw4hbgv3?entry=ttu"
                target="_blank"
              >
                <div>Kneginje Zorke 25, Beograd, Srbija</div>
              </Link>
              <div className="flex items-center max-sm:flex-col max-sm:items-start sm:gap-2">
                <a
                  href={`tel:+381 (11) 20 90 801`}
                  className="font-light hover:text-primary"
                >
                  +381 (11) 20 90 801
                </a>
                <div className="bg-primary sm:h-4 sm:w-[1px]"></div>
                <a
                  href={`tel:+381 (11) 20 90 855`}
                  className="font-light hover:text-primary"
                >
                  +381 (11) 20 90 855
                </a>
              </div>
              <div className="flex items-center max-sm:mt-2 max-sm:flex-col max-sm:items-start sm:gap-2">
                <a
                  href={`mailto:${process.env.EMAIL}`}
                  className="hover:text-primary"
                >
                  {process.env.EMAIL}
                </a>
                <div className="bg-primary sm:h-4 sm:w-[1px]"></div>
                <Link
                  target="_blank"
                  href={`https://www.atompartner.rs`}
                  className="hover:text-primary"
                >
                  www.atompartner.rs
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between py-14 max-md:flex-col">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Anker Srbija | Sva prava zadržana.
            Powered by{" "}
            <a
              href="https://www.croonus.com"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer text-primary"
            >
              Croonus Technologies
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
