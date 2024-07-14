import { Input, InputError } from "@/Components/UI/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, user }) {
  const { data, setData, post, errors, reset } = useForm({
    name: user.name || "",
    email: user.email || "",
    password: "",
    password_confirmation: "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("user.update", user.id));
  };

  const handleInputName = (e) => setData("name", e.target.value);
  const handleInputEmail = (e) => setData("email", e.target.value);
  const handleInputPassword = (e) => setData("password", e.target.value);
  const handleInputPasswordConfirmation = (e) =>
    setData("password_confirmation", e.target.value);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit user "{user.name}"
          </h2>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-base-100 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-base-100 dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <Input
                  labelName="User Name"
                  htmlFor="user_name"
                  type="text"
                  value={data.name}
                  onChange={handleInputName}
                  placeholder="Type your name"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <Input
                  labelName="User Email"
                  htmlFor="user_email"
                  type="text"
                  value={data.email}
                  onChange={handleInputEmail}
                  placeholder="Type your name"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="mt-4">
                <Input
                  labelName="Password"
                  htmlFor="user_password"
                  type="password"
                  value={data.password}
                  onChange={handleInputPassword}
                  placeholder="Type your password"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="mt-4">
                <Input
                  labelName="Password Confirmation"
                  htmlFor="user_password_confirmation"
                  type="password"
                  value={data.password_confirmation}
                  onChange={handleInputPasswordConfirmation}
                  placeholder="Retype your password"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("user.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
