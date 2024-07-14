import { Input, InputError } from "@/Components/UI/Input";
import SelectLabel from "@/Components/UI/Select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, project }) {
  const { data, setData, put, errors, reset } = useForm({
    image: null,
    name: project.name || "",
    status: project.status || "",
    description: project.description || "",
    due_date: project.due_date || "",
    priority: project.priority || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    put(route("project.update", project.id));
  };

  const handleInputImage = (e) => setData("image", e.target.files[0]);
  const handleInputName = (e) => setData("name", e.target.value);
  const handleInputDescription = (e) => setData("description", e.target.value);
  const handleInputDate = (e) => setData("due_date", e.target.value);
  const handleSelectLabel = (e) => setData("status", e.target.value);
  const handleInputPriority = (e) => setData("priority", e.target.value);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit Project "{project.name}"
          </h2>
        </div>
      }
    >
      <Head title="Edit Project" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-base-100 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-base-100 dark:bg-gray-800 shadow sm:rounded-lg"
            >
              {project.image_path && (
                <div className="mb-4">
                  <img src={project.image_path} className="w-64" />
                </div>
              )}
              <div>
                <Input
                  labelName="Project Image"
                  htmlFor="project_image_path"
                  type="file"
                  name="image"
                  onChange={handleInputImage}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <Input
                  labelName="Project Name"
                  htmlFor="project_name"
                  type="text"
                  value={data.name}
                  onChange={handleInputName}
                  placeholder="Type your project name"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <Input
                  labelName="Project Description"
                  htmlFor="project_description"
                  type="textarea"
                  value={data.description}
                  onChange={handleInputDescription}
                  placeholder="Type your simple description..."
                />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <Input
                  type="date"
                  labelName="Due Date"
                  htmlFor="due_date"
                  value={data.due_date}
                  onChange={handleInputDate}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <SelectLabel
                  labelName="Project Status"
                  name="status"
                  htmlFor="project_status"
                  value={data.status}
                  onChange={handleSelectLabel}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectLabel>
                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-4">
                <SelectLabel
                  labelName="Project Priority"
                  name="priority"
                  htmlFor="project_priority"
                  value={data.priority}
                  onChange={handleInputPriority}
                >
                  <option value="" disabled>
                    Select priority
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectLabel>
                <InputError message={errors.priority} className="mt-2" />
              </div>
              <div className="mt-4 flex gap-4 justify-end">
                <Link
                  href={route("project.index")}
                  className="btn btn-error text-white transition-all"
                >
                  Cancel
                </Link>
                <button className="btn btn-success text-white transition-all">
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
