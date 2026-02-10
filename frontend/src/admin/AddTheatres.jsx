import React, { useState } from "react";
import axios from "axios";

export default function AddTheatre() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    location: "",
    screens: "",
    redirectUrl: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append("image", image);

    try {
      await axios.post("/api/theatre/createtheatre", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("🎉 Theatre added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add theatre");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Add Theatre 🎭
        </h1>

        <Input label="Theatre Name" name="name" onChange={handleChange} />
        <Input label="City" name="city" onChange={handleChange} />
        <Input label="Location" name="location" onChange={handleChange} />
        <Input
          label="Number of Screens"
          name="screens"
          type="number"
          onChange={handleChange}
        />
        <Input
          label="Redirect URL"
          name="redirectUrl"
          onChange={handleChange}
        />

        {/* IMAGE */}
        <FileInput label="Theatre Image" accept="image/*" onChange={setImage} />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          {loading ? "Uploading..." : "Add Theatre"}
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
