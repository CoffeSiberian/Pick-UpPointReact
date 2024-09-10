import * as yup from "yup";

export const registerRutSchema = yup.object().shape({
	rut: yup.string().required(),
});

export const registerNameSchema = yup.object().shape({
	name: yup.string().required(),
});

export const registerEmailSchema = yup.object().shape({
	email: yup.string().email().required(),
});

export const registerPasswordSchema = yup.object().shape({
	password: yup.string().min(5).required(),
});

export const registerFormSchema = yup.object().shape({
	rut: yup.string().required(),
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().min(5).required(),
	fk_store: yup.string().required(),
});
