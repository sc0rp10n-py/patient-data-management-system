import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "../services/userService";
import users from "data/users.json";

const RegisterPers = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [profession, setProfession] = useState("");
    const [license, setLicense] = useState("");
    const [licenseExpiry, setLicenseExpiry] = useState("");
    const [showError, setShowError] = useState(false);
    const [showError2, setShowError2] = useState(false);
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [cPassClass, setCPassClass] = useState("border px-4 py-2 rounded");
    const [isDirty, setIsDirty] = useState(false);
    const [u, setU] = useState("");
    const [l, setL] = useState("");
    const [n, setN] = useState("");
    const [s, setS] = useState("");
    const [ll, setLL] = useState("");
    const [validPass, setValidPass] = useState(false);

    const router = useRouter();

    let organisations = [];

    const orgOptions = () => {
        users.map((user, i) => {
            if (user.type === "Hospital") {
                organisations.push(user.name);
                console.log(organisations);
            }
        });
    };

    orgOptions();
    useEffect(() => {
        const checkPassword = () => {
            // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            const r1 = /^(?=.*[A-Z])/;
            const r2 = /^(?=.*[a-z])/;
            const r3 = /^(?=.*[0-9])/;
            const r4 = /^(?=.*?[!@#\$%&*~])/;
            const r5 = /^(.{8,})/;

            if (r1.test(password)) {
                setU("text-green-500");
                setValidPass(true);
            } else {
                setU("text-red-500");
                setValidPass(false);
            }
            if (r2.test(password)) {
                setL("text-green-500");
                setValidPass(true);
            } else {
                setL("text-red-500");
                setValidPass(false);
            }
            if (r3.test(password)) {
                setN("text-green-500");
                setValidPass(true);
            } else {
                setN("text-red-500");
                setValidPass(false);
            }
            if (r4.test(password)) {
                setS("text-green-500");
                setValidPass(true);
            } else {
                setS("text-red-500");
                setValidPass(false);
            }
            if (r5.test(password)) {
                setLL("text-green-500");
                setValidPass(true);
            } else {
                setLL("text-red-500");
                setValidPass(false);
            }
        };
        checkPassword();
        if (isDirty) {
            if (password === confirmPassword) {
                setShowError(false);
                setCPassClass("border px-4 py-2 rounded");
            } else {
                setShowError(true);
                setCPassClass("border px-4 py-2 rounded border-red-500");
            }
        }
    }, [password, confirmPassword, isDirty]);

    const user = {
        // name: "aa",
        // email: "aa@a.com",
        // password: "12345678aA@",
        name: name,
        email: email,
        password: password,
        address: address,
        city: city,
        country: country,
        phone: phone,
        speciality: speciality,
        organisation: organisation,
        profession: profession,
        license: license,
        licenseExpiry: licenseExpiry,
        type: "personnel",
        adminVerfiy: false,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(user);
        return userService
            .register(user)
            .then((res) => {
                setLoading(false);
                console.log(res);
                router.push("/login");
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const handleDate = (expiryDate) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const expiry = expiryDate.split("-");
        const expiryYear = expiry[0];
        const expiryMonth = expiry[1];
        const expiryDay = expiry[2];
        console.log("d", date);
        console.log("e", expiryYear, expiryMonth, expiryDay);
        console.log("t", year, month, day);
        if (expiryYear < year) {
            alert("License has expired");
            return false;
        } else if (expiryYear == year) {
            if (expiryMonth < month) {
                alert("License has expired");
                return false;
            } else if (expiryMonth == month) {
                if (expiryDay < day) {
                    alert("License has expired");
                    return false;
                }
            }
        }
        return true;
    };

    const listOrg = () => {
        const orgs = [];
        for (let i = 0; i < organisations.length; i++) {
            orgs.push(
                <option key={i} value={organisations[i]}>
                    {organisations[i]}
                </option>
            );
        }
        return orgs;
    }

    return (
        <>
            <div className="container mx-auto min-h-screen">
                <div className="my-10">
                    <h1 className="text-4xl text-center">
                        Register as Healthcare Personnel
                    </h1>
                </div>
                <Link href={"/"}>Go back to home</Link>
                <div className="flex justify-center items-center my-20">
                    <div className="border rounded-lg p-5 w-1/2">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col my-2">
                                <label htmlFor="name">
                                    Name
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="email">
                                    Email
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="password">
                                    Password
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <ul>
                                <li className={u}>
                                    &bull; Password must contain at least one
                                    uppercase letter
                                </li>
                                <li className={l}>
                                    &bull; Password must contain at least one
                                    lowercase letter
                                </li>
                                <li className={n}>
                                    &bull; Password must contain at least one
                                    number
                                </li>
                                <li className={s}>
                                    &bull; Password must contain at least one
                                    special character
                                </li>
                                <li className={ll}>
                                    &bull; Password must be at least 8
                                    characters
                                </li>
                            </ul>
                            <div className="flex flex-col my-2">
                                <label htmlFor="confirm-password">
                                    Confirm Password
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    name="confirm-password"
                                    className={cPassClass}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setIsDirty(true);
                                    }}
                                    required
                                />
                            </div>
                            {showError && isDirty ? (
                                <div className="text-red-500">
                                    Password do not match
                                </div>
                            ) : null}
                            <div className="flex flex-col my-2">
                                <label htmlFor="address">
                                    Address
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="city">
                                    City
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="country">
                                    Country
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    className="border px-4 py-2 rounded"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                >
                                    <option value="Select Country">
                                        Select your country
                                    </option>
                                    <option value="India">India</option>
                                    <option value="United States">
                                        United States
                                    </option>
                                    <option value="United Kingdom">
                                        United Kingdom
                                    </option>
                                    <option value="Canada">Canada</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Afghanistan">
                                        Afghanistan
                                    </option>
                                    <option value="Aland Islands">
                                        Aland Islands
                                    </option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="American Samoa">
                                        American Samoa
                                    </option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Anguilla">Anguilla</option>
                                    <option value="Antarctica">
                                        Antarctica
                                    </option>
                                    <option value="Antigua and Barbuda">
                                        Antigua and Barbuda
                                    </option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Aruba">Aruba</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">
                                        Azerbaijan
                                    </option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">
                                        Bangladesh
                                    </option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bermuda">Bermuda</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bonaire, Sint Eustatius and Saba">
                                        Bonaire, Sint Eustatius and Saba
                                    </option>
                                    <option value="Bosnia and Herzegovina">
                                        Bosnia and Herzegovina
                                    </option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Bouvet Island">
                                        Bouvet Island
                                    </option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="British Indian Ocean Territory">
                                        British Indian Ocean Territory
                                    </option>
                                    <option value="Brunei Darussalam">
                                        Brunei Darussalam
                                    </option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">
                                        Burkina Faso
                                    </option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Cape Verde">
                                        Cape Verde
                                    </option>
                                    <option value="Cayman Islands">
                                        Cayman Islands
                                    </option>
                                    <option value="Central African Republic">
                                        Central African Republic
                                    </option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Christmas Island">
                                        Christmas Island
                                    </option>
                                    <option value="Cocos (Keeling) Islands">
                                        Cocos (Keeling) Islands
                                    </option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Congo, Democratic Republic of the Congo">
                                        Congo, Democratic Republic of the Congo
                                    </option>
                                    <option value="Cook Islands">
                                        Cook Islands
                                    </option>
                                    <option value="Costa Rica">
                                        Costa Rica
                                    </option>
                                    <option value="Cote D'Ivoire">
                                        Cote D&apos;Ivoire
                                    </option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Curacao">Curacao</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czech Republic">
                                        Czech Republic
                                    </option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">
                                        Dominican Republic
                                    </option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">
                                        El Salvador
                                    </option>
                                    <option value="Equatorial Guinea">
                                        Equatorial Guinea
                                    </option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Falkland Islands (Malvinas)">
                                        Falkland Islands (Malvinas)
                                    </option>
                                    <option value="Faroe Islands">
                                        Faroe Islands
                                    </option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="French Guiana">
                                        French Guiana
                                    </option>
                                    <option value="French Polynesia">
                                        French Polynesia
                                    </option>
                                    <option value="French Southern Territories">
                                        French Southern Territories
                                    </option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Gibraltar">Gibraltar</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Greenland">Greenland</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guadeloupe">
                                        Guadeloupe
                                    </option>
                                    <option value="Guam">Guam</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guernsey">Guernsey</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guinea-Bissau">
                                        Guinea-Bissau
                                    </option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Heard Island and Mcdonald Islands">
                                        Heard Island and Mcdonald Islands
                                    </option>
                                    <option value="Holy See (Vatican City State)">
                                        Holy See (Vatican City State)
                                    </option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran, Islamic Republic of">
                                        Iran, Islamic Republic of
                                    </option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Isle of Man">
                                        Isle of Man
                                    </option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jersey">Jersey</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">
                                        Kazakhstan
                                    </option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Korea, Democratic People's Republic of">
                                        Korea, Democratic People&apos;s Republic
                                        of
                                    </option>
                                    <option value="Korea, Republic of">
                                        Korea, Republic of
                                    </option>
                                    <option value="Kosovo">Kosovo</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">
                                        Kyrgyzstan
                                    </option>
                                    <option value="Lao People's Democratic Republic">
                                        Lao People&apos;s Democratic Republic
                                    </option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libyan Arab Jamahiriya">
                                        Libyan Arab Jamahiriya
                                    </option>
                                    <option value="Liechtenstein">
                                        Liechtenstein
                                    </option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">
                                        Luxembourg
                                    </option>
                                    <option value="Macao">Macao</option>
                                    <option value="Macedonia, the Former Yugoslav Republic of">
                                        Macedonia, the Former Yugoslav Republic
                                        of
                                    </option>
                                    <option value="Madagascar">
                                        Madagascar
                                    </option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands">
                                        Marshall Islands
                                    </option>
                                    <option value="Martinique">
                                        Martinique
                                    </option>
                                    <option value="Mauritania">
                                        Mauritania
                                    </option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mayotte">Mayotte</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Micronesia, Federated States of">
                                        Micronesia, Federated States of
                                    </option>
                                    <option value="Moldova, Republic of">
                                        Moldova, Republic of
                                    </option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montenegro">
                                        Montenegro
                                    </option>
                                    <option value="Montserrat">
                                        Montserrat
                                    </option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">
                                        Mozambique
                                    </option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">
                                        Netherlands
                                    </option>
                                    <option value="Netherlands Antilles">
                                        Netherlands Antilles
                                    </option>
                                    <option value="New Caledonia">
                                        New Caledonia
                                    </option>
                                    <option value="New Zealand">
                                        New Zealand
                                    </option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Niue">Niue</option>
                                    <option value="Norfolk Island">
                                        Norfolk Island
                                    </option>
                                    <option value="Northern Mariana Islands">
                                        Northern Mariana Islands
                                    </option>
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Palau">Palau</option>
                                    <option value="Palestinian Territory, Occupied">
                                        Palestinian Territory, Occupied
                                    </option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea">
                                        Papua New Guinea
                                    </option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines">
                                        Philippines
                                    </option>
                                    <option value="Pitcairn">Pitcairn</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Puerto Rico">
                                        Puerto Rico
                                    </option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Reunion">Reunion</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russian Federation">
                                        Russian Federation
                                    </option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Saint Barthelemy">
                                        Saint Barthelemy
                                    </option>
                                    <option value="Saint Helena">
                                        Saint Helena
                                    </option>
                                    <option value="Saint Kitts and Nevis">
                                        Saint Kitts and Nevis
                                    </option>
                                    <option value="Saint Lucia">
                                        Saint Lucia
                                    </option>
                                    <option value="Saint Martin">
                                        Saint Martin
                                    </option>
                                    <option value="Saint Pierre and Miquelon">
                                        Saint Pierre and Miquelon
                                    </option>
                                    <option value="Saint Vincent and the Grenadines">
                                        Saint Vincent and the Grenadines
                                    </option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino">
                                        San Marino
                                    </option>
                                    <option value="Sao Tome and Principe">
                                        Sao Tome and Principe
                                    </option>
                                    <option value="Saudi Arabia">
                                        Saudi Arabia
                                    </option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Serbia and Montenegro">
                                        Serbia and Montenegro
                                    </option>
                                    <option value="Seychelles">
                                        Seychelles
                                    </option>
                                    <option value="Sierra Leone">
                                        Sierra Leone
                                    </option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Sint Maarten">
                                        Sint Maarten
                                    </option>
                                    <option value="Slovakia">Slovakia</option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands">
                                        Solomon Islands
                                    </option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">
                                        South Africa
                                    </option>
                                    <option value="South Georgia and the South Sandwich Islands">
                                        South Georgia and the South Sandwich
                                        Islands
                                    </option>
                                    <option value="South Sudan">
                                        South Sudan
                                    </option>
                                    <option value="Spain">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Svalbard and Jan Mayen">
                                        Svalbard and Jan Mayen
                                    </option>
                                    <option value="Swaziland">Swaziland</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">
                                        Switzerland
                                    </option>
                                    <option value="Syrian Arab Republic">
                                        Syrian Arab Republic
                                    </option>
                                    <option value="Taiwan, Province of China">
                                        Taiwan, Province of China
                                    </option>
                                    <option value="Tajikistan">
                                        Tajikistan
                                    </option>
                                    <option value="Tanzania, United Republic of">
                                        Tanzania, United Republic of
                                    </option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Timor-Leste">
                                        Timor-Leste
                                    </option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tokelau">Tokelau</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad and Tobago">
                                        Trinidad and Tobago
                                    </option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan">
                                        Turkmenistan
                                    </option>
                                    <option value="Turks and Caicos Islands">
                                        Turks and Caicos Islands
                                    </option>
                                    <option value="Tuvalu">Tuvalu</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Emirates">
                                        United Arab Emirates
                                    </option>
                                    <option value="United States Minor Outlying Islands">
                                        United States Minor Outlying Islands
                                    </option>
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Uzbekistan">
                                        Uzbekistan
                                    </option>
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Viet Nam">Viet Nam</option>
                                    <option value="Virgin Islands, British">
                                        Virgin Islands, British
                                    </option>
                                    <option value="Virgin Islands, U.s.">
                                        Virgin Islands, U.s.
                                    </option>
                                    <option value="Wallis and Futuna">
                                        Wallis and Futuna
                                    </option>
                                    <option value="Western Sahara">
                                        Western Sahara
                                    </option>
                                    <option value="Yemen">Yemen</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="phone">
                                    Phone
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your phone number"
                                    pattern="[0-9]{10}"
                                    minLength={10}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="profession">
                                    Profession
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="profession"
                                    name="profession"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your profession"
                                    value={profession}
                                    onChange={(e) =>
                                        setProfession(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="speciality">
                                    Speciality
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="speciality"
                                    name="speciality"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your speciality"
                                    value={speciality}
                                    onChange={(e) =>
                                        setSpeciality(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="organisation">
                                    Organisation
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="organisation"
                                    name="organisation"
                                    className="border px-4 py-2 rounded"
                                    value={organisation}
                                    onChange={(e) =>
                                        setOrganisation(e.target.value)
                                    }
                                    required
                                >
                                    <option value="Select your organisation">
                                        Select your organisation
                                    </option>
                                    {listOrg()}
                                </select>
                                {/* <input
                                    type="text"
                                    id="organisation"
                                    name="organisation"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your organisation"
                                    value={organisation}
                                    onChange={(e) =>
                                        setOrganisation(e.target.value)
                                    }
                                    required
                                /> */}
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="license">
                                    License ID
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="license"
                                    name="license"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your license ID"
                                    value={license}
                                    onChange={(e) => setLicense(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="license-expiry">
                                    License Expiry
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="license-expiry"
                                    name="license-expiry"
                                    className="border px-4 py-2 rounded"
                                    placeholder="Enter your license expiry"
                                    value={licenseExpiry}
                                    onChange={(e) => {
                                        handleDate(e.target.value);
                                        setLicenseExpiry(e.target.value);
                                    }}
                                    required
                                />
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
                                        "Register"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPers;

// personnel fields
// name
// email
// address
// location - city, country
// contact details
// license ID
// profession
// speciality
// organisation
//
