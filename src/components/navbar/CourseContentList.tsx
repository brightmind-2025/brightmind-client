import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: (index: number) => void;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  // Find unique video sections
  const videoSections: string[] = [
    ...new Set<string>(props.data?.map((item: any) => item.videoSection)),
  ];

  let totalCount: number = 0; // Total count of videos from previous sections

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mb w-full rounded-lg ${
        !props.isDemo && "ml-[-30px] min-h-screen sticky top-24 left-0 z-30"
      }`}
    >
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);

        // Filter videos by section
        const sectionVideos: any[] = props.data.filter(
          (item: any) => item.videoSection === section
        );

        const sectionVideoCount: number = sectionVideos.length; // Number of videos in the current section
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );

        const sectionStartIndex: number = totalCount; // Start index of videos within the current section
        totalCount += sectionVideoCount; // Update the total count of videos

        const sectionContentHours: number = sectionVideoLength / 60;
        return (
          <div
            className={`mb-5 p-4 rounded-lg shadow-sm ${
              !props.isDemo ? "border-b border-[#ffffff8e]" : ""
            } 
            hover:shadow-md transition-all duration-300`}
            key={section}
          >
            <div className="w-full flex">
              {/* Render video section */}
              <div className="w-full flex justify-between items-center">
                <h2 className="text-[22px] font-semibold text-black dark:text-white">
                  {section}
                </h2>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-black dark:text-white"
                  onClick={() => toggleSection(section)}
                  aria-label={
                    isSectionVisible ? "Collapse section" : "Expand section"
                  }
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} />
                  ) : (
                    <BsChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-1 text-sm text-black dark:text-white opacity-80">
              <span className="font-medium">{sectionVideoCount} Lessons</span>
              <span>•</span>
              <span>
                {sectionVideoLength < 60
                  ? sectionVideoLength
                  : sectionContentHours.toFixed(2)}{" "}
                {sectionVideoLength > 60 ? "hours" : "minutes"}
              </span>
            </div>

            {isSectionVisible && (
              <div className="w-full mt-4 space-y-2">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index; // Calculate the video index within the overall list
                  const contentLength: number = item.videoLength / 60;
                  const isActive = videoIndex === props.activeVideo;

                  return (
                    <div
                      className={`w-full rounded-md ${
                        isActive
                          ? "bg-slate-800"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      } 
                      cursor-pointer transition-all p-3 ${
                        isActive ? "border-l-4 border-[#1cdada]" : ""
                      }`}
                      key={item._id}
                      onClick={() =>
                        props.isDemo
                          ? null
                          : props.setActiveVideo &&
                            props.setActiveVideo(videoIndex)
                      }
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            isActive
                              ? "bg-slate-700"
                              : "bg-gray-100 dark:bg-gray-700"
                          }`}
                        >
                          <MdOutlineOndemandVideo size={20} color="#1cdada" />
                        </div>
                        <div className="flex-1">
                          <h1 className="text-[16px] font-medium leading-tight break-words text-black dark:text-white">
                            {item.title}
                          </h1>
                          <div className="mt-1 text-sm text-black dark:text-white opacity-70">
                            {item.videoLength > 60
                              ? contentLength.toFixed(2)
                              : item.videoLength}{" "}
                            {item.videoLength > 60 ? "hours" : "minutes"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
