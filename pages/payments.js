import Payment from "../components/payment";
import Link from "next/link";

const Payments = () => {
    return (
        <>
            <div className="container mx-auto my-10">
                <h1 className="text-4xl text-center">Test Payment Page</h1>
                <Link href={"/"}>Go back to home</Link>
                <Payment />
            </div>
        </>
    );
};

export default Payments;
