import * as yup from "yup";

export const categoriesNameSchema = yup.object().shape({
    name: yup.string().max(255).required(),
});
