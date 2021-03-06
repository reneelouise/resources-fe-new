export interface IResource {
  id: number;
  resource_id: number;
  resource_name: string;
  user_name: string;
  user_id: string;
  is_faculty: boolean;
  description: string;
  url: string;
  content_type: string;
  mark_stage: string;
  created_at: string;
  recommendation_type: string;
  recommendation_reason: string;
  count_of_likes: number;
  count_of_dislikes: number;
  number_of_comments: number;
  tags: string | null;
}

export interface IUser {
  id: number;
  name: string;
  is_faculty: boolean;
}

export interface Comment {
  id: number;
  resource_id: number;
  author_id: number;
  is_like: boolean;
  text: string;
  created_at: string;
  name: string;
  is_faculty: boolean;
}

export interface IUserRecentRecommendations {
  resource_id: number;
  resource_name: string;
  is_like: boolean;
  text: string;
  created_at: string;
}

export interface IPopularResource {
  id: number;
  user_name: string;
  resource_name: string;
  popularity: number;
}

export interface ITopContributor {
  user_id: number;
  user_name: string;
  resources_contributed: string;
  avg_popularity: string;
}

export interface BadRequestError {
  response: {
    status: 400;
    message: string;
  };
}
