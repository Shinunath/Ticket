import React, { useState } from "react";
import "./MovieForm.css";

function MovieForm() {
    const [formData, setFormData] = useState({
        name: "",
        releasedate: "",
        length: "",
        genre: "",
        languages: "",
        category: "",
        released: false,
        castNames: "",
        description: "",
        theaters: "",
        encodeName: "",
    });

    const [poster, setPoster] = useState(null);
    const [video, setVideo] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        // text fields
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        // files
        data.append("poster", poster);
        data.append("video", video);

        await fetch("http://localhost:4000/api/movie/createmovie", {
            method: "POST",
            body: data,
        });

        alert("Movie added successfully!");
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input name="name" placeholder="Movie Name" onChange={handleChange} />

            <input type="date" name="releasedate" onChange={handleChange} />

            <input type="number" name="length" placeholder="Length (min)" onChange={handleChange} />

            <input name="genre" placeholder="Genre (comma separated)" onChange={handleChange} />

            <input name="languages" placeholder="Languages (comma separated)" onChange={handleChange} />

            <input name="category" placeholder="Category" onChange={handleChange} />

            <label>
                Released:
                <input type="checkbox" name="released" onChange={handleChange} />
            </label>

            <input name="castNames" placeholder="Cast Names (comma separated)" onChange={handleChange} />

            <textarea name="description" placeholder="Description" onChange={handleChange} />

            <input name="theaters" placeholder="Theaters (comma separated)" onChange={handleChange} />

            <input name="encodeName" placeholder="Encode Name" onChange={handleChange} />

            <label>Poster Image:</label>
            <input type="file" accept="image/*" onChange={(e) => setPoster(e.target.files[0])} />

            <label>Video File:</label>
            <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />

            <button type="submit">Submit</button>
        </form>
    );
}

export default MovieForm;
