import Link from "next/link";

const Login = () => {
    return (
        <>
            <div className="container mx-auto">
                <div className="my-10">
                    <h1 className="text-4xl text-center">
                        Login
                    </h1>
                </div>
                <Link href={"/"}>Go back to home</Link>
            </div>
        </>
    );
};

export default Login;
