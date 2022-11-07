import Link from 'next/link';
import { userService } from '../services/userService';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default Home;

function Home() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const user = userService.userValue;
        setUser(user);
        // console.log(user);
    }, []);

    const choseDashboard = () => {
        if (user.type === 'pirogod') {
            return (<Link href="/dashboard/admin">Dashboard</Link>)
        } else if (user.type === 'patient') {
            return (<Link href="/dashboard/patient">Dashboard</Link>)
        } else if (user.type === 'Hospital' || user.type === 'Insurance' || user.type === 'Pharmacy') {
            return (<Link href="/dashboard/organisation">Dashboard</Link>)
        } else if (user.type === 'personnel') {
            return (<Link href="/dashboard/doctor">Dashboard</Link>)
        }
    }

    if (user.adminVerify === false) {
        return (
            <>
                <h1>Verify First</h1>
                <Link href="/upload-file">
                    Upload License
                </Link>
            </>
        )
    }

    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {userService.userValue?.name}!</h1>
                {choseDashboard()}
            </div>
        </div>
    );
}