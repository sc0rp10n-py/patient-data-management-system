import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Captcha = (props) => {
    const [cUrl, setCUrl] = useState(null);
    const [cData, setCData] = useState(null);
    const [cs, setCs] = useState(null);
    const [fetched, setFetched] = useState(false);
    const [error, setError] = useState(false);
    const [status, setStatus] = useState(null);
    const [sum, setSum] = useState(null);

    const router = useRouter();

    const fetchCaptcha = async () => {
        const res = await fetch("/api/captcha");
        const data = await res.json();
        if (res.status !== 200) {
            setError(true);
        } else {
            setCUrl(data.url);
            setCData(data.data);
            setCs(data.s);
            setFetched(true);
        }
    };

    useEffect(() => {
        fetchCaptcha();
    }, []);

    useEffect(() => {
        const onlyNumber = (e) => {
            document.querySelector("#captcha").addEventListener("keypress", function (evt) {
                if (evt.which < 48 || evt.which > 57) {
                    evt.preventDefault();
                }
            });
        }
        if (fetched) onlyNumber();
    }, [fetched]);

    if (!fetched) {
        return <div>Loading...</div>;
    }

    const showC = () => {
        if (!error) {
            return <Image src={cUrl} alt={cs} width={100} height={50} />;
        } else {
            return <button className="border p-2 rounded" onClick={router.reload()}>Reload</button>
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sum == cData) {
            setStatus("Success!");
            props.data(true);
        }
        else {
            setStatus("Failure!");
            props.data(false);
            router.reload();
        }
    }

    return (
        <form className="text-white border rounded-lg space-y-5 p-5" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-around">
                <label htmlFor="captcha" className="flex justify-center items-center my-2">{showC()}</label>
                <input
                    type="number"
                    id="captcha"
                    className="bg-black text-white border p-5 rounded"
                    placeholder="Enter the sum"
                    value={sum}
                    onChange={(e) => {
                        setSum(e.target.value);
                    }}
                />
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </div>
            {status}
        </form>
    );
};

export default Captcha;