"use client";

import { useEffect, useState } from "react";
import {
  Upload,
  X,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Video,
} from "lucide-react";

/* ================= SMALL HELPER ================= */
function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-foreground/60">{label}</span>
      <span className="font-medium text-right">
        {value || "—"}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // upload modal
  const [modalType, setModalType] = useState(null); // photo | video
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  // detail modal
  const [selectedContact, setSelectedContact] = useState(null);

  /* ================= FETCH CONTACTS ================= */
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contact");
        if (!res.ok) throw new Error("Failed to fetch");

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
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  /* ================= UPLOAD ================= */
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("type", modalType);

    await fetch("/api/gallery/upload", {
      method: "POST",
      body: formData,
    });

    setModalType(null);
    setFile(null);
    setTitle("");
    setTags("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground mt-20 px-8 py-10">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold">Media Dashboard</h1>
          <p className="text-sm text-foreground/60">
            Photography, reels & video management
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setModalType("photo")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white font-medium"
          >
            <ImageIcon size={16} />
            Upload Photo
          </button>

          <button
            onClick={() => setModalType("video")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white font-medium"
          >
            <Video size={16} />
            Upload Video
          </button>
        </div>
      </div>

      {/* ================= CONTACT TABLE ================= */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="max-h-[420px] overflow-y-auto">
          <table className="w-full text-left">
            <thead className="bg-foreground/5 sticky top-0">
              <tr>
                <th className="px-6 py-4 text-sm font-medium">Name</th>
                <th className="px-6 py-4 text-sm font-medium">Email</th>
                <th className="px-6 py-4 text-sm font-medium">Service</th>
                <th className="px-6 py-4 text-sm font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-6 text-center text-foreground/60">
                    Loading data...
                  </td>
                </tr>
              ) : (
                contacts.map((c) => (
                  <tr
                    key={c._id}
                    onClick={() => setSelectedContact(c)}
                    className="border-t border-border cursor-pointer hover:bg-foreground/5 transition"
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
        </div>
      </div>

      {/* ================= CONTACT DETAIL MODAL ================= */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl bg-card border border-border p-6">

            <button
              onClick={() => setSelectedContact(null)}
              className="absolute right-4 top-4 text-foreground/60"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Contact Details
            </h2>

            <div className="space-y-3 text-sm">
              <Detail label="Name" value={selectedContact.name} />
              <Detail label="Email" value={selectedContact.email} />
              <Detail label="Phone" value={selectedContact.phone} />
              <Detail label="Service" value={selectedContact.service} />
              <Detail label="Budget" value={selectedContact.budget} />
              <Detail label="Location" value={selectedContact.location} />
              <Detail label="Status" value={selectedContact.status} />
              <Detail
                label="Booked At"
                value={new Date(selectedContact.createdAt).toLocaleString()}
              />

              <div>
                <p className="font-medium text-foreground/70 mb-1">Message</p>
                <p className="rounded-xl border border-border bg-background p-3">
                  {selectedContact.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= UPLOAD MODAL ================= */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-card border border-border p-6">

            <button
              onClick={() => setModalType(null)}
              className="absolute right-4 top-4 text-foreground/60"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Upload {modalType === "photo" ? "Photo" : "Video"}
            </h2>

            <input
              type="file"
              accept={modalType === "photo" ? "image/*" : "video/*"}
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4 w-full"
            />

            <input
              placeholder="Title / Description"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-3 w-full rounded-xl border border-border bg-background px-4 py-2"
            />

            <input
              placeholder="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mb-5 w-full rounded-xl border border-border bg-background px-4 py-2"
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
