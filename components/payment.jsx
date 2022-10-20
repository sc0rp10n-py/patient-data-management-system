import Link from "next/link";

const Payment = () => {
    return (
        <>
            <Link href={"/"}>
                Go back to home
            </Link>
            <div className="my-10 container mx-auto flex flex-col justify-center items-center">
                <div className="border p-3 rounded">
                    <form>
                        <div className="">
                            <input
                                type="number"
                                placeholder="Enter Amount"
                                className="border-2 border-gray-300 p-2 rounded"
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