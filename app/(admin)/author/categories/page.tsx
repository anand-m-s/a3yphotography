"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useConfirm } from "@/components/ui/confirm-dialog";

type Category = {
  _id: string;
  name: string;
  slug: string;
  // if your API returns createdAt etc, you can add them later
};

type FormState = {
  name: string;
};

const emptyForm: FormState = {
  name: "",
};

export default function CategoriesPanel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const confirm = useConfirm();

  // local slug preview (for UX only, DB still creates real slug)
  const slugFromName = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");

  const slugPreview = form.name ? slugFromName(form.name) : "";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        const json = await res.json();
        if (json.success) {
          setCategories(json.data);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat._id);
    setForm({
      name: cat.name ?? "",
    });
  };


  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete this category?",
      description: "This action cannot be undone. All images in this category will remain, but the category will be removed.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Delete failed");
        return;
      }

      setCategories((prev) => prev.filter((c) => c._id !== id));
      toast.success("Category deleted");
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("Something went wrong");
    }
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),
      };

      let res: Response;

      if (editingId) {
        res = await fetch(`/api/admin/categories/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // create new category
        res = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        console.error("Save failed");
        toast.error("save failed")
        return;
      }

      toast.success("category created")

      const json = await res.json();
      const saved: Category = json.data;

      setCategories(prev => {
        if (editingId) {
          return prev.map(c => (c._id === saved._id ? saved : c));
        }
        return [saved, ...prev];
      });

      resetForm();
    } catch (err) {
      console.error("Error saving category:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-10 md:grid-cols-[2fr,3fr] h-full">
      {/* Left: form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-6 space-y-5 shadow-sm"
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold tracking-tight">
            {editingId ? "Edit Category" : "Add Category"}
          </h3>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-muted-foreground underline"
            >
              Cancel edit
            </button>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-3xl  border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
            placeholder="e.g. Portraits"
            required
          />
          {form.name && (
            <p className="text-[11px] text-muted-foreground mt-1">
              Slug preview: <code>/gallery/{slugPreview}</code>
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting
            ? editingId
              ? "Updating..."
              : "Creating..."
            : editingId
              ? "Update Category"
              : "Create Category"}
        </Button>
      </form>

      {/* Right: list of categories */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Existing Categories
        </h3>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No categories yet. Add one using the form on the left.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {categories.map(cat => (
              <div
                key={cat._id}
                className="flex flex-col rounded-xl border border-border bg-background/70 p-4 gap-3"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">{cat.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    /gallery/{cat.slug}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="text-[11px] text-muted-foreground">
                    {/* ID: {cat._id.slice(-6)} */}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(cat)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="default"
                      size="sm"
                      onClick={() => handleDelete(cat._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
