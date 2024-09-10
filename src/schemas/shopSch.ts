import * as yup from "yup";

export const productSchema = yup.object().shape({
	name: yup.string().required(),
	description: yup.string().required(),
	stock: yup.number().required(),
	price: yup.number().required(),
	fk_category: yup.string().required(),
});

export const productSchemaName = yup.object().shape({
	name: yup.string().required(),
});

export const productSchemaDescription = yup.object().shape({
	description: yup.string().required(),
});

export const productSchemaStock = yup.object().shape({
	stock: yup.number().required(),
});

export const productSchemaPrice = yup.object().shape({
	price: yup.number().required(),
});

export const productSchemaCategory = yup.object().shape({
	fk_category: yup.string().required(),
});
