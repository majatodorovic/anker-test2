import Image from "next/image";

const DeliveryInfo = () => {
  return (
    <div className="flex flex-row md:flex-col md:fixed md:right-0 md:top-[30%] md:rounded-l-lg md:bg-white md:drop-shadow-2xl md:max-w-[114px] md:px-5 md:py-[37px] md:gap-[30px] gap-[10px] md:z-[100] md:text-center md:items-center md:justify-center mt-5 md:mt-0 justify-between items-center py-5 w-full">
      <div className="flex flex-col items-center text-center justify-center">
        <Image
          src="/icons/package.png"
          alt="free delivery"
          width={50}
          height={50}
          className="w-[30px] md:w-[50px] h-auto"
        />
        <p className="text-sm regular">Besplatna dostava</p>
      </div>
      <div className="flex flex-col items-center text-center justify-center">
        <Image
          src="/icons/calendar.png"
          alt="2 dana isporuka"
          width={47}
          height={42}
          className="w-[30px] md:w-[47px] h-auto"
        />
        <p className="text-sm regular">2 dana isporuka</p>
      </div>
      <div className="flex flex-col items-center text-center justify-center">
        <Image
          src="/icons/delivery-status.png"
          alt="Povrat do 14 dana"
          width={46}
          height={46}
          className="w-[30px] md:w-[46px] h-auto"
        />
        <p className="text-sm regular">Povrat do 14 dana</p>
      </div>
    </div>
  );
};

export default DeliveryInfo;
