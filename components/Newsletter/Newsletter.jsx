"use client";
import React, { useState } from "react";
import { post } from "@/api/api";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const changeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email?.includes("@")) {
      setError(true);
      toast.error("Mejl nije validan", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setError(false);
      await post("/newsletter", { email: email }).then((response) => {
        if (response?.code !== 200) {
          setEmail("");
          toast.error(response?.payload?.message || "Error 404", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setError(true);
        } else {
          setEmail("");
          setError(false);
          toast.success(response?.payload?.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }
  };

  return (
    <div className="flex flex-col">
      <p className="mb-8 text-[15px]">
        Prijavite se i prvi saznajte za nove proizvode, tehnologije, akcije i
        sadržaje na online prodavnici.
      </p>
      <form className="relative w-full" onSubmit={onSubmit}>
        <input
          placeholder="Unesite email"
          type="text"
          id="email"
          name="email"
          onChange={changeHandler}
          value={email}
          className={`${error ? "border-red-500" : "border-[#cecece]"} mainInput !mt-0 !py-3 !text-black`}
        />
        <button
          className="mainButton right-0 top-0 max-sm:mt-4 max-sm:w-full sm:absolute"
          type="submit"
        >
          Prijavite se
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
