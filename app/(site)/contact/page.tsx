import { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with A3Y Photography to book your photography session in Paris.",
};

export default function Page() {
  return <ContactPage />
}