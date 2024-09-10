import * as yup from "yup";

export const userSchema = yup.object().shape({
	rut: yup.string().min(1).max(10).required(),
	name: yup.string().min(1).max(256).required(),
	email: yup.string().email().max(256).required(),
	password: yup.string().min(5).max(60).required(),
});

export const userRutSchema = yup.object().shape({
	rut: yup.string().min(1).max(10).required(),
});

export const userNameSchema = yup.object().shape({
	name: yup.string().min(1).max(256).required(),
});

export const userEmailSchema = yup.object().shape({
	email: yup.string().email().max(256).required(),
});

export const userPasswordSchema = yup.object().shape({
	password: yup.string().min(5).max(60).required(),
});
