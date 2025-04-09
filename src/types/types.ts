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
  