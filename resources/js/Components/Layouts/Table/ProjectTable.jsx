import { Link, router } from "@inertiajs/react";
import TableHead from "./Layouts/TableHead";
import { useState, useEffect } from "react";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/libs/Constant";
import Pagination from "../Pagination";
import { Input } from "@/Components/UI/Input";
import SelectLabel from "@/Components/UI/Select";

export default function ProjectTable({
  projects,
  success,
  queryParams = null,
}) {
  const [sortField, setSortField] = useState(queryParams.sortField || null);
  const [sortDirection, setSortDirection] = useState(
    queryParams.sortDirection || null
  );
  const [searchTerm, setSearchTerm] = useState(queryParams.searchTerm || "");
  const [filterStatus, setFilterStatus] = useState(queryParams.status || "");

  useEffect(() => {
    // Update state when queryParams change
    setSortField(queryParams.sortField || null);
    setSortDirection(queryParams.sortDirection || null);
    setSearchTerm(queryParams.searchTerm || "");
    setFilterStatus(queryParams.status || "");
  }, [queryParams]);

  const sortChanged = (name) => {
    if (sortField === name) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(name);
      setSortDirection("asc");
    }
    updateQueryParams({
      sortField: name,
      sortDirection: sortDirection === "asc" ? "desc" : "asc",
    });
  };

  const updateQueryParams = (params) => {
    const updatedParams = { ...queryParams, ...params };
    if (params.status === "") {
      delete updatedParams.status; // Remove status from query params if empty
    }
    router.get(route("project.index"), updatedParams, { preserveState: true });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    updateQueryParams({ searchTerm: e.target.value });
  };

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setFilterStatus(selectedStatus);
    updateQueryParams({ status: selectedStatus });
  };

  const deleteProject = (project) => {
    if (!window.confirm("Are you sure you want to delete the project?")) {
      return;
    }
    router.delete(route("project.destroy", project.id));
  };

  const filteredProjects = filterStatus
    ? projects.data.filter((project) => project.status === filterStatus)
    : projects.data;

  return (
    <>
      {success && (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
          {success}
        </div>
      )}
      <div className="mb-4 flex gap-4 ">
        <Input
          type="text"
          placeholder="Search something here..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <SelectLabel value={filterStatus} onChange={handleFilterChange}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="canceled">Canceled</option>
          <option value="completed">Completed</option>
        </SelectLabel>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHead name="id">ID</TableHead>
              <th className="px-3 py-3">Image</th>
              <TableHead name="name">Name</TableHead>
              <TableHead name="status">Status</TableHead>
              <TableHead name="created_at">Create Date</TableHead>
              <TableHead name="due_date">Due Date</TableHead>
              <th className="px-3 py-3">Created By</th>
              <th className="px-3 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={project.id}
              >
                <td className="px-3 py-2">{project.id}</td>
                <td className="px-3 py-2">
                  <img
                    src={project.image_path}
                    style={{ width: 60 }}
                    alt={`Project ${project.id}`}
                  />
                </td>
                <th className="px-3 py-2 text-gray-100 hover:underline">
                  <Link href={route("project.show", project.id)}>
                    {project.name}
                  </Link>
                </th>
                <td className="px-3 py-2">
                  <span
                    className={
                      "px-2 py-1 rounded text-nowrap text-white " +
                      PROJECT_STATUS_CLASS_MAP[project.status]
                    }
                  >
                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                  </span>
                </td>
                <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                <td className="px-3 py-2">{project.createdBy.name}</td>
                <td className="px-3 py-2 text-nowrap">
                  <Link
                    href={route("project.edit", project.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProject(project)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-center">
        <Pagination
          links={projects.meta.links}
          updateQueryParams={updateQueryParams}
        />
      </div>
    </>
  );
}
// 2?
