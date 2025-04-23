// app/courses/[id]/page.tsx
import { Course } from "@/types/types";

interface PageProps {
  params: { id: string };
}

const CourseDetailsPage = async ({ params }: PageProps) => {
  const res = await fetch(`http://localhost:4004/api/course/get-course/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Course not found");
  }

  const course: Course = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <p className="text-blue-500 font-semibold">₹{course.price}</p>
      <p>{course.courseData.length} Lectures</p>
        
    </div>
  );
};

export default CourseDetailsPage;
