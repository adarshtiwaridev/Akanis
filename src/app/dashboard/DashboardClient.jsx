"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Video,
  Trash2,
} from "lucide-react";

/* ================= CONSTANTS ================= */
const ITEMS_PER_PAGE = 5;

/* ================= SMALL HELPER ================= */
function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-foreground/60">{label}</span>
      <span className="font-medium text-right">{value || "—"}</span>
    </div>
  );
}

export default function DashboardClient() {
  /* ================= CONTACT STATE ================= */
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
      if (!res.ok) throw new Error("Logout failed");
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
      // fallback
      window.location.href = "/login";
    }
  }; 
  /* ================= MEDIA STATE ================= */
  const [mediaType, setMediaType] = useState("photo"); // photo | video
  const [media, setMedia] = useState([]);

  /* ================= UPLOAD MODAL ================= */
  const [modalType, setModalType] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  /* ================= FETCH CONTACTS ================= */
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();

        const allowed = [
          "ad-shoot",
          "photo-shoot",
          "videography",
          "video-production",
          "branding",
          "social-media",
          "marketing",
        ];

        setContacts(data.filter((c) => allowed.includes(c.service)));
      } catch (err) {
        console.error("Contact fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  /* ================= FETCH MEDIA ================= */
  useEffect(() => {
    const fetchMedia = async () => {
      const res = await fetch(`/api/gallery?type=${mediaType}`);
      if (!res.ok) return;
      const data = await res.json();
      setMedia(data);
    };
    fetchMedia();
  }, [mediaType]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(contacts.length / ITEMS_PER_PAGE);

  const paginatedContacts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return contacts.slice(start, start + ITEMS_PER_PAGE);
  }, [contacts, page]);

  /* ================= UPLOAD ================= */
  const handleUpload = async () => {
    if (!file) return;

    try {
      // POST to our backend which will upload to Cloudinary securely
      const form = new FormData();
      form.append("file", file);
      form.append("title", title);
      form.append("tags", tags);
      form.append("type", modalType);

      const res = await fetch("/api/gallery", {
        method: "POST",
        body: form,
        credentials: "same-origin",
      });

      // redirect to login on auth failure
      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || "Upload failed");
      }

      const newItem = await res.json();

      // prepend new media to UI
      setMedia((prev) => [newItem, ...prev]);

      // Reset UI
      setModalType(null);
      setFile(null);
      setTitle("");
      setTags("");

    } catch (err) {
      console.error(err);
      alert("Upload failed: " + err.message);
    }
  };

  /* ================= DELETE MEDIA ================= */
  const handleDeleteMedia = async (id) => {
    const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE", credentials: "same-origin" });

    if (res.status === 401) {
      router.push("/login");
      return;
    }
    if(res.ok){
        toast.success("Media deleted successfully");
    } 

    if (!res.ok) {
      const err = await res.json();
      console.error("Delete failed:", err);
      alert(err?.message || "Delete failed");
      return;
    }
    setMedia((prev) => prev.filter((m) => m._id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground mt-20 px-8 py-10">

      {/* ================= FOUNDER SECTION ================= */}
      <div className=" mx-auto mb-14 rounded-3xl border hover:border-b-amber-800 border-border bg-card px-1 py-5 flex flex-col md:flex-row gap-8 items-center">
        <img
          src="/photos/image03.avif" // <-- replace with real image
          alt="Founder"
          className="h-28 w-28 rounded-full object-cover border border-border"
        />
        <div>
          <h2 className="text-2xl font-extrabold">Adarsh Tiwari</h2>
          <p className="text-sm text-foreground/60 mt-1">
            Founder & Full-Stack Engineer
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80">
            “We don’t chase trends — we build systems that last.  
            Every product here is crafted with discipline, performance,
            and long-term vision in mind.”
          </p>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap gap-5 items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold">Studio Dashboard</h1>
          <p className="text-sm text-foreground/60">
            Contacts, reels & media management
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={handleLogout} className="px-4 hover:bg-foreground/30 py-2 rounded-xl border border-border text-sm">Logout</button>
          <button
            onClick={() => setModalType("photo")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white"
          >
            <ImageIcon size={16} />
            Upload Photo
          </button>
          <button
            onClick={() => setModalType("video")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white"
          >
            <Video size={16} />
            Upload Video
          </button>
        </div>
      </div>

      {/* ================= CONTACT TABLE ================= */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-foreground/5">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              paginatedContacts.map((c) => (
                <tr
                  key={c._id}
                  onClick={() => setSelectedContact(c)}
                  className="border-t border-border hover:bg-foreground/5 cursor-pointer"
                >
                  <td className="px-6 py-4">{c.name}</td>
                  <td className="px-6 py-4">{c.email}</td>
                  <td className="px-6 py-4 capitalize">
                    {c.service.replace("-", " ")}
                  </td>
                  <td className="px-6 py-4">
                    {c.isRead ? (
                      <span className="flex items-center gap-2 text-green-500">
                        <CheckCircle size={16} /> Reviewed
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-red-500">
                        <XCircle size={16} /> New
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-border">
          <span className="text-sm text-foreground/60">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-lg border border-border disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ================= MEDIA LIBRARY ================= */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold">Media Library</h2>
          <div className="flex rounded-xl border border-border overflow-hidden">
            {['photo', 'video'].map((type) => (
              <button
                key={type}
                onClick={() => setMediaType(type)}
                className={`px-5 py-2 text-sm font-medium
                  ${mediaType === type
                    ? "bg-foreground text-background"
                    : "text-foreground/60"}`}
              >
                {type === "photo" ? "Photos" : "Videos"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {media.map((item) => (
            <div
              key={item._id}
              className="group relative rounded-xl overflow-hidden border border-border"
            >
              {mediaType === "photo" ? (
                <img src={item.url} className="h-40 w-full object-contain" />
              ) : (
                <video src={item.url} className="h-40 w-full object-cover" />
              )}

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <button
                  onClick={() => handleDeleteMedia(item._id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CONTACT DETAIL MODAL ================= */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="relative w-full max-w-xl bg-card rounded-2xl p-6">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute right-4 top-4"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
            <div className="space-y-3">
              <Detail label="Name" value={selectedContact.name} />
              <Detail label="Email" value={selectedContact.email} />
              <Detail label="Phone" value={selectedContact.phone} />
              <Detail label="Service" value={selectedContact.service} />
              <Detail label="Budget" value={selectedContact.budget} />
              <Detail label="Location" value={selectedContact.location} />
              <Detail label="Message" value={selectedContact.message} />
            </div>
          </div>
        </div>
      )}

      {/* ================= UPLOAD MODAL ================= */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="relative w-full max-w-lg bg-card rounded-2xl p-6">
            <button
              onClick={() => setModalType(null)}
              className="absolute right-4 top-4"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Upload {modalType}
            </h2>

            <input
              type="file"
              accept={modalType === "photo" ? "image/*" : "video/*"}
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4 w-full"
            />

            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-3 w-full rounded-xl border border-border px-4 py-2"
            />

            <input
              placeholder="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mb-5 w-full rounded-xl border border-border px-4 py-2"
            />

            <button
              onClick={handleUpload}
              className="w-full rounded-xl bg-accent py-3 font-semibold text-white"
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
