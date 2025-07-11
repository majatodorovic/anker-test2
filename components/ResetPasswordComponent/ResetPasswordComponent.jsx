"use client";
import { useState } from "react";
import Image from "next/image";
import { post } from "@/api/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ResetPasswordComponent = ({ token }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    pin: "",
    password: "",
    confirmPassword: "",
    token: token,
  });
  const required = ["pin", "password", "confirmPassword", "token"];
  const [errors, setErrors] = useState([]);

  const formChangeHandler = ({ target }) => {
    setErrors(errors.filter((item) => item != target.name));

    setFormData({ ...formData, [target.name]: target.value });
  };
  const formSubmitHandler = () => {
    const err = [];
    for (const key in formData) {
      const item = formData[key];
      if (required.includes(key) && (item === "" || item == null)) {
        err.push(key);
      }
    }

    if (err.length > 0) {
      setErrors(err);
    } else {
      if (formData["password"] !== formData["confirmPassword"]) {
        err.push("password", "confirmPassword");
        setErrors(err);
        toast.error(
          "Greška. Potvrđena lozinka se razlikuje od lozinke. Pokušajte ponovo.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          },
        );
        return;
      }
      const ret = {
        pin: formData.pin,
        password: formData.password,
        token: formData.token,
      };

      post("/customers/sign-in/reset-password", ret)
        .then((response) => {
          if (response?.code === 200) {
            toast.success("Uspešno ste resetovali šifru.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            router.push("/login");
          } else {
            toast.error("Greška. Proverite da li ste uneli ispravne podatke.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
          if (response?.code === 500 || response?.code === 400) {
            toast.error("Greška. Proverite da li ste uneli ispravne podatke.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
        })
        .catch((error) => console.warn(error));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((state) => !state);
  };

  return (
    <div className="sectionPaddingY mx-auto w-full max-w-xl">
      <div className="border bg-lightGray p-10">
        <div>
          <h3 className="mb-10 text-center text-xl uppercase">
            Resetujte lozinku
          </h3>
          <div className="mb-[1.4rem] flex flex-col">
            <label htmlFor="pin" className="font-medium">
              PIN: <span className="snap-mandatory text-red-500">*</span>
            </label>
            <input
              onChange={formChangeHandler}
              type="text"
              id="pin"
              name="pin"
              value={formData.pin}
              className={`mainInput ${
                errors.includes("pin")
                  ? "!ring-1 !ring-red-500 !ring-offset-2 !ring-offset-white"
                  : ""
              }`}
              placeholder="Unesite PIN koji ste dobili na mail"
            />
            {errors?.includes("pin") && (
              <div className={`mt-1 text-xs text-red-500`}>
                Ovo polje je obavezno.
              </div>
            )}
          </div>
          <div className="flex">
            <div className="mb-[1.4rem] mr-[0.4rem] flex w-full flex-col">
              <label htmlFor="password" className="font-medium">
                Unesite novu lozinku:{" "}
                <span className="snap-mandatory text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  onChange={formChangeHandler}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  className={`mainInput ${
                    errors.includes("password")
                      ? "!ring-1 !ring-red-500 !ring-offset-2 !ring-offset-white"
                      : ""
                  }`}
                  placeholder="Unesite novu lozinku"
                />
                <button
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-[18px]"
                >
                  {showPassword ? (
                    <Image
                      src={"/icons/hide-password.png"}
                      alt="hide password"
                      width={22}
                      height={22}
                    />
                  ) : (
                    <Image
                      src={"/icons/show-password.png"}
                      alt="show password"
                      width={22}
                      height={22}
                    />
                  )}
                </button>
              </div>
              {errors?.includes("password") && (
                <div className={`mt-1 text-xs text-red-500`}>
                  Ovo polje je obavezno.
                </div>
              )}
            </div>

            <div className="ml-[1.4rem] mr-[0.4rem] flex w-full flex-col">
              <label htmlFor="password" className="font-medium">
                Potvrdite lozinku:{" "}
                <span className="snap-mandatory text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  onChange={formChangeHandler}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.passwordconfirmed}
                  className={`mainInput ${
                    errors.includes("confirmPassword")
                      ? "!ring-1 !ring-red-500 !ring-offset-2 !ring-offset-white"
                      : ""
                  }`}
                  placeholder="Unesite lozinku"
                />
                <button
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-2 top-[18px]"
                >
                  {showConfirmPassword ? (
                    <Image
                      src={"/icons/hide-password.png"}
                      alt="hide password"
                      width={22}
                      height={22}
                    />
                  ) : (
                    <Image
                      src={"/icons/show-password.png"}
                      alt="show password"
                      width={22}
                      height={22}
                    />
                  )}
                </button>
              </div>
              {errors?.includes("confirmPassword") && (
                <div className={`mt-1 text-xs text-red-500`}>
                  Ovo polje je obavezno.
                </div>
              )}
            </div>
          </div>
          <button
            onClick={formSubmitHandler}
            className="mainButton mt-5 w-full"
          >
            Sačuvaj
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
