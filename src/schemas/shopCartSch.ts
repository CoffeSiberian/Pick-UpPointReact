import * as yup from "yup";

export const shopCartSch = yup.object().shape({
	cart: yup.array().of(
		yup.object().shape({
			id: yup.string().required(),
			name: yup.string().required(),
			price: yup.number().required(),
			quantity: yup.number().required(),
		})
	),
});
