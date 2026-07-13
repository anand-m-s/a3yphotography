import { Metadata } from "next";
import ServicesPage from "./ServicePage";

export const metadata: Metadata = {
    title: "Photography Services",
    description:
        "Professional photography services in Paris including portraits, street photography, events and lifestyle sessions.",
};

export default function Page() {
    return <ServicesPage />;
}
