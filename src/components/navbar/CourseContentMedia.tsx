import CoursePlayer from "@/utils/CoursePlayer";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { BsFileEarmarkText, BsQuestionCircle } from "react-icons/bs";
import {
  MdAccessTime,
  MdCheckCircle,
  MdOutlineFeedback,
  MdOutlineOndemandVideo,
  MdOutlineRateReview,
  MdRateReview,
  MdRefresh,
  MdReply,
  MdSend,
  MdSort,
} from "react-icons/md";
import { VscVerifiedFilled } from "react-icons/vsc";
import Image from "next/image";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import Ratings from "@/utils/Ratings";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/lib/features/courses/courseApi";
import { io, Socket } from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socket: Socket = io(ENDPOINT, {
  transports: ["websocket"],
});
type Props = {
  data: any;
  id?: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user?: any;
  refetch?: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");

  // Mutations
  const [addNewQuestion, { isSuccess, error, isLoading: loadingQuestion }] =
    useAddNewQuestionMutation();

  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation({});

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const course = courseData?.course;
  const progressPercent = ((activeVideo + 1) / data.length) * 100;

  // Check if user has already reviewed this course
  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  // Navigation functions
  const handleNavigation = (direction: "prev" | "next") => {
    if (direction === "prev" && activeVideo > 0) {
      setActiveVideo(activeVideo - 1);
    } else if (direction === "next" && activeVideo < data.length - 1) {
      setActiveVideo(activeVideo + 1);
    }
  };

  // Handle question submission
  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  // Handle answer submission
  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  // Handle review submission
  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else if (rating === 0) {
      toast.error("Please provide a rating");
    } else {
      addReviewInCourse({
        review,
        rating,
        courseId: id,
      });
    }
  };

  // Effect for question success/error
  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      socket.emit("notification", {
        title: " New Question Received",
        message: `${user.name} posted a question in the course ${data[activeVideo].title}`,
        userId: user._id,
      });
      refetch();
      toast.success("Question added successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  // Effect for answer success/error
  useEffect(() => {
    if (answerSuccess) {
      setAnswer("");
      courseRefetch();
      toast.success("Answer added successfully");
      if (user.role === "admin") {
        socket.emit("notification", {
          title: " Answer Received",
          message: `${user.name} answered a question in the course ${data[activeVideo].title}`,
          userId: user._id,
        });
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [answerSuccess, answerError, courseRefetch]);

  // Effect for review success/error
  useEffect(() => {
    if (reviewSuccess) {
      setReview("");
      setRating(0);

      setReviewSubmitted(true);
      toast.success("Review added successfully. Refresh to see your review.");
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [reviewSuccess, reviewError]);

  // Data for tabs
  const tabs = [
    {
      name: "Overview",
      icon: <MdOutlineOndemandVideo size={18} className="mr-2" />,
    },
    {
      name: "Resources",
      icon: <BsFileEarmarkText size={18} className="mr-2" />,
    },
    {
      name: "Q&A",
      icon: <BsQuestionCircle size={18} className="mr-2" />,
    },
    {
      name: "Reviews",
      icon: <MdOutlineRateReview size={18} className="mr-2" />,
    },
  ];

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId });
      }
    }
  };
  useEffect(() => {
    if (replySuccess) {
      setReply("");
      setIsReviewReply(false);
      courseRefetch();
      toast.success("Reply added successfully");
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = replyError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [replySuccess, replyError, courseRefetch]);

  return (
    <div className="w-[95%] 800px:w-[90%] py-8 m-auto">
      {/* Course Header & Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-red-500 px-3 py-1 rounded-md text-white font-semibold">
            Module {activeVideo + 1}/{data.length}
          </div>
          <h2 className="text-gray-300 font-medium hidden md:block">
            {progressPercent.toFixed(0)}% Complete
          </h2>
        </div>

        {/* Progress bar */}
        <div className="flex-1 mx-4 hidden md:block">
          <div className="w-full bg-gray-800 rounded-full h-2.5">
            <div
              className="bg-red-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all ${
              activeVideo === 0
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
            onClick={() => handleNavigation("prev")}
            disabled={activeVideo === 0}
          >
            <AiOutlineArrowLeft className="mr-2" />
            <span className="hidden md:inline">Previous</span>
          </button>

          <button
            className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all ${
              activeVideo === data.length - 1
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
            onClick={() => handleNavigation("next")}
            disabled={activeVideo === data.length - 1}
          >
            <span className="hidden md:inline">Next</span>
            <AiOutlineArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden mb-6">
        <div className="w-full bg-gray-800 rounded-full h-2.5">
          <div
            className="bg-red-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-gray-300 text-right text-sm mt-1">
          {progressPercent.toFixed(0)}% Complete
        </div>
      </div>

      {/* Video Player */}
      <div className="rounded-xl overflow-hidden shadow-xl mb-8 border border-gray-700 bg-gray-900">
        <CoursePlayer
          title={data[activeVideo]?.title}
          videoUrl={data[activeVideo]?.videoUrl}
        />
      </div>

      {/* Lesson Title */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">
          {data[activeVideo]?.title}
        </h1>
      </div>

      {/* Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex items-center border-b border-gray-700 min-w-max">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex items-center py-4 px-6 font-medium transition-all whitespace-nowrap ${
                activeBar === index
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveBar(index)}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="bg-gray-800 rounded-xl p-5 md:p-6 shadow-lg border border-gray-700">
        {/* Overview Tab */}
        {activeBar === 0 && (
          <div className="text-gray-200 leading-relaxed">
            <p className="text-lg whitespace-pre-line">
              {data[activeVideo]?.description}
            </p>
          </div>
        )}

        {/* Resources Tab */}
        {activeBar === 1 && (
          <div className="space-y-4">
            {data[activeVideo]?.links.length > 0 ? (
              data[activeVideo]?.links.map((item: any, index: number) => (
                <div
                  key={index}
                  className="p-5 bg-gray-700 rounded-lg transition hover:bg-gray-600 border border-gray-600"
                >
                  <h2 className="text-lg font-medium mb-1 flex items-center">
                    <BsFileEarmarkText className="mr-2 text-red-400" />
                    {item.title}
                  </h2>
                  <a
                    className="text-blue-400 hover:text-blue-300 transition-colors break-all flex items-center"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.url}
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-750 rounded-lg border border-gray-600">
                <BsFileEarmarkText className="mx-auto mb-4 text-4xl text-gray-500" />
                <p className="text-gray-400">
                  No resources available for this lesson
                </p>
              </div>
            )}
          </div>
        )}

        {/* Q&A Tab */}
        {activeBar === 2 && (
          <>
            <div className="bg-gray-750 rounded-lg p-5 mb-6 border border-gray-600">
              <h3 className="font-medium text-lg mb-4">Ask a Question</h3>
              <div className="flex w-full">
                <div className="flex-shrink-0">
                  <Image
                    src={user.avatar ? user.avatar.url : "/assets/avatar.png"}
                    alt="User Avatar"
                    width={50}
                    height={50}
                    className="rounded-full object-cover w-[40px] h-[40px] mr-4"
                  />
                </div>
                <div className="flex-grow">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="What's your question about this lesson?"
                    className="outline-none bg-gray-800 border border-gray-600 p-3 rounded-lg w-full text-base font-medium resize-none focus:border-red-500 transition-colors"
                    rows={3}
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <button
                      className={`px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all ${
                        loadingQuestion && "opacity-70 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        if (!loadingQuestion) handleQuestion();
                      }}
                      disabled={loadingQuestion}
                    >
                      {loadingQuestion ? "Submitting..." : "Submit Question"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-medium text-xl mb-4">Discussion</h3>

            {data[activeVideo].questions.length > 0 ? (
              <div className="space-y-4">
                {data[activeVideo].questions.map((item: any, index: any) => (
                  <QuestionItem
                    key={index}
                    item={item}
                    answer={answer}
                    setAnswer={setAnswer}
                    setQuestionId={setQuestionId}
                    handleAnswerSubmit={handleAnswerSubmit}
                    answerCreationLoading={answerCreationLoading}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-750 rounded-lg border border-gray-600">
                <BsQuestionCircle className="mx-auto mb-4 text-4xl text-gray-500" />
                <p className="text-gray-400">
                  No questions yet. Be the first to ask!
                </p>
              </div>
            )}
          </>
        )}

        {/* Reviews Tab */}
        {activeBar === 3 && (
          <div className="w-full max-w-4xl mx-auto">
            {user.role !== "admin" && (
              <>
                {!isReviewExists && !reviewSubmitted ? (
                  <div className="bg-gradient-to-br from-gray-800 to-gray-750 rounded-xl p-6 mb-8 border border-gray-600 shadow-lg">
                    <h3 className="font-semibold text-xl mb-5 flex items-center">
                      <MdRateReview className="mr-2 text-red-400" size={24} />
                      Share Your Experience
                    </h3>
                    <div className="flex w-full gap-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={
                            user.avatar ? user.avatar.url : "/assets/avatar.png"
                          }
                          alt="User Avatar"
                          width={50}
                          height={50}
                          className="rounded-full object-cover w-[50px] h-[50px] ring-2 ring-gray-600"
                        />
                      </div>
                      <div className="flex-grow space-y-4">
                        <div>
                          <h5 className="text-base font-medium mb-2 flex items-center">
                            Your Rating{" "}
                            <span className="text-red-500 ml-1">*</span>
                          </h5>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div key={i} className="relative group">
                                {rating >= i ? (
                                  <AiFillStar
                                    className="cursor-pointer transform transition hover:scale-110"
                                    color="rgb(246,186,0)"
                                    size={28}
                                    onClick={() => setRating(i)}
                                  />
                                ) : (
                                  <AiOutlineStar
                                    className="cursor-pointer transform transition hover:scale-110"
                                    color="rgb(246,186,0)"
                                    size={28}
                                    onClick={() => setRating(i)}
                                  />
                                )}
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                  {
                                    [
                                      "Poor",
                                      "Fair",
                                      "Good",
                                      "Great",
                                      "Excellent",
                                    ][i - 1]
                                  }
                                </span>
                              </div>
                            ))}
                            <span className="ml-3 text-sm text-gray-400">
                              {rating ? `${rating}/5` : "Select rating"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="What did you think about this course? What did you learn? How will it help you?"
                            className="outline-none bg-gray-800/70 border border-gray-600 p-4 rounded-lg w-full text-base resize-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                            rows={4}
                          ></textarea>
                          <div className="flex justify-between items-center mt-3">
                            <p className="text-xs text-gray-400">
                              {review.length > 0
                                ? `${review.length} characters`
                                : "Your review helps other students make better decisions"}
                            </p>
                            <button
                              className={`px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg transition-all font-medium flex items-center ${
                                reviewCreationLoading
                                  ? "opacity-70 cursor-not-allowed"
                                  : "hover:shadow-lg hover:-translate-y-0.5"
                              }`}
                              onClick={() => {
                                if (!reviewCreationLoading)
                                  handleReviewSubmit();
                              }}
                              disabled={reviewCreationLoading}
                            >
                              {reviewCreationLoading ? (
                                <>
                                  <span className="animate-spin mr-2">⟳</span>{" "}
                                  Submitting...
                                </>
                              ) : (
                                <>
                                  <MdSend className="mr-2" /> Submit Review
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : reviewSubmitted ? (
                  <div className="text-center py-10 bg-gradient-to-br from-gray-800 to-gray-750 rounded-xl border border-green-500/30 mb-8 shadow-lg">
                    <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MdCheckCircle className="text-green-500 text-4xl" />
                    </div>
                    <h4 className="text-green-400 text-xl font-semibold mb-2">
                      Thank you for your feedback!
                    </h4>
                    <p className="text-gray-300 mb-4 max-w-md mx-auto">
                      Your review has been submitted successfully and will help
                      other students.
                    </p>
                    <button
                      className="mt-2 px-5 py-2.5 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-lg transition-all flex items-center mx-auto"
                      onClick={() => window.location.reload()}
                    >
                      <MdRefresh className="mr-2" /> Refresh Page
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gradient-to-br from-gray-800 to-gray-750 rounded-xl border border-gray-600 mb-8 shadow-lg">
                    <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MdOutlineRateReview className="text-blue-400 text-3xl" />
                    </div>
                    <h4 className="text-gray-200 text-xl font-medium mb-1">
                      You've already reviewed this course
                    </h4>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Thank you for sharing your feedback with the community!
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Reviews List */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-2xl flex items-center">
                  <MdOutlineFeedback className="mr-2 text-blue-400" />
                  Student Feedback
                  {course?.reviews && course.reviews.length > 0 && (
                    <span className="ml-2 bg-gray-700 text-sm px-2.5 py-1 rounded-full text-gray-200">
                      {course.reviews.length}
                    </span>
                  )}
                </h3>
                {course?.reviews && course.reviews.length > 0 && (
                  <div className="flex items-center text-gray-400 text-sm">
                    <MdSort className="mr-1" />
                    <select className="bg-transparent border-none outline-none cursor-pointer">
                      <option value="recent">Most Recent</option>
                      <option value="highest">Highest Rated</option>
                      <option value="lowest">Lowest Rated</option>
                    </select>
                  </div>
                )}
              </div>

              {course?.reviews && course.reviews.length > 0 ? (
                <div className="space-y-6">
                  {[...course.reviews]
                    .reverse()
                    .map((item: any, index: number) => (
                      <div
                        className="bg-gradient-to-br from-gray-800 to-gray-750 rounded-xl p-5 border border-gray-600 hover:border-gray-500 transition-colors shadow-md"
                        key={index}
                      >
                        <div className="flex items-start gap-4">
                          <Image
                            src={
                              item?.user?.avatar?.url || "/assets/avatar.png"
                            }
                            alt={`${item?.user?.name}'s Avatar`}
                            width={54}
                            height={54}
                            className="rounded-full object-cover w-[54px] h-[54px] ring-2 ring-gray-600"
                          />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h4 className="text-lg font-medium">
                                {item?.user?.name}
                              </h4>
                              <span className="text-xs text-gray-400 flex items-center">
                                <MdAccessTime className="mr-1" />
                                {format(item.createdAt)}
                              </span>
                            </div>
                            <Ratings rating={item.rating} />
                            <p className="mt-3 text-gray-300 leading-relaxed">
                              {item.comment}
                            </p>

                            {user.role === "admin" && (
                              <div className="flex items-center mt-4">
                                <button
                                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center"
                                  onClick={() => {
                                    setIsReviewReply(true);
                                    setReviewId(item._id);
                                  }}
                                >
                                  <MdReply className="mr-1" /> Reply
                                </button>
                              </div>
                            )}

                            {/* Review replies section */}
                            {item.commentReplies &&
                              item.commentReplies.length > 0 && (
                                <div className="mt-4 pl-3 border-l-2 border-gray-600">
                                  {item.commentReplies.map(
                                    (reply: any, replyIndex: number) => (
                                      <div
                                        key={replyIndex}
                                        className="flex items-start gap-3 mt-4"
                                      >
                                        <Image
                                          src={
                                            reply.user.avatar
                                              ? reply.user.avatar.url
                                              : "/assets/avatar.png"
                                          }
                                          width={40}
                                          height={40}
                                          alt={`${reply.user.name}'s Avatar`}
                                          className="w-[40px] h-[40px] rounded-full object-cover "
                                        />
                                        <div className="flex-1">
                                          <div className="flex items-center mb-1">
                                            <h5 className="font-medium text-sm flex items-center">
                                              {reply.user.name}

                                              <VscVerifiedFilled className="text-blue-400 ml-1 text-sm" />
                                            </h5>
                                          </div>
                                          <p className="text-gray-300">
                                            {reply.comment}
                                          </p>
                                          <small className="text-gray-500 text-xs flex items-center mt-1">
                                            <MdAccessTime className="mr-1" />
                                            {format(reply.createdAt)}
                                          </small>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}

                            {/* Reply input */}
                            {isReviewReply && reviewId === item._id && (
                              <div className="mt-4 bg-gray-700/50 p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <input
                                    type="text"
                                    placeholder="Write a response as instructor..."
                                    className="flex-grow bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                  />
                                  <button
                                    className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm hover:shadow-lg transition-all flex items-center"
                                    onClick={handleReviewReplySubmit}
                                  >
                                    <MdSend className="mr-1" /> Reply
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gradient-to-br from-gray-800 to-gray-750 rounded-xl border border-gray-600 shadow-md">
                  <div className="bg-gray-700/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
                    <MdOutlineRateReview className="text-gray-500 text-5xl" />
                  </div>
                  <h4 className="text-gray-300 text-xl font-medium mb-2">
                    No reviews yet
                  </h4>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Be the first to share your experience with this course and
                    help others make informed decisions.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Question Item Component
const QuestionItem = ({
  item,
  answer,
  setAnswer,
  setQuestionId,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <div className="bg-gray-750 rounded-lg border border-gray-600 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <Image
            src={
              item?.user?.avatar?.url
                ? item.user?.avatar?.url
                : "/assets/avatar.png"
            }
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full object-cover w-[40px] h-[40px] mr-3"
          />
          <div className="flex-grow">
            <div className="flex items-center mb-1">
              <h5 className="font-medium">{item?.user.name}</h5>
              <span className="text-xs text-gray-400 ml-2">
                {format(item.createdAt)}
              </span>
            </div>
            <p className="text-gray-200">{item?.question}</p>

            <div className="flex items-center mt-2">
              <button
                className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                onClick={() => {
                  setReplyActive(!replyActive);
                  setQuestionId(item._id);
                }}
              >
                <BiMessage size={16} className="mr-1" />
                {item.questionReplies.length}{" "}
                {item.questionReplies.length === 1 ? "Reply" : "Replies"}
                <span className="ml-1">
                  {replyActive ? "(Hide)" : "(Show)"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {replyActive && (
        <div className="bg-gray-800 p-4 border-t border-gray-600">
          {item.questionReplies.length > 0 ? (
            <div className="space-y-4 mb-4">
              {item.questionReplies.map((reply: any, index: number) => (
                <div key={index} className="flex items-start">
                  <Image
                    src={
                      reply?.user?.avatar?.url
                        ? reply.user.avatar.url
                        : "/assets/avatar.png"
                    }
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full object-cover w-[32px] h-[32px] mr-3"
                  />
                  <div>
                    <div className="flex items-center mb-1">
                      <h5 className="font-medium text-sm flex items-center">
                        {reply.user.name}
                        {reply.user.role === "admin" && (
                          <VscVerifiedFilled className="text-blue-400 ml-1 text-sm" />
                        )}
                      </h5>
                      <span className="text-xs text-gray-400 ml-2">
                        {format(reply.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{reply.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 mb-3">No replies yet</p>
          )}

          <div className="flex items-center">
            <input
              type="text"
              placeholder="Write a reply..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="flex-grow bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500 transition-colors"
            />
            <button
              onClick={handleAnswerSubmit}
              disabled={!answer.trim() || answerCreationLoading}
              className={`ml-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm ${
                !answer.trim() || answerCreationLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-600"
              }`}
            >
              {answerCreationLoading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
