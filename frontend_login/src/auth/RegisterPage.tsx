import React, {useRef, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { countries } from "../components/Countries";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () =>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    useEffect(() => {
        if (password.length === 0){
            setShowPasswordCheck(false);
        }else{
            setShowPasswordCheck(true);
        }
    },  [password])

    const sortedCountries = [...countries].sort((a,b) =>
        a.name.localeCompare(b.name)
    );

    const popupRef = useRef<HTMLDivElement>(null);
    
    const [ showCountryPopUp, setShowCountryPopUp] = useState(false);
    const [countrySelected, setCountrySelected] = useState('ESP')

    const [showPasswordCheck, setShowPasswordCheck] = useState(false);


    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
          setShowCountryPopUp(false);
        }
    };
    
    const handleSelectCountry = (countryCode : string) =>{
        setShowCountryPopUp(false);
        setCountrySelected(countryCode);
    }

    useEffect(() => {
        if (showCountryPopUp) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        // Limpiar el event listener cuando el componente se desmonte
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCountryPopUp]);



    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    
        const requestBody = {
            'email': email,
            'nickname': nickname,
            'first_name': name,
            'last_name': surname,
            'phone_number': phone,
            'password': password,
        };
    
        // Validación de la contraseña
        if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[()@#$%!/.\-_]/.test(password)) {
            setLoading(false);
            setError('Password does not meet the security requirements');
            return;
        }
    
        // Verificar si las contraseñas coinciden
        if (password !== confirmPassword) {
            setLoading(false);
            setError('Passwords do not match!');
            return;
        }
    
        try {
            console.log('Request body:', requestBody);

            // Hacer la solicitud POST
            const response = await axios.post('http://localhost:8000/auth/register/', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000, // Aumentar el timeout si el servidor tarda en responder
            });
    
            if (response.status === 201) {
                setLoading(false);
                navigate('/');  // Redirigir al home
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Error con la respuesta del servidor (como 4xx o 5xx)
                    setError(`Error: ${error.response.data.message || 'An error occurred'}`);
                    console.error('Error response data:', error.response.data);
                } else if (error.request) {
                    // La solicitud fue hecha pero no hubo respuesta
                    setError('No response from the server. Please try again later.');
                    console.error('Error request:', error.request);
                } else {
                    // Error en la configuración de la solicitud
                    setError('An error occurred while setting up the request.');
                    console.error('Error message:', error.message);
                }
            } else {
                // Error no relacionado con Axios
                setError('An unexpected error occurred.');
                console.error('Unexpected error:', error);
            }
        } finally {
            setLoading(false);
        }
    };
    


    
    return (
        <div>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                    Flowbite    
                </Link>
                <div className="w-full lg:w-3/4 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700 relative">
                    {loading && (
                        <div className="absolute bg-white rounded-lg bg-opacity-60 z-50 h-full w-full flex items-center justify-center">
                            <div className="flex items-center">
                            <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            </div>
                        </div>
                    )}
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                    
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" method="POST" onSubmit={(e) => {handleFormSubmit(e)}}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nickname</label>
                                <input type="text" name="nickname" onChange={ (e) => {setNickname(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" placeholder="elonmusk" required={true} />
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" name="name" onChange={ (e) => {setName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" placeholder="Elon" required={true} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Surname</label>
                                    <input type="text" name="surname" onChange={ (e) => {setSurname(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" placeholder="Musk" required={true} />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" onChange={ (e) => {setEmail(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" placeholder="name@company.com" required={true} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                                    <div>
                                        <div className="flex">
                                            <button onClick={() => {setShowCountryPopUp(true)}} className="flex-shrink-0 w-32 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-0 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                                                <img
                                                    src={countries.find(country => country.code === countrySelected)?.flag}
                                                    alt={`Bandera de ${countries.find(country => country.code === countrySelected)?.name}`}
                                                    className="h-3.5 w-3.5 rounded-full me-2" // Alineación y estilo del icono
                                                    style={{ marginRight: "10px" }}
                                                    />
                                                {countrySelected} 
                                                <p className="ml-2 text-gray-400">{countries.find(country => country.code === countrySelected)?.prefix}</p>
                                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                                            </svg>
                                            </button>
                                            {showCountryPopUp &&(
                                            <div ref={popupRef} className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 max-h-64 overflow-y-scroll">
                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="states-button">
                                                    {sortedCountries.map( country => {
                                                        return (
                                                            <li>
                                                                <button type="button" onClick={() => {handleSelectCountry(country.code)}} className={`inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${countrySelected === country.code ? 'dark:bg-gray-600' : ''}`}>
                                                                    <div className="inline-flex items-center">
                                                                        <img
                                                                        src={country.flag}
                                                                        alt={`Bandera de ${country.name}`}
                                                                        className="h-3.5 w-3.5 rounded-full me-2" // Alineación y estilo del icono
                                                                        style={{ marginRight: "10px" }}
                                                                        />
                                                                        {country.name}
                                                                    </div>
                                                                </button>
                                                            </li>
                                                        )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            )}
                                            <input type="number" name="phone" id="phone_number" onChange={ (e) => {setPhone(`${countries.find(country => country.code === countrySelected)?.prefix}${e.target.value}`)}} className="bg-gray-50 border rounded-e-lg border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" placeholder="314159263" required={true} /> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" onClick={()=>{setShowPasswordCheck(true)}} onChange={ (e) => {setPassword(e.target.value)}} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" required={true}/>
                            </div>
                            {showPasswordCheck && (
                                <div>
                                    <ul>
                                        <li className={ password.length < 8 && password.length > 0 ? 'text-red-500' : password.length >= 8 ? 'text-green-500' : 'text-white'}>At least 8 caracteres</li>
                                        <li className={password.length === 0 ? 'text-white' : /\d/.test(password) ? 'text-green-500' : 'text-red-500'}>At least one number</li>
                                        <li className={password.length === 0 ? 'text-white' : /[A-Z]/.test(password) ? 'text-green-500' : 'text-red-500'}>At least one Uppercase</li>
                                        <li className={password.length === 0 ? 'text-white' : /[a-z]/.test(password) ? 'text-green-500' : 'text-red-500'}>At least one lowecase</li>
                                        <li className={password.length === 0 ? 'text-white' : /[()@#$%!/.\-_]/.test(password) ? 'text-green-500' : 'text-red-500'}>At least one special caracter ()*@#$%!.-_</li>
                                    </ul>
                                </div>
                            )}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="password" name="confirm-password" onChange={ (e) => {setConfirmPassword(e.target.value)}} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" required={true} />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={true} />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <button type="submit" className="w-2/3 mx-auto text-black bg-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                <p className="text-red-500 mx-auto mt-2">{error}</p>
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <div onClick={handleFormSubmit}>
            ONCLICK
        </div>
    </div>
    )
}

export default RegisterPage;