export interface UserDetails {
    _id: string;
    name: string;
    email: string;
    avatar?: {
      public_id: string;
      url: string;
    };
    role: "user" | "admin";  
    isVerified: boolean;
    courses: Array<{ courseId: string }>;
    accessToken?: string; 
    refreshToken?: string; 
  }
  
  export interface CourseData {
    title: string;
    description: string;
    videoUrl: string;
    videoThumbnail: string;
    videoSection: string;
    videoLength: number;
    videoPlayer: string;
    links: { title: string; url: string }[];
    suggestion: string;
    questions: []; 
  }
  
  export interface Course {
    _id: string;
    name: string;
    description: string;
    price: number;
    thumbnail: {
      public_id: string;
      url: string;
    };
    tags: string;
    level: string;
    demoUrl: string;
    benefits: { title: string }[];
    prerequisites: { title: string }[];
    reviews: [];
    courseData: CourseData[];
    ratings?: number;
    purchased?: number;
  }
  