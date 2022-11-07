import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "services";

const Search = () => {
    const [users, setUsers] = useState(null);
    const [searchList, setSearchList] = useState([]);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
        userService.getAll().then((x) => setUsers(x));
        // console.log(users);
    }, []);

    const searchFilter = async () => {
        // e.preventDefault();
        const searchList = users.filter(
            (user) =>
                user.name.includes(name) ||
                user.country.includes(country) ||
                user.city.includes(city) ||
                user.address.includes(address)
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
                        {searchList.length > 0 && searchList.map((user, i) => {
                            <p id="i">{user.name}</p>;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
