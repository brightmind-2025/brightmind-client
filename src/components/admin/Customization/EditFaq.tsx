import React, { FC, useEffect, useState, useCallback } from "react";
import {
  useGetHeroDataQuery,
  useEditLayoutMutation,
} from "@/lib/features/layout/layoutApi";
import { styles } from "@/components/style/style";
import { toast } from "react-hot-toast";
import { FiHelpCircle, FiPlus, FiTrash2, FiSave } from "react-icons/fi";
import Loader from "../../Loader/Loader";

interface FAQItem {
  question: string;
  answer: string;
  _id?: string;
}

const EditFaq: FC = () => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading: updateLoading, isSuccess, error }] =
    useEditLayoutMutation();

  const [questions, setQuestions] = useState<FAQItem[]>([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean;
    index: number | null;
  }>({ show: false, index: null });

  // Initialize data
  useEffect(() => {
    if (data) {
      setQuestions(
        data.layout.faq.map((f: any) => ({
          question: f.question,
          answer: f.answer,
          _id: f._id || undefined,
        }))
      );
    }
  }, [data]);

  // Handle success notification
  useEffect(() => {
    if (isSuccess) {
      toast.success("FAQs updated successfully!");
    }
  }, [isSuccess]);

  // Handle error notification
  useEffect(() => {
    if (error && "data" in error) {
      const err = error as any;
      toast.error(err.data?.message || "Error updating FAQs");
    }
  }, [error]);

  const handleQuestionChange = useCallback((idx: number, value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], question: value };
      return updated;
    });
  }, []);

  const handleAnswerChange = useCallback((idx: number, value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], answer: value };
      return updated;
    });
  }, []);

  const handleAdd = useCallback(() => {
    setQuestions((prev) => [...prev, { question: "", answer: "" }]);
  }, []);

  const handleOpenDeleteConfirmation = useCallback((idx: number) => {
    setDeleteConfirmation({ show: true, index: idx });
  }, []);

  const handleCloseDeleteConfirmation = useCallback(() => {
    setDeleteConfirmation({ show: false, index: null });
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteConfirmation.index !== null) {
      setQuestions((prev) =>
        prev.filter((_, i) => i !== deleteConfirmation.index)
      );
      handleCloseDeleteConfirmation();
    }
  }, [deleteConfirmation.index, handleCloseDeleteConfirmation]);

  const handleSave = useCallback(async () => {
    if (questions.some((q) => !q.question.trim() || !q.answer.trim())) {
      toast.error("Please fill out all questions and answers before saving.");
      return;
    }

    try {
      await editLayout({ type: "FAQ", faq: questions }).unwrap();
    } catch {
      // Error handled in useEffect
    }
  }, [questions, editLayout]);

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto mt-8">
          <div className="mb-8">
            <h1
              className={`${styles.title} text-center text-2xl md:text-3xl font-bold text-gray-800 dark:text-white`}
            >
              FAQ Management
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
              Manage frequently asked questions for your users
            </p>
          </div>

          {/* FAQ List */}
          {questions.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-10 text-center">
              <FiHelpCircle className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                No FAQs Added
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Add questions and answers to help your users find information
                easily.
              </p>
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {questions.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="border-b border-gray-200 dark:border-slate-700 p-4 bg-gray-50 dark:bg-slate-900 flex justify-between items-center">
                    <h3 className="font-medium text-gray-800 dark:text-white flex items-center">
                      <FiHelpCircle className="mr-2 text-blue-500" />
                      Question {idx + 1}
                    </h3>
                    <button
                      onClick={() => handleOpenDeleteConfirmation(idx)}
                      className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 rounded-md transition-colors"
                      aria-label="Remove FAQ"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Question
                      </label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) =>
                          handleQuestionChange(idx, e.target.value)
                        }
                        placeholder="Enter question here"
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Answer
                      </label>
                      <textarea
                        value={item.answer}
                        onChange={(e) =>
                          handleAnswerChange(idx, e.target.value)
                        }
                        rows={3}
                        placeholder="Enter answer here"
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white text-sm resize-y"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom action buttons */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-5">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                onClick={handleAdd}
                className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-sm font-medium"
              >
                <FiPlus className="h-4 w-4" />
                <span>Add New Question</span>
              </button>

              <button
                onClick={handleSave}
                disabled={updateLoading}
                className={`w-full sm:w-auto px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 text-sm font-medium ${
                  updateLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {updateLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <FiSave className="h-4 w-4" />
                    <span>Save All Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Delete confirmation modal */}
          {deleteConfirmation.show && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Confirm Deletion
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Are you sure you want to delete this FAQ? This action cannot
                  be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleCloseDeleteConfirmation}
                    className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditFaq;
