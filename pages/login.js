import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "../services/userService";
import Captcha from "components/captcha";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [cStatus, setCStatus] = useState(false);
    const [modal, setModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (userService.userValue) {
            router.push("/");
        }
    }, []);

    useEffect(() => {
        if (cStatus) {
            handleLogin({ email, password });
        }
    }, [cStatus]);

    const handleSubmit = ({ email, password }) => {
        setLoading(true);
        setModal(true);
        window.scrollTo(0, 0);
    };

    const handleLogin = async ({email, password}) => {
        setModal(false);
        return userService
            .login(email, password)
            .then(async () => {
                // await getFiles(email);
                router.push("/");
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    const updateStatus = (b) => {
        setCStatus(b);
    };

    // const getFiles = async (em) => {
    //     return await userService
    //         .getFiles(em)
    //         .then((files) => {
    //             console.log(files);
    //             localStorage.setItem("files", JSON.stringify(files));
    //             setFiles(files);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    return (
        <>
            <div className="container mx-auto">
                <div className="my-10">
                    <h1 className="text-4xl text-center">Login</h1>
                </div>
                <Link href={"/"}>Go back to home</Link>
                <div className="flex justify-center items-center my-20">
                    <div className="border rounded-lg p-5 w-1/2">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit({ email, password });
                            }}
                        >
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
                                        "Login"
                                    )}
                                </button>
                            </div>
                        </form>
                        {error}
                    </div>
                </div>
            </div>
            {modal ? (
                <div className="z-20 absolute top-0 right-0 w-full min-h-screen bg-gray-500/50 flex justify-center items-center">
                    <div className="container mx-auto">
                        <div className="bg-black bg-[url('/images/background.png')] bg-cover bg-center rounded-lg p-10">
                            <div className="flex justify-end my-10">
                                <button
                                    className="transition-transform hover:scale-95"
                                    onClick={() => {
                                        setModal(false);
                                        setLoading(false);
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
                            <Captcha data={updateStatus} />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Login;
