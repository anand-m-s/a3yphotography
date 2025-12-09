"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "sonner";
import Image from "next/image";
import { useConfirm } from "@/components/ui/confirm-dialog";


type Category = {
  _id: string;
  name: string;
  slug: string;
};

type ImageDoc = {
  _id: string;
  url: string;
  category: Category | string;
};

export default function ImagesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState<ImageDoc[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [uploadResetKey, setUploadResetKey] = useState(0);

  const confirm = useConfirm();

  // load categories for dropdown
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        const json = await res.json();
        if (json.success) {
          setCategories(json.data);
          if (json.data.length > 0) {
            setSelectedCategory(json.data[0]._id);
          }
        }
      } catch (e) {
        console.error("Failed to load categories", e);
      }
    };
    loadCategories();
  }, []);

  // load images for selected category
  useEffect(() => {
    if (!selectedCategory) return;

    const loadImages = async () => {
      setLoadingImages(true);
      try {
        const res = await fetch(
          `/api/admin/images?categoryId=${selectedCategory}`
        );
        const json = await res.json();
        if (json.success) {
          setImages(json.data);
        }
      } catch (e) {
        console.error("Failed to load images", e);
      } finally {
        setLoadingImages(false);
      }
    };

    loadImages();
  }, [selectedCategory]);



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      toast.error("please select a category")
      return;
    }
    if (files.length === 0) {
      toast.error("please select at least one image :)")
      return;
    }

    setSubmitting(true);
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

      // 1️⃣ upload all files to Cloudinary
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Failed to upload to Cloudinary");
        }

        const json = await res.json();
        return json.secure_url as string;
      });

      const urls = await Promise.all(uploadPromises);

      // 2️⃣ save URLs in MongoDB
      const saveRes = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: selectedCategory,
          images: urls,
        }),
      });

      if (!saveRes.ok) {
        console.error("Failed to save images in DB");
        return;
      }

      const saveJson = await saveRes.json();
      const created: ImageDoc[] = saveJson.data;

      setImages((prev) => [...created, ...prev]);
      setFiles([]); // reset selection
      setUploadResetKey((k) => k + 1);  // 👈 reset FileUpload previews
      toast.success("images uploaded sucessfully :)")
    } catch (err) {
      console.error("Error uploading images:", err);
      alert("Error uploading images");
    } finally {
      setSubmitting(false);
    }
  };


  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete this image?",
      description: "This will remove the image from this gallery.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/images/${id}`, {
        method: "DELETE",
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Image deleted");
        setImages((prev) => prev.filter((img) => img._id !== id));
      } else {
        toast.error("Failed to delete image");
      }
    } catch (e) {
      toast.error("Error deleting image");
    }
  };


  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold tracking-tight">Upload Images</h2>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-8 md:grid-cols-[2fr,3fr]"
      >
        <div className="space-y-4 rounded-2xl border border-border bg-background/80 p-6 backdrop-blur-sm shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name} ({cat.slug})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Images</label>
            <FileUpload
              key={uploadResetKey}
              onChange={(newFiles) =>
                setFiles((prev) => [...prev, ...newFiles])
              }
            />
            <p className="text-[11px] text-muted-foreground">
              You can select multiple images at once.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Uploading..." : "Upload Images"}
          </Button>
        </div>

        {/* Right side: preview of images for this category */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Existing Images
          </h3>

          {loadingImages ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : images.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No images yet in this category.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((img) => (
                <div
                  key={img._id}
                  className="group relative aspect-[3/4] overflow-hidden rounded-md border border-border"
                >
                  <Image
                    src={img.url}
                    alt=""
                    width={300}
                    height={400}
                    className="h-full w-full object-cover rounded-md"
                    unoptimized
                  />

                  <button
                    type="button"
                    onClick={() => handleDelete(img._id)}
                    className="
                        absolute top-2 right-2
                        bg-red-600/80 hover:bg-red-700
                        text-white text-xs px-2 py-1
                        rounded-md opacity-0 group-hover:opacity-100
                        transition cursor-pointer
                      "
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

          )}
        </div>
      </form>
    </div>
  );
}
