import { FC, useEffect, useState, useRef } from "react";
import { API_URL, FK_STORE } from "../../../../helpers/configs";
import useFetch from "../../../../hooks/useFetch";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// icons
import AbcIcon from "@mui/icons-material/Abc";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// types
import { CategoriesListResponse } from "../../../../types/responses/CategorieList";
import { Categories } from "../../../../types/model";

const ShopForms: FC<ProductFormsProps> = ({
    productForm,
    handleChangeText,
}) => {
    const loaded = useRef(false);

    const { loading, response, setSucces } = useFetch(
        `${API_URL}/categories?store=${FK_STORE}`,
        "GET"
    );
    const [Categories, setCategories] = useState<[Categories] | undefined>();

    const getData = async () => {
        const data: CategoriesListResponse | null = await response({
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!data) return;
        if (data.status === 200) {
            setCategories(data.data);
        }
    };

    useEffect(() => {
        if (!loaded.current) {
            loaded.current = true;
            getData();
            setSucces(false);
        } // eslint-disable-next-line
    }, []);

    return (
        <div className="flex flex-col gap-4 mt-2">
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
                onChange={(e) => handleChangeText(e.target.value, "name")}
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
                autoComplete="off"
                id="description-product-add"
                color="info"
                label="Descripcion"
                type="text"
                helperText={
                    productForm.error.description && "Ingresa una descripcion"
                }
                error={productForm.error.description}
                value={productForm.payload.description}
                onChange={(e) =>
                    handleChangeText(e.target.value, "description")
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
                helperText={
                    productForm.error.stock && "Ingresa un stock valido"
                }
                error={productForm.error.stock}
                value={productForm.payload.stock}
                onChange={(e) => handleChangeText(e.target.value, "stock")}
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
                helperText={
                    productForm.error.price && "Ingresa un precio valido"
                }
                error={productForm.error.price}
                value={productForm.payload.price}
                onChange={(e) => handleChangeText(e.target.value, "price")}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AttachMoneyIcon />
                        </InputAdornment>
                    ),
                }}
            />
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
                    handleChangeText(e.target.value, "fk_category")
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
        </div>
    );
};

export default ShopForms;
