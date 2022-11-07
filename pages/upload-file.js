import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "../services/userService";

const UploadFile = () => {
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [fileType, setFileType] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [owner, setOwner] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [fileSize, setFileSize] = useState(0);
    const [validFile, setValidFile] = useState(false);

    const router = useRouter();

    // { file, fileName, fileUrl, fileType }

    useEffect(() => {
        const user = userService.userValue;
        setOwner(user.email);
        setOwnerId(user.id);
    }, []);

    const f = {
        file: file,
        fileName: fileName,
        fileUrl: fileUrl,
        fileType: fileType,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validFile) {
            setLoading(true);
            const b = new FormData();
            b.append("file", file);
            b.append("fileName", fileName);
            b.append("fileUrl", fileUrl);
            b.append("fileType", fileType);
            b.append("owner", owner);
            b.append("ownerId", ownerId);
            return await userService
                .uploadFile(b)
                .then((res) => {
                    setLoading(false);
                    router.push("/");
                })
                .catch((err) => {
                    setLoading(false);
                    setError(err);
                });
        } else {
            setError("Invalid file. Select file again.");
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const size = file.size;
        if (size > 1000000) {
            alert("Max Limit of Upload is 1 MB");
            return false;
        }
        setValidFile(true);
        await setFile(file);
        await setFileName(file.name);
        await setFileUrl(URL.createObjectURL(file));
        // console.log(file);
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="my-10">
                    <h1 className="text-4xl text-center">Upload Files</h1>
                </div>
                <Link href={"/"}>Go back to home</Link>
                <div className="flex justify-center items-center my-20">
                    <div className="border rounded-lg p-5 w-1/2">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col my-2">
                                <label htmlFor="file">
                                    Upload File
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Upload your file"
                                    accept=".pdf"
                                    onChange={ 
                                        (e) => {
                                            const a = handleFileChange(e);
                                            a.then((res) => {
                                                if (res === false) {
                                                    e.target.value = "";
                                                }
                                            });
                                        }
                                    }
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="fileType">
                                    File Type
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="fileType"
                                    name="fileType"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Select file type"
                                    value={fileType}
                                    onChange={(e) => {
                                        setFileType(e.target.value);
                                    }}
                                    required
                                >
                                    <option value="">Select file type</option>
                                    <option value="Government ID">
                                        Government ID
                                    </option>
                                    <option value="License">License</option>
                                    <option value="Medical Bill">
                                        Medical Bill
                                    </option>
                                    <option value="Prescription">
                                        Prescription
                                    </option>
                                    <option value="Insurance Claim">
                                        Insurance Claim
                                    </option>
                                </select>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-green-500 text-white px-7 py-2 rounded"
                                >
                                    {loading ? (
                                        <div className="flex justify-center">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 512 512"
                                                className="animate-spin h-5 w-5"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        "Upload"
                                    )}
                                </button>
                            </div>
                        </form>
                        {error}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadFile;

// import { useState } from "react";

// export default function PrivatePage(props) {
//     const [image, setImage] = useState(null);
//     const [createObjectURL, setCreateObjectURL] = useState(null);

//     const uploadToClient = (event) => {
//         if (event.target.files && event.target.files[0]) {
//             const i = event.target.files[0];

//             setImage(i);
//             setCreateObjectURL(URL.createObjectURL(i));
//         }
//     };

//     const uploadToServer = async (event) => {
//         event.preventDefault();
//         const body = new FormData();
//         body.append("file", image);
//         const response = await fetch("/api/user/upload", {
//             method: "POST",
//             body,
//         });
//     };

//     return (
//         <div>
//             <div>
//                 {/* <img src={createObjectURL} /> */}
//                 <h4>Select Image</h4>
//                 <input type="file" name="myImage" onChange={uploadToClient} />
//                 <button
//                     className="btn btn-primary"
//                     type="submit"
//                     onClick={uploadToServer}
//                 >
//                     Send to server
//                 </button>
//             </div>
//         </div>
//     );
// }
