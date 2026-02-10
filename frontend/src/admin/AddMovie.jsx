import React, { useState } from "react";
import axios from "axios";

export default function AddMovie() {
  const [form, setForm] = useState({
    name: "",
    releasedate: "",
    length: "",
    genre: "",
    languages: "",
    category: "",
    castNames: "",
    theaters: "",
    description: "",
    encodeName: "",
    released: false,
  });

  const [poster, setPoster] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      if (
        ["genre", "languages", "category", "castNames", "theaters"].includes(key)
      ) {
        data.append(key, JSON.stringify(form[key].split(",")));
      } else {
        data.append(key, form[key]);
      }
    });

    if (poster) data.append("poster", poster);
    if (video) data.append("video", video);

    try {
      await axios.post("/api/movie/createmovie", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("🎉 Movie added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Add New Movie 🎥
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Movie Name" name="name" onChange={handleChange} />
          <Input type="date" label="Release Date" name="releasedate" onChange={handleChange} />
          <Input type="number" label="Length (minutes)" name="length" onChange={handleChange} />
          <Input label="Encode Name" name="encodeName" onChange={handleChange} />

          <Input label="Genres (comma separated)" name="genre" onChange={handleChange} />
          <Input label="Languages (comma separated)" name="languages" onChange={handleChange} />
          <Input label="Categories (comma separated)" name="category" onChange={handleChange} />
          <Input label="Cast Names (comma separated)" name="castNames" onChange={handleChange} />
          <Input label="Theaters (comma separated)" name="theaters" onChange={handleChange} />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* FILE UPLOADS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileInput label="Poster Image" accept="image/*" onChange={setPoster} />
          <FileInput label="Movie Video" accept="video/*" onChange={setVideo} />
        </div>

        {/* RELEASED */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="released"
            onChange={handleChange}
            className="w-5 h-5 accent-black"
          />
          <span className="text-gray-700 font-medium">Released</span>
        </div>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          {loading ? "Uploading..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Input({ label, name, type = "text", onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-black focus:outline-none"
      />
    </div>
  );
}

function FileInput({ label, accept, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files[0])}
        className="w-full text-sm file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-black file:text-white
        hover:file:bg-gray-800"
      />
    </div>
  );
}
