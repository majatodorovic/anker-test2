"use client";
export const Buttons = ({ handleOpen, buttons }) => {
  return (
    <div className={`mt-5 flex flex-col items-center gap-5 sm:flex-row`}>
      <button
        name={buttons?.first?.name}
        onClick={({ target: { name } }) => {
          handleOpen(name);
        }}
        className={`mainButton w-full !bg-white !text-primary hover:!bg-primary hover:!text-white`}
      >
        {buttons?.first?.text}
      </button>
      <button
        name={buttons?.second?.name}
        onClick={({ target: { name } }) => {
          handleOpen(name);
        }}
        className={`mainButton w-full !bg-white !text-primary hover:!bg-primary hover:!text-white`}
      >
        {buttons?.second?.text}
      </button>
    </div>
  );
};
