"use client";

import { Tabs } from "@/components/ui/tabs";




export default function AdminTabs() {

    const tabs = [
        {
            title: "Categories",
            value: "categories",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white 
                bg-gradient-to-br from-purple-400 to-violet-700"
                >
                    <p>Manage Categories</p>
                    {/* 🔧 Add Category Form will go here */}


                </div>
            ),
        },
        {
            title: "Add Images",
            value: "add-images",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-indigo-500 to-blue-800">
                    <p>Upload Images</p>
                    {/* 📸 Upload Images Form will go here */}



                </div>
            ),
        },
        {
            title: "Testimonials",
            value: "testimonials",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-cyan-400 to-blue-600">
                    <p>Manage Testimonials</p>
                    {/* ⭐ Testimonials Form will go here */}
                </div>
            ),
        },
    ];

    return (



        <div>

            <div className="h-[25rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-6xl mx-auto w-full items-start justify-start my-20">
                <Tabs tabs={tabs} />
            </div>

        </div>

    );
}
