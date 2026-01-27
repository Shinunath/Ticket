import { useState } from "react";
import axios from "axios";

export default function ShowForm() {
    const [formData, setFormData] = useState({
        movie: "",
        theatre: "",
        showDates: [{ date: "" }],
        showTimings: [
            {
                time: "",
                seatCategories: [{ categoryName: "", price: "" }]
            }
        ],
        totalSeats: "",
        bookedSeats: ""
    });




    // ---------- BASIC HANDLERS ----------
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ---------- SHOW DATES ----------
    const addShowDate = () => {
        setFormData({
            ...formData,
            showDates: [...formData.showDates, { date: "" }]
        });
    };

    const handleDateChange = (index, value) => {
        const updatedDates = [...formData.showDates];
        updatedDates[index].date = value;
        setFormData({ ...formData, showDates: updatedDates });
    };

    // ---------- SHOW TIMINGS ----------
    const addShowTiming = () => {
        setFormData({
            ...formData,
            showTimings: [
                ...formData.showTimings,
                { time: "", seatCategories: [{ categoryName: "", price: "" }] }
            ]
        });
    };

    const handleTimeChange = (index, value) => {
        const updated = [...formData.showTimings];
        updated[index].time = value;
        setFormData({ ...formData, showTimings: updated });
    };

    // ---------- SEAT CATEGORIES ----------
    const addSeatCategory = (timeIndex) => {
        const updated = [...formData.showTimings];
        updated[timeIndex].seatCategories.push({ categoryName: "", price: "" });
        setFormData({ ...formData, showTimings: updated });
    };

    const handleSeatChange = (timeIndex, seatIndex, field, value) => {
        const updated = [...formData.showTimings];
        updated[timeIndex].seatCategories[seatIndex][field] = value;
        setFormData({ ...formData, showTimings: updated });
    };

    // ---------- SUBMIT ----------

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:4000/api/show/create",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.data.success) {
                alert("Show created successfully");
                console.log(res.data.data);
            } else {
                alert(res.data.message);
            }

        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto p-6 bg-white shadow rounded space-y-6"
        >
            <h2 className="text-2xl font-bold">Create Show</h2>

            {/* Movie & Theatre */}
            <input
                type="text"
                name="movie"
                placeholder="Movie ID"
                className="input"
                onChange={handleChange}
            />

            <input
                type="text"
                name="theatre"
                placeholder="Theatre ID"
                className="input"
                onChange={handleChange}
            />

            {/* Show Dates */}
            <div>
                <h3 className="font-semibold">Show Dates</h3>
                {formData.showDates.map((d, i) => (
                    <input
                        key={i}
                        type="date"
                        className="input mt-2"
                        value={d.date}
                        onChange={(e) => handleDateChange(i, e.target.value)}
                    />
                ))}
                <button type="button" onClick={addShowDate} className="btn">
                    + Add Date
                </button>
            </div>

            {/* Show Timings */}
            <div>
                <h3 className="font-semibold">Show Timings</h3>

                {formData.showTimings.map((t, i) => (
                    <div key={i} className="border p-4 rounded mt-4">
                        <input
                            type="time"
                            className="input"
                            value={t.time}
                            onChange={(e) => handleTimeChange(i, e.target.value)}
                        />

                        {/* Seat Categories */}
                        <div className="mt-3">
                            {t.seatCategories.map((s, j) => (
                                <div key={j} className="flex gap-2 mt-2">
                                    <input
                                        type="text"
                                        placeholder="Category"
                                        className="input"
                                        value={s.categoryName}
                                        onChange={(e) =>
                                            handleSeatChange(i, j, "categoryName", e.target.value)
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        className="input"
                                        value={s.price}
                                        onChange={(e) =>
                                            handleSeatChange(i, j, "price", e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addSeatCategory(i)}
                                className="btn mt-2"
                            >
                                + Add Seat Category
                            </button>
                        </div>
                    </div>
                ))}

                <button type="button" onClick={addShowTiming} className="btn mt-2">
                    + Add Timing
                </button>
            </div>

            {/* Seats */}
            <input
                type="number"
                name="totalSeats"
                placeholder="Total Seats"
                className="input"
                onChange={handleChange}
            />

            <input
                type="number"
                name="bookedSeats"
                placeholder="Booked Seats"
                className="input"
                onChange={handleChange}
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded">
                Create Show
            </button>
        </form>
    );
}
