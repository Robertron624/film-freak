const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

export default function Header() {
    return (
        <header>
        <nav>
            <ul>
            {navLinks.map((link) => (
                <li key={link.path}>
                <a href={link.path}>{link.title}</a>
                </li>
            ))}
            </ul>
        </nav>
        </header>
    );
}