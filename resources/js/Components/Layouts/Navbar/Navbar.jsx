import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import NavLink from "./NavLink";
import ResponsiveNavLink from "./ResponsiveNavLink";
import Dropdown from "@/Components/UI/Dropdown";

const Navbar = ({ user }) => {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  const isAdmin = user && user.hasRole === "admin";

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <Link href="/">
                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
              </Link>
            </div>

            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
              <NavLink
                href={route("dashboard")}
                active={route().current("dashboard")}
              >
                Dashboard
              </NavLink>

              <NavLink
                href={route("project.index")}
                active={route().current("project.index")}
              >
                All Projects
              </NavLink>
              {isAdmin && (
                <NavLink
                  href={route("user.index")}
                  active={route().current("user.index")}
                >
                  Account
                </NavLink>
              )}
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center sm:ms-6">
            <div className="ms-3 relative">
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                    >
                      {user.name}

                      <svg
                        className="ms-2 -me-0.5 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                  <Dropdown.Link
                    href={route("logout")}
                    method="post"
                    as="button"
                  >
                    Log Out
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>

          <div className="-me-2 flex items-center sm:hidden">
            <button
              onClick={() => setShowingNavigationDropdown((state) => !state)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={
                    !showingNavigationDropdown ? "inline-flex" : "hidden"
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={
                    showingNavigationDropdown ? "inline-flex" : "hidden"
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={
          (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"
        }
      >
        <div className="pt-2 pb-3 space-y-1">
          <ResponsiveNavLink
            href={route("dashboard")}
            active={route().current("dashboard")}
          >
            Dashboard
          </ResponsiveNavLink>
          <ResponsiveNavLink
            href={route("project.index")}
            active={route().current("project.index")}
          >
            Project
          </ResponsiveNavLink>
          {isAdmin && (
            <ResponsiveNavLink
              href={route("user.index")}
              active={route().current("user.index")}
            >
              Account
            </ResponsiveNavLink>
          )}
        </div>

        <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
          <div className="px-4">
            <div className="font-medium text-gray text-gray-800 dark:text-gray-200">
              {user.name}
            </div>
            <div className="font-medium text-sm text-gray-500">
              {user.email}
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <ResponsiveNavLink method="post" href={route("logout")} as="button">
              Log Out
            </ResponsiveNavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
