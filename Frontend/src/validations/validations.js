import * as yup from "yup";

export const reviewSchema = yup.object({
  rating: yup
    .number()
    .min(1, "Rating is required")
    .max(5)
    .required("Rating is required"),
  comment: yup.string().optional(),
});
