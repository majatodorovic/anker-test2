"use client";
import { useCallback, useState } from "react";
import {
  GoogleReCaptchaProvider as Provider,
  GoogleReCaptcha as ReCaptcha,
} from "react-google-recaptcha-v3";
import { post as POST } from "@/api/api";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = ({ defaultMessage }) => {
  const [token, setToken] = useState();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const requiredFields = [
    "customer_name",
    "phone",
    "email",
    "subject",
    "message",
    "accept_rules",
  ];

  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);

  const [formData, setFormData] = useState({
    page_section: "contact_page",
    customer_name: "",
    phone: "",
    email: "",
    subject: "",
    message: defaultMessage ? defaultMessage : "",
    accept_rules: false,
    gcaptcha: token,
  });

  const handleChange = ({ target }) => {
    let err = [];
    err = errors.filter((error) => error !== target.name);
    setErrors(err);

    if (target.name === "accept_rules") {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const errors = [];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors.push(field);
      }
      setErrors(errors);
    });
    if (errors?.length > 0) {
      setLoading(false);
    } else {
      await POST(`/contact/contact_page?form_section=contact_page`, {
        ...formData,
        gcaptcha: token,
      }).then((res) => {
        if (res?.code === 200) {
          toast.success("Uspešno ste poslali poruku!", {
            position: "top-center",
            autoClose: 2000,
          });
          setLoading(false);
          setFormData({
            page_section: "contact_page",
            customer_name: "",
            phone: "",
            email: "",
            subject: "",
            message: "",
            accept_rules: false,
            gcaptcha: token,
          });
        } else {
          toast.error("Došlo je do greške! Pokušajte ponovo.", {
            position: "top-center",
            autoClose: 2000,
          });
          setLoading(false);
          setFormData({
            page_section: "contact_page",
            customer_name: "",
            phone: "",
            email: "",
            subject: "",
            message: "",
            accept_rules: false,
            gcaptcha: token,
          });
        }
      });
    }
  };

  return (
    <Provider reCaptchaKey={process.env.CAPTCHAKEY}>
      <ReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={false} />
      <div className={`grid w-full grid-cols-3 gap-x-10 gap-y-10`}>
        <div className={`col-span-3 lg:col-span-1`}>
          <p>
            Ukoliko imate pitanja, sugestije ili želite da se učlanite u našu
            organizaciju, slobodno nam se obratite. Odgovorićemo Vam u najkraćem
            roku.
          </p>
          <div className={`mt-5 flex flex-col gap-2`}>
            <div className={`flex items-center gap-2`}>
              <i
                className={`fa fa-map-marker w-5 text-[16px] text-primary`}
              ></i>
              <span>
                <span className={`font-bold`}>Adresa 1:</span>{" "}
                {process.env.ADDRESS}
              </span>
            </div>
            <div className={`flex items-center gap-2`}>
              <i className={`fa fa-phone w-5 text-[16px] text-primary`}></i>
              <span>
                <span className={`font-bold`}>Kontakt telefon:</span>{" "}
                <a href={`tel:${process.env.TELEPHONE}`}>
                  {process.env.TELEPHONE}
                </a>
              </span>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`col-span-3 mx-auto w-full border bg-lightGray lg:col-span-2`}
        >
          <div className={`grid grid-cols-2 gap-5 p-2 lg:p-5`}>
            <div className={`col-span-2 flex flex-col lg:col-span-1`}>
              <label htmlFor={`customer_name`}>Ime i prezime</label>
              <input
                required={true}
                type={`text`}
                value={formData.customer_name}
                placeholder="Unesite ime i prezime"
                name={`customer_name`}
                id={`customer_name`}
                onChange={handleChange}
                className={`${
                  errors.includes("customer_name")
                    ? "!ring-1 !ring-red-500 !ring-offset-2 !ring-offset-white"
                    : ""
                } mainInput`}
              />
              {errors.includes("customer_name") && (
                <p className={`text-sm text-red-500`}>Ovo polje je obavezno</p>
              )}
            </div>
            <div className={`col-span-2 flex flex-col lg:col-span-1`}>
              <label htmlFor={`phone`}>Telefon</label>
              <input
                required={true}
                type={`text`}
                value={formData.phone}
                placeholder="Unesite telefon"
                name={`phone`}
                id={`phone`}
                onChange={handleChange}
                className={`${
                  errors.includes("phone")
                    ? "!ring-1 !ring-red-500 !ring-offset-2 !ring-offset-white"
                    : ""
                } mainInput`}
              />
              {errors.includes("phone") && (
                <p className={`text-sm text-red-500`}>Ovo polje je obavezno</p>
              )}
            </div>
            <div className={`col-span-2 flex flex-col lg:col-span-1`}>
              <label htmlFor={`email`}>Email</label>
              <input
                required={true}
                type={`email`}
                name={`email`}
                value={formData.email}
                placeholder="Unesite email"
                id={`email`}
                onChange={handleChange}
                className={`${
                  errors.includes("email")
                    ? "!ring-1 !ring-red-500 !ring-offset-2 !ring-offset-white"
                    : ""
                } mainInput`}
              />
              {errors.includes("email") && (
                <p className={`text-sm text-red-500`}>Ovo polje je obavezno</p>
              )}
            </div>
            <div className={`col-span-2 flex flex-col lg:col-span-1`}>
              <label htmlFor={`subject`}>Naslov poruke</label>
              <input
                required={true}
                type={`text`}
                value={formData.subject}
                name={`subject`}
                placeholder="Unesite naslov poruke"
                id={`subject`}
                onChange={handleChange}
                className={`${
                  errors.includes("subject")
                    ? "!ring-1 !ring-red-500 !ring-offset-2 !ring-offset-white"
                    : ""
                } mainInput`}
              />
              {errors.includes("subject") && (
                <p className={`text-sm text-red-500`}>Ovo polje je obavezno</p>
              )}
            </div>
            <div className={`col-span-2 flex flex-col`}>
              <label htmlFor={`message`}>Poruka</label>
              <textarea
                name={`message`}
                placeholder="Unesite poruku"
                id={`message`}
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`${
                  errors.includes("message")
                    ? "!ring-1 !ring-red-500 !ring-offset-2 !ring-offset-white"
                    : ""
                } mainInput`}
              />
              {errors.includes("message") && (
                <p className={`text-sm text-red-500`}>Ovo polje je obavezno</p>
              )}
            </div>
            <div
              className={`col-span-2 flex flex-col items-start justify-between max-lg:gap-5 lg:flex-row lg:items-center`}
            >
              <div className={`flex flex-col gap-2`}>
                <div className={`flex items-center gap-2`}>
                  <input
                    required={true}
                    type={`checkbox`}
                    name={`accept_rules`}
                    id={`accept_rules`}
                    checked={formData.accept_rules}
                    onChange={handleChange}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={`accept_rules`}
                    className="flex h-5 w-5 cursor-pointer items-center justify-center border border-black bg-white text-white peer-checked:text-primary"
                  >
                    <i className="fa fa-check hidden"></i>
                  </label>
                  <label htmlFor={`accept_rules`}>
                    <span className={`text-base`}>
                      Slažem se sa{" "}
                      <Link
                        href={`/strana/uslovi-koriscenja`}
                        className={`text-primary underline`}
                      >
                        uslovima korišćenja
                      </Link>
                    </span>
                  </label>
                </div>
                {errors.includes("accept_rules") && (
                  <p className={`text-sm text-red-500`}>
                    Ovo polje je obavezno
                  </p>
                )}
              </div>
              <div className={`max-lg:w-full`}>
                <button
                  type={`button`}
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  className={`mainButton`}
                >
                  {loading ? (
                    <i
                      className={`fa fa-spinner fa-spin text-center text-white`}
                    ></i>
                  ) : (
                    `Pošalji`
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Provider>
  );
};

export default Contact;
