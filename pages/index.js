/*import Link from "next/link";

// pages/index.js
export default function Home() {
    return (
        <>
            <div className="container mx-auto">
                <div className="my-10">
                    <h1 className="text-4xl text-center">
                        Patient Database Management System
                    </h1>
                </div>
                <div>
                    <h1 className="text-2xl">Our Links</h1>
                    <div className="flex flex-col">
                    <form action="/api/payGateway" method="POST">
                     <section>
                   <button type="submit" role="link">
                    Payments
                    </button>
                   </section>
                   </form>
                    </div>
                </div>
            </div>
        </>
    );
}*/

import Link from "next/link";

// pages/index.js
export default function Home() {
    return (
        <>
            <div className="container mx-auto">
                <div className="my-10">
                    <h1 className="text-4xl text-center">
                        Patient Database Management System
                    </h1>
                </div>
                <div>
                    <h1 className="text-2xl">Our Links</h1>
                    <div className="flex flex-col">
                        <Link href={"/payments"}>
                            <a className="text-blue-500 hover:text-blue-600">
                                Payments
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}