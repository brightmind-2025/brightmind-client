import React, { useState, useEffect, useCallback } from "react";
import Loader from "../../Loader/Loader";
import { toast } from "react-hot-toast";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/lib/features/layout/layoutApi";
import { styles } from "@/components/style/style";
import { FiEdit, FiTrash2, FiCheck, FiX, FiPlus } from "react-icons/fi";

type CategoryType = {
  title: string;
  _id?: string;
};

const EditCategories: React.FC = () => {
  // Data fetching with refetch option
  const { data, isLoading } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading: updateLoading, isSuccess, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean;
    index: number | null;
  }>({ show: false, index: null });

  // Handle data initialization only once when data changes
  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  // Handle success and error notifications separately from data loading
  useEffect(() => {
    if (isSuccess) {
      toast.success("Categories updated successfully!");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message || "Something went wrong");
      }
    }
  }, [error]);

  const handleAddCategory = useCallback(() => {
    if (newCategory.trim() === "") {
      toast.error("Category name cannot be empty");
      return;
    }

    const categoryExists = categories.some(
      (cat) => cat.title.toLowerCase() === newCategory.toLowerCase()
    );

    if (categoryExists) {
      toast.error("Category already exists");
      return;
    }

    setCategories((prev) => [...prev, { title: newCategory }]);
    setNewCategory("");
  }, [newCategory, categories]);

  const handleOpenDeleteConfirmation = useCallback((index: number) => {
    setDeleteConfirmation({ show: true, index });
  }, []);

  const handleCloseDeleteConfirmation = useCallback(() => {
    setDeleteConfirmation({ show: false, index: null });
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteConfirmation.index !== null) {
      setCategories((prev) => {
        const updated = [...prev];
        if (deleteConfirmation.index !== null) {
          updated.splice(deleteConfirmation.index, 1);
        }
        return updated;
      });
      handleCloseDeleteConfirmation();
    }
  }, [deleteConfirmation.index, handleCloseDeleteConfirmation]);

  const handleStartEdit = useCallback((index: number) => {
    setEditingIndex(index);
    setEditValue(categories[index].title);
  }, [categories]);

  const handleSaveEdit = useCallback((index: number) => {
    if (editValue.trim() === "") {
      toast.error("Category name cannot be empty");
      return;
    }

    const categoryExists = categories.some(
      (cat, i) => i !== index && cat.title.toLowerCase() === editValue.toLowerCase()
    );

    if (categoryExists) {
      toast.error("Category already exists");
      return;
    }

    setCategories((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], title: editValue };
      return updated;
    });
    setEditingIndex(null);
  }, [categories, editValue]);

  const handleCancelEdit = useCallback(() => {
    setEditingIndex(null);
  }, []);

  const handleUpdateCategories = useCallback(async () => {
    if (categories.length === 0) {
      toast.error("You need at least one category");
      return;
    }

    try {
      await editLayout({
        type: "Categories",
        categories: categories,
      }).unwrap();
    } catch (err) {
      // Error already handled in useEffect
    }
  }, [categories, editLayout]);

  // Handle pressing Enter key in inputs
  const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto mt-8">
          <div className="mb-8">
            <h1 className={`${styles.title} text-center text-2xl md:text-3xl font-bold text-gray-800 dark:text-white`}>
              Categories Management
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
              Manage your course and content categories
            </p>
          </div>

          {/* Add New Category Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-8 overflow-hidden">
            <div className="border-b border-gray-200 dark:border-slate-700 p-4 bg-gray-50 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Add New Category
              </h2>
            </div>
            <div className="p-5">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleAddCategory)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white text-sm"
                  aria-label="New category name"
                />
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex-shrink-0 flex items-center gap-2 text-sm font-medium"
                >
                  <FiPlus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Categories List Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-8 overflow-hidden">
            <div className="border-b border-gray-200 dark:border-slate-700 p-4 bg-gray-50 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                All Categories
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {categories.length} {categories.length === 1 ? 'category' : 'categories'} total
              </p>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-slate-700">
              {categories.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    No categories found. Add some categories above.
                  </p>
                </div>
              ) : (
                categories.map((category, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-900 dark:hover:bg-slate-750 transition-colors"
                  >
                    {editingIndex === index ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, () => handleSaveEdit(index))}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white text-sm"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(index)}
                          className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
                          aria-label="Save changes"
                        >
                          <FiCheck className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all flex items-center gap-2"
                          aria-label="Cancel editing"
                        >
                          <FiX className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800 dark:text-white font-medium">
                          {category.title}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStartEdit(index)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg transition-all"
                            aria-label={`Edit ${category.title}`}
                          >
                            <FiEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteConfirmation(index)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg transition-all"
                            aria-label={`Delete ${category.title}`}
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <button
              onClick={handleUpdateCategories}
              disabled={updateLoading}
              className={`px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 ${
                updateLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {updateLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Updating...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
          
          {/* Delete Confirmation Modal */}
          {deleteConfirmation.show && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Confirm Deletion
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Are you sure you want to delete this category? This action cannot be undone.
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

export default EditCategories;