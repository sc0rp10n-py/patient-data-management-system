import Link from "next/link";
import { userService } from "services";

const Nav = () => {
    const logout = () => {
        userService.logout();
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="my-10">
                    <h1 className="text-4xl text-center">
                        Patient Database Management System
                    </h1>
                </div>
                <div className="mb-10">
                    <h1 className="text-2xl">Our Links</h1>
                    <div className="flex flex-col">
                        <Link href={"/login"}>
                            <a className="text-blue-500 hover:text-blue-600">
                                Login
                            </a>
                        </Link>
                        <Link href={"/register-organisation"}>
                            <a className="text-blue-500 hover:text-blue-600">
                                Register Organisation
                            </a>
                        </Link>
                        <Link href={"/register-personnel"}>
                            <a className="text-blue-500 hover:text-blue-600">
                                Register Personnel
                            </a>
                        </Link>
                        <Link href={"/register-patient"}>
                            <a className="text-blue-500 hover:text-blue-600">
                                Register Patient
                            </a>
                        </Link>
                        <Link href={"/payments"}>
                            <a className="text-blue-500 hover:text-blue-600">
                                Payments
                            </a>
                        </Link>
                        <a onClick={logout} className="text-blue-500 hover:text-blue-600 hover:cursor-pointer">
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Nav;
