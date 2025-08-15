import React, { useState, useRef, useEffect } from "react";
import eyeIcon from "../Icons/img.jpg";
import eye from "../Icons/eye.png";
import copy from "../Icons/copyicon.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) setPasswordArray(JSON.parse(passwords));
    }, []);

    const togglePassword = () => setShowPassword(!showPassword);

    const savePassword = () => {
        if (!form.site || !form.username || !form.password) {
            toast.error("All fields are required", { position: "top-center", autoClose: 2000 });
            return;
        }

        if (editIndex !== null) {
            const updatedArray = [...passwordArray];
            updatedArray[editIndex] = form;
            setPasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray));
            toast.success("Password updated!", { position: "top-center", autoClose: 2000 });
            setEditIndex(null);
        } else {
            const newArray = [...passwordArray, form];
            setPasswordArray(newArray);
            localStorage.setItem("passwords", JSON.stringify(newArray));
            toast.success("Password added!", { position: "top-center", autoClose: 2000 });
        }
        setform({ site: "", username: "", password: "" });
    };

    const handleChange = (e) => setform({ ...form, [e.target.name]: e.target.value });

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!", { position: "top-center", autoClose: 2000 });
    };

    const handleDelete = (index) => {
        const updatedArray = passwordArray.filter((_, i) => i !== index);
        setPasswordArray(updatedArray);
        localStorage.setItem("passwords", JSON.stringify(updatedArray));
        toast.info("Password deleted", { position: "top-center", autoClose: 2000 });
    };

    const handleEdit = (index) => {
        setform(passwordArray[index]);
        setEditIndex(index);
    };

    return (
        <>
            {/* Background effect */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="mycontainer px-4">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-green-500">&lt;</span>
                    Pass<span className="text-green-500 font-bold">OP/&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center">Your Own Password Manager</p>

                {/* Form */}
                <div className="flex flex-col p-4 text-black gap-4 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter website URL"
                        className="rounded-full border border-green-500 w-full p-3"
                        type="text"
                        name="site"
                    />

                    <div className="flex flex-col md:flex-row w-full gap-4">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            className="rounded-full border border-green-500 w-full p-3"
                            type="text"
                            name="username"
                        />

                        <div className="relative w-full">
                            <input
                                value={form.password}
                                onChange={handleChange}
                                ref={passwordRef}
                                placeholder="Enter password"
                                className="rounded-full border border-green-500 w-full p-3 pr-12"
                                type={showPassword ? "text" : "password"}
                                name="password"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2">
                                <img
                                    className="w-8 h-7 cursor-pointer"
                                    onClick={togglePassword}
                                    src={showPassword ? eye : eyeIcon}
                                    alt="toggle"
                                />
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={savePassword}
                        className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full gap-4 px-4 py-2 border-2 border-green-900"
                    >
                        {editIndex !== null ? "Update Password" : "Add Password"}
                    </button>
                </div>

                {/* Password Table */}
                <div className="passwords overflow-x-auto">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}

                    {passwordArray.length !== 0 && (
                        <table className="table-auto w-full min-w-[600px] rounded-md overflow-hidden">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className="w-32 py-2 border border-white text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <a href={item.site} target="_blank" rel="noreferrer">
                                                    {item.site}
                                                </a>
                                                <img
                                                    src={copy}
                                                    alt="copyicon"
                                                    className="w-5 h-5 cursor-pointer"
                                                    onClick={() => handleCopy(item.site)}
                                                />
                                            </div>
                                        </td>
                                        <td className="w-32 py-2 border border-white text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {item.username}
                                                <img
                                                    src={copy}
                                                    alt="copyicon"
                                                    className="w-5 h-5 cursor-pointer"
                                                    onClick={() => handleCopy(item.username)}
                                                />
                                            </div>
                                        </td>
                                        <td className="w-32 py-2 border border-white text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {item.password}
                                                <img
                                                    src={copy}
                                                    alt="copyicon"
                                                    className="w-5 h-5 cursor-pointer"
                                                    onClick={() => handleCopy(item.password)}
                                                />
                                            </div>
                                        </td>
                                        <td className="w-32 py-2 border border-white text-center">
                                            <div className="flex items-center justify-center gap-4">
                                                <span
                                                    className="text-blue-600 cursor-pointer"
                                                    onClick={() => handleEdit(index)}
                                                >
                                                    ✏️
                                                </span>
                                                <span
                                                    className="text-red-600 cursor-pointer"
                                                    onClick={() => handleDelete(index)}
                                                >
                                                    🗑️
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <ToastContainer />
            </div>
        </>
    );
};

export default Manager;
