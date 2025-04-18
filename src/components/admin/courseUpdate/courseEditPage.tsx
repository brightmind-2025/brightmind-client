"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { fetchCourseById } from "@/lib/thunks/courseThunks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateCourse } from "@/lib/thunks/courseThunks";

const EditCoursePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const course = useSelector(
    (state: RootState) => state.courses.selectedCourse
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    tags: "",
    level: "",
    demoUrl: "",
  });

  useEffect(() => {
    if (id) dispatch(fetchCourseById(id as string));
  }, [id, dispatch]);

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || "",
        description: course.description || "",
        price: course.price || 0,
        tags: Array.isArray(course.tags) ? course.tags.join(", ") : "",
        level: course.level || "",
        demoUrl: course.demoUrl || "",
      });
    }
  }, [course]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(
      updateCourse({
        id: id as string,
        updatedData: {
          ...formData,
          price: Number(formData.price),
          _id: course?._id || "",
          name: course?.name || "",
          thumbnail:
            typeof course?.thumbnail === "string"
              ? { public_id: "", url: course.thumbnail }
              : course?.thumbnail || { public_id: "", url: "" },
          benefits: course?.benefits || [],
          prerequisites: [],
          courseData: [],
        },
      })
    )
      .unwrap()
      .then(() => {
        console.log("Course updated!");
        router.push("/admin/current-course");
      })
      .catch((err: unknown) => {
        console.error("Update failed", err);
      });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-slate-800 p-6 rounded-lg text-white">
      <h2 className="text-xl font-semibold mb-4">Edit Course</h2>

      <div className="space-y-4">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Course Title"
          className="bg-slate-700 text-white"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Course Description"
          rows={5}
          className="w-full p-3 rounded-md bg-slate-700 text-white"
        />

        <Input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="bg-slate-700 text-white"
        />

        <Input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="bg-slate-700 text-white"
        />
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-slate-700 text-white"
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <Input
          name="demoUrl"
          value={formData.demoUrl}
          onChange={handleChange}
          placeholder="Demo Video URL"
          className="bg-slate-700 text-white"
        />

        <div className="flex justify-between mt-4">
          <Button onClick={() => router.back()} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;
