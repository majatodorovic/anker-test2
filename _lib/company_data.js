export const company_data = {
  default: {
    name: process.env["NAME"],
    telephone: process.env["TELEPHONE"],
    email: process.env["EMAIL"],
    street_address: process.env["STREET_ADDRESS"],
    city: process.env["CITY"],
    postal_code: process.env["POSTAL_CODE"],
    address_country: process.env["ADDRESS_COUNTRY"],
  },
  stores: [
    {
      name: "Anker - Beograd",
      telephone: "+381 60 629 31 13",
      email: "office@atompartner.com",
      street_address: "Kneginje Zorke 25",
      city: "Beograd",
      postal_code: "11000",
      address_country: "RS",
    },
  ],
};
