import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "../services/userService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = ({ email, password }) => {
        setLoading(true);
        return userService.login(email, password)
            .then(() => {
                router.push('/');
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="my-10">
                    <h1 className="text-4xl text-center">Login</h1>
                </div>
                <Link href={"/"}>Go back to home</Link>
                <div className="flex justify-center items-center my-20">
                    <div className="border rounded-lg p-5 w-1/2">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit({ email, password });
                        }}>
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
        </>
    );
};

export default Login;
