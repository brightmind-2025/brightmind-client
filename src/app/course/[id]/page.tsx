'use client'

import { use } from 'react';
import CourseDetailsPage from "../../../components/navbar/CourseDetailsPage";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); // unwrap the Promise

  return (
    <div>
      <CourseDetailsPage id={id} />
    </div>
  );
};

export default Page;
