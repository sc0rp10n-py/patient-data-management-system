import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "../../services/userService";
import Link from "next/link";

const Patient = () => {
    const [user, setUser] = useState({});
    const [files, setFiles] = useState([]);
    const [sharedFiles, setSharedFiles] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [showLicense, setShowLicense] = useState(false);
    const [file, setFile] = useState(null);
    const [showFile, setShowFile] = useState(false);
    const [chooseFile, setChooseFile] = useState(false);
    const [chooseFileId, setChooseFileId] = useState(null);
    const [shareEmail, setShareEmail] = useState("");

    const router = useRouter();

    const getFiles = async (em) => {
        return await userService
            .getFiles(em)
            .then((files) => {
                // console.log(files);
                localStorage.setItem("files", JSON.stringify(files));
                setFiles(files);
            })
            .catch((err) => {
                // console.log(err);
            });
    };

    const getSharedFiles = async (em) => {
        return await userService
            .getSharedFiles(em)
            .then((files) => {
                // console.log(files);
                localStorage.setItem("sharedFiles", JSON.stringify(files));
                setSharedFiles(files);
            })
            .catch((err) => {
                // console.log(err);
            });
    };

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
        getFiles(user.email);
        getSharedFiles(user.email);
    }, [user]);

    if (user.adminVerify === false) {
        router.push("/");
    }

    const getLicense = async (e) => {
        const license = await userService
            .getLicense(e)
            .then((res) => {
                // console.log(res);
                setLicenses(res);
                setShowLicense(true);
            })
            .catch((err) => {
                // console.log(err);
                alert("No license found");
            });
    };

    const viewFile = async (e) => {
        const file = await userService
            .viewFile(e)
            .then((res) => {
                // console.log(res);
                setFile(res);
                setShowFile(true);
            })
            .catch((err) => {
                // console.log(err);
                alert("No file found");
            });
    };

    const deleteFile = async (e) => {
        return await userService
            .deleteFile(e)
            .then((res) => {
                // console.log("done");
                alert("done");
                router.reload();
            })
            .catch((err) => {
                // console.log(err);
            });
    };

    const shareFile = async (e) => {
        e.preventDefault();
        const b = new FormData();
        b.append("email", shareEmail);
        b.append("id", chooseFile);
        return await userService
            .shareFile(b)
            .then((res) => {
                // console.log("done");
                alert("done");
                router.reload();
            })
            .catch((err) => {
                // console.log(err);
            });
    };

    return (
        <>
            <div className="container mx-auto my-10">
                <h1 className="text-4xl text-center">Patient Dashboard</h1>
                <Link href={"/search"}>Search</Link> {"|||"}
                {"|||"} <Link href="/edit">Edit Profile</Link>
                <div className="border rounded p-5 m-5">
                    <div className="space-y-3">
                        <h2>Name: {user.name}</h2>
                        <h2>License: {user.license}</h2>
                        <h2>Address: {user.address}</h2>
                        <h2>City: {user.city}</h2>
                        <h2>Country: {user.country}</h2>
                        <h2>Phone: {user.phone}</h2>
                        <h2>Email: {user.email}</h2>
                        <h2>Blood Group: {user.bloodGroup}</h2>
                        <h2>
                            View ID:{" "}
                            <button
                                className="rounded bg-purple-500 px-7 py-1 text-white font-bold"
                                onClick={() => getLicense(user.email)}
                            >
                                View
                            </button>
                        </h2>
                    </div>
                </div>
                <div className="border rounded p-5 m-5 flex flex-row justify-around">
                    <div className="w-1/2">
                        <h1 className="text-center text-3xl">My Files</h1>
                        <div className="flex flex-row justify-around">
                            {files.map((file, i) => (
                                <div
                                    key={i}
                                    className="border rounded p-5 m-5 flex flex-col justify-between"
                                >
                                    <div className="">
                                        <h2>File Name: {file.name}</h2>
                                        <h2>File Type: {file.type}</h2>
                                    </div>
                                    <div className="flex flex-col justify-center items-center my-2">
                                        <div>
                                            <button
                                                className="rounded bg-purple-500 px-7 py-1 text-white font-bold"
                                                onClick={() =>
                                                    viewFile({
                                                        file: file,
                                                        email: user.email,
                                                    })
                                                }
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                    <div className=" flex flex-col justify-center items-center my-2">
                                        <div>
                                            <button
                                                className="rounded bg-red-500 px-7 py-1 text-white font-bold"
                                                onClick={() =>
                                                    deleteFile({
                                                        id: file.id,
                                                        email: user.email,
                                                    })
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h1 className="text-center text-3xl">Shared Files</h1>
                        <div className="flex flex-row justify-around">
                            {sharedFiles.map((file, i) => (
                                <div
                                    key={i}
                                    className="border rounded p-5 m-5 flex flex-col justify-between"
                                >
                                    <div className="">
                                        <h2>File Name: {file.name}</h2>
                                        <h2>File Type: {file.type}</h2>
                                    </div>
                                    <div className="flex flex-col justify-center items-center my-2">
                                        <div>
                                            <button
                                                className="rounded bg-purple-500 px-7 py-1 text-white font-bold"
                                                onClick={() =>
                                                    viewFile({
                                                        file: file,
                                                        email: user.email,
                                                    })
                                                }
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border rounded p-5 m-5">
                    <h1 className="text-center text-3xl">Share File</h1>
                    <div className="flex flex-row justify-around">
                        <form onSubmit={shareFile} className="w-1/2">
                            <div className="flex flex-col my-2">
                                <label htmlFor="email">
                                    Email
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={shareEmail}
                                    placeholder="Enter single email"
                                    className="rounded border px-2 py-1"
                                    onChange={(e) =>
                                        setShareEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="file">
                                    File
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="file"
                                    id="file"
                                    value={chooseFile}
                                    className="rounded border px-2 py-1"
                                    onChange={(e) => {
                                        setChooseFile(e.target.value);
                                    }}
                                    required
                                >
                                    <option value="">Select File</option>
                                    {files.map((file, i) => (
                                        <option key={i} value={file.id}>
                                            {file.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col justify-center items-center my-2">
                                <div>
                                    <button
                                        className="rounded bg-purple-500 px-7 py-1 text-white font-bold"
                                        type="submit"
                                    >
                                        Share
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {showLicense ? (
                <div className="z-20 absolute top-0 right-0 w-full min-h-screen bg-gray-500/50 flex justify-center items-center">
                    <div className="container mx-auto">
                        <div className="bg-black bg-[url('/images/background.png')] bg-cover bg-center rounded-lg p-10">
                            <div className="flex justify-end my-10">
                                <button
                                    className="transition-transform hover:scale-95"
                                    onClick={async () => {
                                        await fetch("/api/del", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify({
                                                path: licenses.path,
                                            }),
                                        });
                                        setShowLicense(false);
                                    }}
                                >
                                    <svg
                                        width="100"
                                        height="100"
                                        viewBox="0 0 100 100"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-10 h-10"
                                    >
                                        <line
                                            x1="0"
                                            y1="50"
                                            x2="50"
                                            y2="0"
                                            stroke-width="5"
                                            stroke="white"
                                        />
                                        <line
                                            x1="0"
                                            y1="0"
                                            x2="50"
                                            y2="50"
                                            stroke-width="5"
                                            stroke="white"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <iframe
                                // src={`data/documents/${licenses.name}`}
                                src={licenses.path}
                                width="100%"
                                height="400px"
                            ></iframe>
                        </div>
                    </div>
                </div>
            ) : null}
            {showFile ? (
                <div className="z-20 absolute top-0 right-0 w-full min-h-screen bg-gray-500/50 flex justify-center items-center">
                    <div className="container mx-auto">
                        <div className="bg-black bg-[url('/images/background.png')] bg-cover bg-center rounded-lg p-10">
                            <div className="flex justify-end my-10">
                                <button
                                    className="transition-transform hover:scale-95"
                                    onClick={async () => {
                                        await fetch("/api/del", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify({
                                                path: file.path,
                                            }),
                                        });
                                        setShowFile(false);
                                    }}
                                >
                                    <svg
                                        width="100"
                                        height="100"
                                        viewBox="0 0 100 100"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-10 h-10"
                                    >
                                        <line
                                            x1="0"
                                            y1="50"
                                            x2="50"
                                            y2="0"
                                            stroke-width="5"
                                            stroke="white"
                                        />
                                        <line
                                            x1="0"
                                            y1="0"
                                            x2="50"
                                            y2="50"
                                            stroke-width="5"
                                            stroke="white"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <iframe
                                // src={`data/documents/${licenses.name}`}
                                src={file.path}
                                width="100%"
                                height="100%"
                            ></iframe>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Patient;
