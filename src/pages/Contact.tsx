import { useState } from "react";

// Material UI icons
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const contactItems = [
    {
        icon: EmailIcon,
        text: "Email",
        link: "mailto:contact@filmfreak.com",
        value: "contact@filmfreak.com",
    },
    {
        icon: PhoneIcon,
        text: "phone",
        link: "tel:+1234567890",
        value: "+1 (234) 567-890",
    },
    {
        icon: TwitterIcon,
        text: "Twitter",
        link: "https://twitter.com/filmfreak",
        value: "@filmfreak",
    },
    {
        icon: FacebookIcon,
        text: "Facebook",
        link: "https://facebook.com/filmfreak",
        value: "/filmfreak",
    },
];


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

        console.log("Data to be submitted", formData);

        alert("Form submitted!");
    };

    return (
        <>
            <div className="flex flex-col text-center">
                <h1 className="text-center text-6xl md:text-8xl font-bold">Contact</h1>
                <p className="text-gray-500 mt-6 text-lg">
                    Feel free to contact us at the following:
                </p>
                <ul className="flex flex-col gap-4 mt-20 text-left max-w-3xl mx-auto">
                    {contactItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.link}
                                className="text-slate-400"
                            >
                                <item.icon
                                    sx={{ fontSize: 20 }}
                                    className="mr-2"
                                />
                                <span className="sr-only">
                                    {item.text}
                                </span>
                                <span className="font-bold text-accent">
                                    {item.value}
                                </span>
                            </a>
                        </li>
                    ))}
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