import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "../services/userService";
import Link from "next/link";

const Doctor = () => {
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const user = await userService.userValue;
            setUser(user);
            // console.log(files);
            // console.log(user);
        };
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAddress(user.address);
            setPhone(user.phone);
            setCity(user.city);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        return await userService
            .editProfile({
                id: user.id,
                name: name,
                email: email,
                address: address,
                phone: phone,
                city: city,
            })
            .then((res) => {
                setLoading(false);
                alert("Profile updated successfully");
                userService.logout();
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    if (user.adminVerify === false) {
        router.push("/");
    }

    if (user.type === "personnel") {
        return (
            <>
                <div className="container mx-auto">
                    <div className="flex justify-center items-center my-20">
                        <div className="border rounded-lg p-5 w-1/2">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="name">
                                        Name
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="email">
                                        Email
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="address">
                                        Address
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your address"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="city">
                                        City
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your city"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="country">
                                        Country
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="country"
                                        name="country"
                                        className="border px-4 py-2 rounded"
                                        value={user.country}
                                        disabled
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="phone">
                                        Phone
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your phone number"
                                        pattern="[0-9]{10}"
                                        minLength={10}
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="profession">
                                        Profession
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="profession"
                                        name="profession"
                                        className="border px-4 py-2 rounded"
                                        value={user.profession}
                                        disabled
                                        required
                                    />
                                </div>
                                {user.profession === "Doctor" ? (
                                    <div className="flex flex-col my-2">
                                        <label htmlFor="speciality">
                                            Speciality
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            id="speciality"
                                            name="speciality"
                                            className="border px-4 py-2 rounded"
                                            value={user.speciality}
                                            disabled
                                            required
                                        />
                                    </div>
                                ) : null}
                                <div className="flex flex-col my-2">
                                    <label htmlFor="organisation">
                                        Organisation
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="organisation"
                                        name="organisation"
                                        className="border px-4 py-2 rounded"
                                        value={user.organisation}
                                        disabled
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="license">
                                        License ID
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="license"
                                        name="license"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your license ID"
                                        value={user.license}
                                        disabled
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="license-expiry">
                                        License Expiry
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="license-expiry"
                                        name="license-expiry"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your license expiry"
                                        value={user.licenseExpiry}
                                        disabled
                                        required
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-green-500 text-white px-7 py-2 rounded"
                                    >
                                        {loading ? (
                                            <div className="flex justify-center">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 512 512"
                                                    className="animate-spin h-5 w-5"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                                                </svg>
                                            </div>
                                        ) : (
                                            "Edit"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (user.type === "patient") {
        return (
            <>
                <div className="container mx-auto">
                    <div className="flex justify-center items-center my-20">
                        <div className="border rounded-lg p-5 w-1/2">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="name">
                                        Name
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="email">
                                        Email
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="address">
                                        Address
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your address"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="city">
                                        City
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your city"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="country">
                                        Country
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="country"
                                        name="country"
                                        className="border px-4 py-2 rounded"
                                        value={user.country}
                                        disabled
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="phone">
                                        Phone
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your phone number"
                                        pattern="[0-9]{10}"
                                        minLength={10}
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="blood-group">
                                        Blood Group
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="bloodGroup"
                                        name="bloodGroup"
                                        className="border px-4 py-2 rounded"
                                        value={user.bloodGroup}
                                        disabled
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="license">
                                        Government ID
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="license"
                                        name="license"
                                        className="border px-4 py-2 rounded"
                                        value={user.license}
                                        disabled
                                        required
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-green-500 text-white px-7 py-2 rounded"
                                    >
                                        {loading ? (
                                            <div className="flex justify-center">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 512 512"
                                                    className="animate-spin h-5 w-5"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                                                </svg>
                                            </div>
                                        ) : (
                                            "Edit"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (
        user.type === "Hospital" ||
        user.type === "Pharmacy" ||
        user.type === "Insurance Company"
    ) {
        return (
            <>
                <div className="container mx-auto">
                    <div className="flex justify-center items-center my-20">
                        <div className="border rounded-lg p-5 w-1/2">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="name">
                                        Name
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="email">
                                        Email
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="address">
                                        Address
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your address"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="city">
                                        City
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your city"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="country">
                                        Country
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="country"
                                        name="country"
                                        className="border px-4 py-2 rounded"
                                        value={user.country}
                                        disabled
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="phone">
                                        Phone
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your phone number"
                                        pattern="[0-9]{10}"
                                        minLength={10}
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="license">
                                        License ID
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="license"
                                        name="license"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your license ID"
                                        value={user.license}
                                        disabled
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="license-expiry">
                                        License Expiry
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="license-expiry"
                                        name="license-expiry"
                                        className="border px-4 py-2 rounded"
                                        placeholder="Enter your license expiry"
                                        value={user.licenseExpiry}
                                        disabled
                                        required
                                    />
                                </div>
                                <div className="flex flex-col my-2">
                                    <label htmlFor="type">
                                        Type
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="type"
                                        name="type"
                                        className="border px-4 py-2 rounded"
                                        value={user.type}
                                        disabled
                                        required
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-green-500 text-white px-7 py-2 rounded"
                                    >
                                        {loading ? (
                                            <div className="flex justify-center">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 512 512"
                                                    className="animate-spin h-5 w-5"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                                                </svg>
                                            </div>
                                        ) : (
                                            "Edit"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container text-4xl">Sus</div>
        </>
    );
};

export default Doctor;
