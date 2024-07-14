import { Link, router } from "@inertiajs/react";
import TableHead from "./Layouts/TableHead";
import Pagination from "../Pagination";

const UserTable = ({ users, success, queryParams = null }) => {
  const deleteUser = (user) => {
    if (!window.confirm("Are you sure you want to delete the user?")) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };

  //PAGINATION
  const updateQueryParams = (params) => {
    router.get(
      route("project.index"),
      { ...queryParams, ...params },
      { preserveState: true }
    );
  };

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
          <tr className="text-nowrap">
            <TableHead name="id">ID</TableHead>
            <TableHead name="name">Name</TableHead>
            <TableHead name="email">Email</TableHead>
            <TableHead name="created_at">Role</TableHead>
            <TableHead name="created_at">Create Date</TableHead>
            <th className="px-3 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.data.map((user) => (
            <tr
              className="bg-base-100 border-b dark:bg-gray-800 dark:border-gray-700"
              key={user.id}
            >
              <td className="px-3 py-2">{user.id}</td>
              <th className="px-3 py-2 text-gray-100 text-nowrap">
                {user.name}
              </th>
              <td className="px-3 py-2">{user.email}</td>
              <td className="px-3 py-2">{user.hasRole}</td>
              <td className="px-3 py-2 text-nowrap">{user.created_at}</td>
              {user.hasRole !== "admin" && (
                <td className="px-3 py-2 text-nowrap">
                  <Link
                    href={route("user.edit", user.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => deleteUser(user)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center">
        <Pagination
          links={users.meta.links}
          updateQueryParams={updateQueryParams}
        />
      </div>
    </>
  );
};

export default UserTable;
