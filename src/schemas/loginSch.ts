import * as yup from "yup";

export const loginEmailSchema = yup.object().shape({
	email: yup.string().email().required(),
});

export const loginPasswordSchema = yup.object().shape({
	password: yup.string().min(5).required(),
});

export const loginFormSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(5).required(),
	fk_store: yup.string().required(),
});
