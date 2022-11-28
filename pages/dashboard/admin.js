import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "../../services/userService";

const Admin = () => {
    const [user, setUser] = useState({});
    const [otherUsers, setOtherUsers] = useState([]);
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);
    const [verifiedUsers, setVerifiedUsers] = useState([]);
    const [files, setFiles] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [showLicense, setShowLicense] = useState(false);
    const router = useRouter();

    const getUnverified = async () => {
        // console.log("2");
        const unverified = await otherUsers.filter(
            (user) => user.adminVerify === false
        );
        const verified = await otherUsers.filter(
            (user) => user.adminVerify === true
        );
        setVerifiedUsers(verified);
        setUnverifiedUsers(unverified);
        // console.log("a", unverified);
        // console.log("a", verified);
        return;
    };

    const getUser = async () => {
        const user = await userService.userValue;
        await setUser(user);
        const otherUsers = await userService.getAll();
        await setOtherUsers(otherUsers);
        const files = await localStorage.getItem("files");
        await setFiles(JSON.parse(files));
        // console.log(user);
        // console.log(otherUsers);
    };

    console.log(process.cwd());

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        getUnverified();
    }, [otherUsers]);

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

    const verifyUser = async (e) => {
        return await userService
            .verifyUser(e)
            .then((res) => {
                // console.log("done");
                alert("done");
                router.reload();
            })
            .catch((err) => {
                // console.log(err);
            });
    };

    const deleteUser = async (e) => {
        return await userService
            .deleteUser(e)
            .then((res) => {
                // console.log("done");
                router.reload();
            })
            .catch((err) => {
                // console.log(err);
            });
    };

    return (
        <>
            <div className="container mx-auto my-10">
                <h1 className="text-4xl text-center">Admin Dashboard</h1>
                <div className="border rounded p-5 m-5 flex flex-row justify-around">
                    <div className="w-1/2">
                        <h1 className="text-center text-3xl">All Users</h1>
                        <div className="space-y-3">
                            {verifiedUsers.map((user, i) => (
                                <div
                                    key={i}
                                    className="border rounded p-5 m-5 flex flex-row justify-between"
                                >
                                    <div className="w-1/3">
                                        <h2>Name: {user.name}</h2>
                                        <h2>Type: {user.type}</h2>
                                        <h2>License: {user.license}</h2>
                                        <h2>
                                            License Expiry: {user.licenseExpiry}
                                        </h2>
                                    </div>
                                    <div className="w-1/3 flex flex-col justify-around">
                                        <button
                                            className="rounded bg-purple-500 px-7 py-1 text-white font-bold"
                                            onClick={() =>
                                                getLicense(user.email)
                                            }
                                        >
                                            View License
                                        </button>
                                        <button
                                            className="rounded bg-red-500 px-7 py-1 text-white font-bold"
                                            onClick={() =>
                                                deleteUser(user.email)
                                            }
                                        >
                                            Delete User
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h1 className="text-center text-3xl">
                            Unverified Users
                        </h1>
                        <div className="space-y-3">
                            {unverifiedUsers.map((user, i) => (
                                <div
                                    key={i}
                                    className="border rounded p-5 m-5 flex flex-row justify-between"
                                >
                                    <div className="w-1/3">
                                        <h2>Name: {user.name}</h2>
                                        <h2>Type: {user.type}</h2>
                                        <h2>License: {user.license}</h2>
                                        <h2>
                                            License Expiry: {user.licenseExpiry}
                                        </h2>
                                    </div>
                                    <div className="w-1/3 flex flex-col justify-around space-y-2">
                                        <button
                                            className="rounded bg-purple-500 px-7 py-1 text-white font-bold"
                                            onClick={() =>
                                                getLicense(user.email)
                                            }
                                        >
                                            View License
                                        </button>
                                        <button
                                            className="rounded bg-green-500 px-7 py-1 text-white font-bold"
                                            onClick={(e) =>
                                                verifyUser(user.email)
                                            }
                                        >
                                            Verify
                                        </button>
                                        <button
                                            className="rounded bg-red-500 px-7 py-1 text-white font-bold"
                                            onClick={() =>
                                                deleteUser(user.email)
                                            }
                                        >
                                            Delete User
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                                                path: licenses[0].path,
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
                                src={licenses[0].path}
                                width="100%"
                                height="400px"
                            ></iframe>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Admin;
