import Link from "next/link";
import { useState, useEffect } from "react";

const RegisterPers = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [showError2, setShowError2] = useState(false);
    const [success, setSuccess] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [profession, setProfession] = useState("");
    const [loading, setLoading] = useState(false);
    const [license, setLicense] = useState("");
    const [licenseExpiry, setLicenseExpiry] = useState("");
    const [cPassClass, setCPassClass] = useState("border px-4 py-2 rounded");
    const [isDirty, setIsDirty] = useState(false);
    const [u, setU] = useState("");
    const [l, setL] = useState("");
    const [n, setN] = useState("");
    const [s, setS] = useState("");
    const [ll, setLL] = useState("");
    const [validPass, setValidPass] = useState(false);

    useEffect(() => {
        const checkPassword = () => {
            // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            const r1 = /^(?=.*[A-Z])/;
            const r2 = /^(?=.*[a-z])/;
            const r3 = /^(?=.*[0-9])/;
            const r4 = /^(?=.*?[!@#\$%&*~])/;
            const r5 = /^(.{8,})/;

            if (r1.test(password)) {
                setU("text-green-500");
                setValidPass(true);
            } else {
                setU("text-red-500");
                setValidPass(false);
            }
            if (r2.test(password)) {
                setL("text-green-500");
                setValidPass(true);
            } else {
                setL("text-red-500");
                setValidPass(false);
            }
            if (r3.test(password)) {
                setN("text-green-500");
                setValidPass(true);
            } else {
                setN("text-red-500");
                setValidPass(false);
            }
            if (r4.test(password)) {
                setS("text-green-500");
                setValidPass(true);
            } else {
                setS("text-red-500");
                setValidPass(false);
            }
            if (r5.test(password)) {
                setLL("text-green-500");
                setValidPass(true);
            } else {
                setLL("text-red-500");
                setValidPass(false);
            }
        };
        checkPassword();
        if (isDirty) {
            if (password === confirmPassword) {
                setShowError(false);
                setCPassClass("border px-4 py-2 rounded");
            } else {
                setShowError(true);
                setCPassClass("border px-4 py-2 rounded border-red-500");
            }
        }
    }, [password, confirmPassword, isDirty]);

    const handleSubmit = async (e) => {
        if (validPass) {
            e.preventDefault();
            setLoading(true);
            const res = await fetch("/api/register-personnel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    address,
                    city,
                    country,
                    email,
                    phone,
                    password,
                    speciality,
                    organisation,
                    profession,
                    license,
                    licenseExpiry,
                }),
            });
            const json = await res.json();
            if (!res.ok) throw Error(json.message);
            setLoading(false);
            setSuccess(json.message);
        } else {
            alert("Password is not valid");
        }
    };

    return (
        <>
            <div className="container mx-auto min-h-screen">
                <div className="my-10">
                    <h1 className="text-4xl text-center">
                        Register as Healthcare Personnel
                    </h1>
                </div>
                <Link href={"/"}>Go back to home</Link>
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
                                    onChange={(e) => setName(e.target.value)}
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="password">
                                    Password
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <ul>
                                <li className={u}>
                                    &bull; Password must contain at least one
                                    uppercase letter
                                </li>
                                <li className={l}>
                                    &bull; Password must contain at least one
                                    lowercase letter
                                </li>
                                <li className={n}>
                                    &bull; Password must contain at least one
                                    number
                                </li>
                                <li className={s}>
                                    &bull; Password must contain at least one
                                    special character
                                </li>
                                <li className={ll}>
                                    &bull; Password must be at least 8
                                    characters
                                </li>
                            </ul>
                            <div className="flex flex-col my-2">
                                <label htmlFor="confirm-password">
                                    Confirm Password
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    name="confirm-password"
                                    className={cPassClass}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setIsDirty(true);
                                    }}
                                    required
                                />
                            </div>
                            {showError && isDirty ? (
                                <div className="text-red-500">
                                    Password do not match
                                </div>
                            ) : null}
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
                                    onChange={(e) => setAddress(e.target.value)}
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
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="country">
                                    Country
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
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
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="profession">
                                    Profession
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="profession"
                                    name="profession"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your profession"
                                    value={profession}
                                    onChange={(e) =>
                                        setProfession(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="speciality">
                                    Speciality
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="speciality"
                                    name="speciality"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your speciality"
                                    value={speciality}
                                    onChange={(e) =>
                                        setSpeciality(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="organisation">
                                    Organisation
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="organisation"
                                    name="organisation"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your organisation"
                                    value={organisation}
                                    onChange={(e) =>
                                        setOrganisation(e.target.value)
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
                                    value={license}
                                    onChange={(e) => setLicense(e.target.value)}
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
                                    value={licenseExpiry}
                                    onChange={(e) =>
                                        setLicenseExpiry(e.target.value)
                                    }
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
                                                stroke-width="0"
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
                                        "Register"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPers;

// personnel fields
// name
// email
// address
// location - city, country
// contact details
// license ID
// profession
// speciality
// organisation
//
