import { styles } from "@/components/style/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/lib/features/layout/layoutApi";
import React, { FC, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineCamera,
  AiOutlineCloudUpload,
  AiOutlineDelete,
} from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showImageMenu, setShowImageMenu] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, error }] =
    useEditLayoutMutation();

  // Populate state when data loads
  useEffect(() => {
    if (data) {
      setTitle(data.layout.banner.title);
      setSubTitle(data.layout.banner.subTitle);
      setImage(data.layout.banner.image[0]?.url || "");
    }
  }, [data]);

  // Handle success toast once
  useEffect(() => {
    if (isSuccess) {
      toast.success("Hero updated successfully!");
      refetch();
    }
  }, [isSuccess, refetch]);

  // Handle error toast once
  useEffect(() => {
    if (error && "data" in error) {
      const err = error as any;
      toast.error(err.data?.message || "Error updating");
    }
  }, [error]);

  // File processing
  const processFile = (file: File) => {
    if (!file.type.match("image.*")) {
      toast.error("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  // Drag & drop handlers
  const handleDragEnter = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) processFile(e.dataTransfer.files[0]);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
    setShowImageMenu(false);
  };
  const handleRemoveImage = () => {
    setImage("");
    setShowImageMenu(false);
  };

  const handleEdit = async () => {
    if (!image) {
      toast.error("Please upload an image");
      return;
    }
    try {
      await editLayout({ type: "Banner", image, title, subTitle }).unwrap();
    } catch {
      toast.error("Error saving changes");
    }
  };

  const hasChanges =
    data?.layout.banner.title !== title ||
    data?.layout.banner.subTitle !== subTitle ||
    data?.layout.banner.image[0]?.url !== image;

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto p-6">
      {/* Image Management */}
      <div className="md:w-1/2 flex flex-col items-center">
        <div
          className={`relative w-80 h-80 md:w-96 md:h-96 mb-4 transition-transform duration-200 ${
            isDragging ? "scale-105 shadow-xl" : ""
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div
            className={`w-full h-full border-2 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-800 overflow-hidden transition-colors ${
              isDragging
                ? "border-blue-500"
                : "border-dashed border-blue-300"
            }`}
          >
            {image ? (
              <img src={image} alt="hero banner" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                <AiOutlineCloudUpload className="mx-auto text-5xl mb-3" />
                <p className="font-medium mb-1">Drag & Drop Image Here</p>
                <p className="text-sm">or click to browse files</p>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            id="banner"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={(e) => { e.stopPropagation(); setShowImageMenu(!showImageMenu); }}
            className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md shadow-lg transition-colors z-10"
          >
            <AiOutlineCamera className="text-xl" />
          </button>

          {showImageMenu && (
            <div
              ref={menuRef}
              className="absolute bottom-16 right-4 bg-white dark:bg-gray-800 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 w-48 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="py-1">
                <li>
                  <button
                    onClick={handleUploadClick}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <AiOutlineCloudUpload className="mr-2" />
                    Browse Files
                  </button>
                </li>
                {image && (
                  <li>
                    <button
                      onClick={handleRemoveImage}
                      className="flex items-center w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <AiOutlineDelete className="mr-2" />
                      Remove Image
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {!image && (
          <div
            onClick={handleUploadClick}
            className="text-blue-500 hover:text-blue-700 cursor-pointer mt-2 flex items-center"
          >
            <AiOutlineCloudUpload className="mr-1" /> Select image file
          </div>
        )}

        <div className="text-sm text-gray-500 mt-2 text-center max-w-xs">
          Drag and drop an image file or use the camera button to manage the
          banner image
        </div>
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 md:pl-12 space-y-6 mt-8 md:mt-0">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          rows={2}
          className="w-full h-[165px] text-3xl md:text-4xl font-bold bg-transparent text-gray-900 dark:text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2 transition-colors"
        />

        <textarea
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="Subtitle"
          rows={3}
          className="w-full text-lg bg-transparent text-gray-600 dark:text-gray-300 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2 transition-colors"
        />

        <button
          onClick={handleEdit}
          disabled={!hasChanges || isLoading}
          className={
            `px-6 py-2 rounded-md text-lg font-medium transition-colors w-full md:w-auto ` +
            (hasChanges && !isLoading
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400")
          }
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditHero;
