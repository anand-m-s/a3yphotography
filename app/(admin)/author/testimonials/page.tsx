"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { useConfirm } from "@/components/ui/confirm-dialog";

type TestimonialDoc = {
    _id: string;
    name: string;
    quote: string;
    src?: string | null;
    createdAt?: string | null;
};

export default function TestimonialsAdminPage() {
    const [items, setItems] = useState<TestimonialDoc[]>([]);
    const [loading, setLoading] = useState(true);
    const confirm = useConfirm();

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            try {
                const res = await fetch("/api/testimonials", { cache: "no-store" });
                const json = await res.json();
                if (json.success && mounted) setItems(json.data || []);
                if (!json.success) toast.error("Failed to load testimonials");
            } catch (err) {
                console.error(err);
                toast.error("Failed to load testimonials");
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => {
            mounted = false;
        };
    }, []);

    const handleDelete = async (id: string) => {
        const ok = await confirm({
            title: "Delete testimonial?",
            description: "This will permanently remove the testimonial.",
            confirmText: "Delete",
            cancelText: "Cancel",
        });
        if (!ok) return;

        try {
            const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
            const json = await res.json();
            if (!res.ok || !json.success) {
                toast.error(json?.message || "Delete failed");
                return;
            }
            setItems((prev) => prev.filter((t) => t._id !== id));
            toast.success("Deleted");
        } catch (err) {
            console.error(err);
            toast.error("Delete failed");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Testimonials</h2>

            {loading ? (
                <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-md bg-muted animate-pulse">
                            <div className="w-12 h-12 rounded-full bg-neutral-200" />
                            <div className="flex-1">
                                <div className="h-4 bg-neutral-200 rounded w-1/2 mb-2" />
                                <div className="h-3 bg-neutral-200 rounded w-3/4" />
                            </div>
                            <div className="w-20 h-8 rounded bg-neutral-200" />
                        </div>
                    ))}
                </div>
            ) : items.length === 0 ? (
                <p className="text-muted-foreground">No testimonials yet.</p>
            ) : (
                <div className="grid gap-3">
                    {items.map((t) => (
                        <div key={t._id} className="flex items-start gap-4 p-4 rounded-md border border-border bg-background">
                            <div className="w-14 h-14 rounded overflow-hidden bg-neutral-100 shrink-0">
                                {t.src ? (
                                    <Image src={t.src} alt={t.name} width={56} height={56} className="object-cover" unoptimized />
                                ) : (
                                    <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-sm text-muted-foreground">
                                        {t.name?.[0] ?? "?"}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="font-medium">{t.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {t.createdAt ? new Date(t.createdAt).toLocaleString() : ""}
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-2 text-sm leading-snug">{t.quote}</p>
                            </div>

                            <div className="flex flex-col gap-2 items-end">
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(t._id)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
