import { FC, useEffect, useState, useCallback, useRef } from "react";
import { API_URL, FK_STORE } from "../../../../helpers/configs";
import useFetch from "../../../../hooks/useFetch";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

// icons
import AbcIcon from "@mui/icons-material/Abc";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// types
import { CategoriesListResponse } from "../../../../types/responses/CategorieList";
import { Categories } from "../../../../types/model";

const ShopForms: FC<ProductFormsProps> = ({ productForm, setProductForm }) => {
	const loaded = useRef(false);

	const { loading, response, setSucces } = useFetch(
		`${API_URL}/categories?store=${FK_STORE}`,
		"GET"
	);
	const [Categories, setCategories] = useState<Categories[] | undefined>();

	const getData = useCallback(async () => {
		const data: CategoriesListResponse | null = await response({
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!data) return;
		if (data.status === 200) {
			setCategories(data.data.categories);
		}
	}, [response]);

	useEffect(() => {
		if (!loaded.current) {
			loaded.current = true;
			getData();
			setSucces(false);
		}
	}, [getData, setSucces]);

	return (
		<div className="mt-2 flex flex-col gap-4">
			<TextField
				fullWidth
				autoComplete="off"
				id="name-product-add"
				color="info"
				label="Nombre"
				type="text"
				helperText={productForm.error.name && "Nombre invalido"}
				error={productForm.error.name}
				value={productForm.payload.name}
				onChange={(e) =>
					setProductForm({
						...productForm,
						payload: {
							...productForm.payload,
							name: e.target.value,
						},
					})
				}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AbcIcon />
						</InputAdornment>
					),
				}}
			/>
			<TextField
				fullWidth
				multiline
				maxRows={8}
				autoComplete="off"
				id="description-product-add"
				color="info"
				label="Descripcion"
				type="text"
				helperText={productForm.error.description && "Ingresa una descripcion"}
				error={productForm.error.description}
				value={productForm.payload.description}
				onChange={(e) =>
					setProductForm({
						...productForm,
						payload: {
							...productForm.payload,
							description: e.target.value,
						},
					})
				}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<DescriptionIcon />
						</InputAdornment>
					),
				}}
			/>
			<TextField
				fullWidth
				id="stock-product-add"
				autoComplete="off"
				color="info"
				label="Stock"
				type="number"
				helperText={productForm.error.stock && "Ingresa un stock valido"}
				error={productForm.error.stock}
				value={productForm.payload.stock}
				onChange={(e) => {
					const value = parseInt(e.target.value);
					if (isNaN(value)) return;

					setProductForm({
						...productForm,
						payload: {
							...productForm.payload,
							stock: value,
						},
					});
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<InventoryIcon />
						</InputAdornment>
					),
				}}
			/>
			<TextField
				fullWidth
				id="price-product-add"
				autoComplete="off"
				color="info"
				label="Precio"
				type="number"
				helperText={productForm.error.price && "Ingresa un precio valido"}
				error={productForm.error.price}
				value={productForm.payload.price}
				onChange={(e) => {
					const value = parseInt(e.target.value);
					if (isNaN(value)) return;

					setProductForm({
						...productForm,
						payload: {
							...productForm.payload,
							price: value,
						},
					});
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AttachMoneyIcon />
						</InputAdornment>
					),
				}}
			/>
			<FormControl fullWidth>
				<InputLabel color="info" id="category-product-add-label">
					Categoria
				</InputLabel>
				<Select
					id="category-product-add"
					fullWidth
					autoComplete="off"
					color="info"
					label="Categoria"
					error={productForm.error.fk_category}
					value={productForm.payload.fk_category}
					disabled={loading || !Categories}
					onChange={(e) =>
						setProductForm({
							...productForm,
							payload: {
								...productForm.payload,
								fk_category: e.target.value,
							},
						})
					}
				>
					{Categories ? (
						Categories.map((category) => (
							<MenuItem
								key={`Categorie-${category.id}`}
								value={category.id}
								className="capitalize"
							>
								{category.name}
							</MenuItem>
						))
					) : (
						<MenuItem value={0}>Sin Categorias</MenuItem>
					)}
				</Select>
			</FormControl>
		</div>
	);
};

export default ShopForms;
