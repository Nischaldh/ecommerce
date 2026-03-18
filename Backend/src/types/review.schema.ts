export interface ICreateReview {
  rating: number;
  comment?: string;
}

export interface IUpdateReview {
  rating?: number;
  comment?: string;
}

export interface IReviewResponse {
  id: string;
  productId: string;
  rating: number;
  comment: string | null;
  user: {
    id: string;
    name: string;
    profilePic: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
}