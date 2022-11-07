import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "services"; 

const Payment = () => {
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        const user = userService.userValue;
        setUser(user);
        setName(user.name);
    }, []);

    const router = useRouter();

    if (user.adminVerify === false) {
        router.push("/");
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
        
    // };

    return (
        <>
            <div className="my-10 container mx-auto flex flex-col justify-center items-center">
                <div className="border p-3 rounded">
                    <form action="/api/user/payGateway" method="POST">
                        <div className="">
                            <input
                                type="number"
                                placeholder="Enter Amount"
                                className="border-2 border-gray-300 p-2 rounded"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <input
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border-2 border-gray-300 p-2 rounded"
                                required
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="bg-blue-500 text-white px-7 py-2 rounded m-5"
                            >
                                Pay
                            </button>
                        </div>
                    </form>
                </div>
                <div className="my-10">
                    <h1 className="text-2xl">Payment Output</h1>
                    <div>
                        {/* Add output here */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment;