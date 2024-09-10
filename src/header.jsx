import { Link, NavLink } from "react-router-dom";
// import '../styles.css'; // Import your CSS file

function Header() {
    return (
        <>
            <nav>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                            </button>
                        </div>
                        <div className="border col-12 flex-col justify-between">
                            <div className="d-flex justify-between">
                                <div className="navlin col-11 d-flex flex-row justify-center align-middle">
                                    {/* Links */}
                                    <NavLink 
                                        to="/"
                                        className={({ isActive }) => `lin ${isActive ? 'active' : ''}`}
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink 
                                        to="/signin"
                                        className={({ isActive }) => `lin ${isActive ? 'active' : ''}`}
                                    >
                                        Sign-In
                                    </NavLink>
                                    <NavLink 
                                        to="/signup"
                                        className={({ isActive }) => `lin ${isActive ? 'active' : ''}`}
                                    >
                                        Sign-Up
                                    </NavLink>
                                    <NavLink 
                                        to="/profile"
                                        className={({ isActive }) => `lin ${isActive ? 'active' : ''}`}
                                    >
                                        UserProfile
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile menu */}
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Calendar
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
