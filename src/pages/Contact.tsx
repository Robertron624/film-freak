import { useState } from "react";

const Contact: React.FC = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);

        alert("Form submitted!");
    };

    return (
        <>
            <div className="flex flex-col text-center">
                <h1 className="text-center text-8xl font-bold">Contact</h1>
                <p className="text-gray-500 mt-6 text-lg">
                    Feel free to contact us at the following:
                </p>
                <ul className="flex flex-col gap-4 mt-20 text-left max-w-3xl mx-auto">
                    <li>
                        <a
                            href="mailto:contact@filmfreak.com"
                            className="text-slate-400"
                        >
                            Email: <span className="font-bold text-accent">
                                contact@filmfreak.com
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="tel:+1234567890"
                            className="text-slate-400"
                        >
                            Phone: <span className="font-bold text-accent">
                                +1 (234) 567-890
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://twitter.com"
                            className="text-slate-400"
                        >
                            Twitter: <span className="font-bold text-accent">
                                @filmfreak
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://facebook.com"
                            className="text-slate-400"
                        >
                            Facebook: <span className="font-bold text-accent">
                                /filmfreak
                            </span>
                        </a>
                    </li>
                </ul>
                <div>
                    <h2 className="text-2xl mt-20">
                        Or use the form below to send us a message:
                    </h2>
                    <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mt-4 max-w-3xl w-11/12 mx-auto text-left border border-light-purple p-4 rounded-md">
                        <label htmlFor="name" className="text-slate-400">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="p-2 rounded-sm"
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <label htmlFor="email" className="text-slate-400">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="p-2 rounded-sm"
                            onChange={handleChange}
                            value={formData.email}
                        />
                        <label htmlFor="message" className="text-slate-400">
                            Message:
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            className="p-2 rounded-sm"
                            onChange={handleChange}
                            value={formData.message}
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-accent text-slate-100 p-2 rounded-md mt-8 hover:bg-accent-dark transition-all duration-300 ease-in-out"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
    };

export default Contact;