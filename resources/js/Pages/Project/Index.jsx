import ProjectTable from "@/Components/Layouts/Table/ProjectTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, projects, success, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="w-full flex justify-between items-center">
          <h2 className="font-semibold text-xl text-white">Projects</h2>
          <div className="flex justify-between items-center gap-4">
            <Link
              href={route("project.create")}
              className="btn bg-blue-500 text-white "
            >
              Add new
            </Link>
          </div>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-success py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          <div className="bg-slate-800  overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-neutral">
              <ProjectTable projects={projects} queryParams={queryParams} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
