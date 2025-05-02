import { styles } from "@/components/style/style";
import { useGetHeroDataQuery } from "@/lib/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};
const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };

      reader.readAsDataURL(file); // Moved this outside of onload
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN stack LMS platform"
            className={`
          ${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5 ">
          <label className={"${styles. label}"}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write something amazing ... "
            className={` ${styles.input} !h-40 !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Price</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="29"
              className={`
${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label className={`${styles.label}`}>
              Estimated Price (optional)
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="price"
              placeholder="29"
              className={`
                ${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={styles.label} htmlFor="tags">
              Course Tags
            </label>
            <input
              type="text"
              required
              name="tags"
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="MERN, Next 13, Socket io, Tailwind CSS, LMS"
              className={styles.input}
            />
          </div>
          <div className="w-[50%]">
            <label className={styles.label} htmlFor="demoUrl">
              Course Category
            </label>
            <select
              name="categories" // Changed from category to categories
              id="categorySelect"
              className={`${styles.input}`}
              value={courseInfo.categories} // Changed from category to categories
              onChange={
                (e: React.ChangeEvent<HTMLSelectElement>) =>
                  setCourseInfo({ ...courseInfo, categories: e.target.value }) // Changed from category to categories
              }
            >
              <option value="">Select Category</option>
              {categories.map((item: any) => (
                <option value={item.title} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={styles.label} htmlFor="level">
              Course Level
            </label>
            <select
              name="level"
              id="levelSelect"
              className={`${styles.input}`}
              value={courseInfo.level}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
            {/* <input
              type="text"
              name="level"
              value={courseInfo.level}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Beginner / Intermediate / Expert"
              className={styles.input}
            /> */}
          </div>
          <div className="w-[50%]">
            <label className={styles.label} htmlFor="demoUrl">
              Demo URL
            </label>
            <input
              type="text"
              name="demoUrl"
              required
              value={courseInfo.demoUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="URL_ADDRESS.com"
              className={styles.input}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full min-h-[10vh] border p-3 border-dashed flex items-center justify-center cursor-pointer transition
    ${dragging ? "bg-blue-500" : "bg-transparent"} 
    ${courseInfo.thumbnail ? "p-0" : ""}
    dark:border-white border-[#00000026]`}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt="Course Thumbnail"
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white text-center">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-3 cursor-pointer"
          />
        </div>
      </form>
      <br />
      <br />
    </div>
  );
};
export default CourseInformation;
