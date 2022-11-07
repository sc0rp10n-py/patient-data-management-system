import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "services";

const Search = () => {
    const [users, setUsers] = useState(null);
    const [searchList, setSearchList] = useState([]);
    const [name, setName] = useState(null);
    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        userService.getAll().then((x) => setUsers(x));
        // console.log(users);
    }, []);

    const searchFilter = async () => {
        // e.preventDefault();
        const searchList = users.filter(
            (user) =>
                user.name.toLowerCase().includes(name) ||
                user.country.toLowerCase().includes(country) ||
                user.city.toLowerCase().includes(city) ||
                user.address.toLowerCase().includes(address)
        );
        setSearchList(searchList);
        console.log("s", searchList);
    };

    // console.log(users);
    return (
        <>
            <div className="container mx-auto">
                <div className="my-10">
                    <h1 className="text-4xl text-center">Search</h1>
                </div>
                <Link href={"/"}>Go back to home</Link>
                <div>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            searchFilter();
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Search by country"
                        value={country}
                        onChange={(e) => {
                            setCountry(e.target.value);
                            searchFilter();
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Search by city"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            searchFilter();
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Search by address"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            searchFilter();
                        }}
                    />
                    <div>
                        {Object.keys(searchList).length > 0 && Object.keys(searchList).map((key) => (
                            <div key={key} className="border p-5 rounded m-5">
                                <p>Name: {searchList[key].name}</p>
                                <p>Country: {searchList[key].country}</p>
                                <p>City: {searchList[key].city}</p>
                                <p>Address: {searchList[key].address}</p>
                                <p>Email: {searchList[key].email}</p>
                                <p>Phone: {searchList[key].phone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
