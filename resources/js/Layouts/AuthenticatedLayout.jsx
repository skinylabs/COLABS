import Navbar from "@/Components/Layouts/Navbar/Navbar";

export default function AuthenticatedLayout({ user, header, children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar user={user} />
      {header && (
        <header className="fixed w-full mt-[4rem] bg-white dark:bg-gray-800 shadow z-[99]">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}
      <main className="pt-[9rem]">{children}</main>
    </div>
  );
}
