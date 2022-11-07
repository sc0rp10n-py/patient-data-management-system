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
                        {/* <Link href={"/payments"}>
                            <a className="text-blue-500 hover:text-blue-600">
                                Payments
                            </a>
                        </Link> */}
                        <Link href={"/upload-file"}>
                            <a className="text-blue-500 hover:text-blue-600">
                                Upload File
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
