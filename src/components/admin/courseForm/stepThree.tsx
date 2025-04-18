import { useState } from "react";

interface Link {
  title: string;
  url: string;
}

interface StepThreeProps {
  next: () => void;
  prev: () => void;
  updateForm: (data: {
    videoTitle?: string;
    videoUrl?: string;
    videoLength?: string;
    videoDescription?: string;
    sourceLinks?: Link[];
  }) => void;
  formData: {
    videoTitle?: string;
    videoUrl?: string;
    videoLength?: string;
    videoDescription?: string;
    sourceLinks?: Link[];
  };
}

const StepThreeDemoContent = ({ next, prev, updateForm, formData }: StepThreeProps) => {
  const [videoTitle, setVideoTitle] = useState(formData.videoTitle || "");
  const [videoUrl, setVideoUrl] = useState(formData.videoUrl || "");
  const [videoLength, setVideoLength] = useState(formData.videoLength || "");
  const [videoDescription, setVideoDescription] = useState(formData.videoDescription || "");
  const [sourceLinks, setSourceLinks] = useState<Link[]>(formData.sourceLinks || [{ title: "", url: "" }]);

  const handleLinkChange = (index: number, field: keyof Link, value: string) => {
    const newLinks = [...sourceLinks];
    newLinks[index][field] = value;
    setSourceLinks(newLinks);
  };

  const addLink = () => {
    setSourceLinks([...sourceLinks, { title: "", url: "" }]);
  };

  const handleNext = () => {
    updateForm({
      videoTitle,
      videoUrl,
      videoLength,
      videoDescription,
      sourceLinks,
    });
    next();
  };

  return (
    <div className="space-y-4 bg-[#0F172A] p-6 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-4">Demo</h2>

      <input
        type="text"
        value={videoTitle}
        onChange={(e) => setVideoTitle(e.target.value)}
        placeholder="Video Title"
        className="w-full p-2 rounded bg-gray-800"
      />
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Video URL"
        className="w-full p-2 rounded bg-gray-800"
      />
      <input
        type="text"
        value={videoLength}
        onChange={(e) => setVideoLength(e.target.value)}
        placeholder="Video Length (in minutes)"
        className="w-full p-2 rounded bg-gray-800"
      />
      <textarea
        value={videoDescription}
        onChange={(e) => setVideoDescription(e.target.value)}
        placeholder="Video Description"
        className="w-full p-2 rounded bg-gray-800 h-28"
      />

      {sourceLinks.map((link, index) => (
        <div key={index} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Source code title..."
            value={link.title}
            onChange={(e) => handleLinkChange(index, "title", e.target.value)}
            className="w-full p-2 rounded bg-gray-800"
          />
          <input
            type="text"
            placeholder="Source code URL..."
            value={link.url}
            onChange={(e) => handleLinkChange(index, "url", e.target.value)}
            className="w-full p-2 rounded bg-gray-800"
          />
        </div>
      ))}

      <button
        onClick={addLink}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
      >
        Add Link
      </button>

      <div className="flex justify-between mt-6">
        <button onClick={prev} className="bg-gray-600 text-white px-4 py-2 rounded">
          Prev
        </button>
        <button onClick={handleNext} className="bg-green-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default StepThreeDemoContent;
