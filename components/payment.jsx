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
                        <section>
                            <ul className="list-none">
                                <li>
                                    <label>
                                        <span>Please enter quantity of Item1, Price for each quantity is ₹1000&nbsp;</span>
                                        <input type="text" name="amount" onChange={(e) => helper(e.target.value)} STYLE="color: #FFFFFF; font-family: Verdana; font-weight: bold; font-size: 12px; background-color: #72A4D2;" size="10" />
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <span>Please enter quantity of Item2, Price for each quantity is ₹100&nbsp;&nbsp;&nbsp;</span>
                                        <input type="text" name="amount" onChange={(e) => helper(e.target.value)} STYLE="color: #FFFFFF; font-family: Verdana; font-weight: bold; font-size: 12px; background-color: #72A4D2;" size="10" />
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <span>Please enter quantity of Item3, Price for each quantity is ₹10 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <input type="text" name="amount" onChange={(e) => helper(e.target.value)} STYLE="color: #FFFFFF; font-family: Verdana; font-weight: bold; font-size: 12px; background-color: #72A4D2;" size="10" />
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <span>Please enter quantity of Item4, Price for each quantity is ₹5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <input type="text" name="amount" onChange={(e) => helper(e.target.value)} STYLE="color: #FFFFFF; font-family: Verdana; font-weight: bold; font-size: 12px; background-color: #72A4D2;" size="10" />
                                    </label>
                                </li>
                            </ul>
                            <br />
                            <br />
                            <input type="submit" name="amount" value="Pay" /><br></br>
                        </section>
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