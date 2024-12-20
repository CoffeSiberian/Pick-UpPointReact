import { useState, FC, useEffect, useContext } from "react";
import { API_URL } from "../../../../helpers/configs";

// Context and hooks
import { UserContex } from "../../../../hooks/UserContex";
import useFetch from "../../../../hooks/useFetch";

// MUI
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// components
import ModalLoading from "../../../../components/ModalLoading";
import ModalError from "../../../../components/ModalError";
import SnakeBarInfo from "../../../../components/SnakeBarInfo";
import SalesForms from "./ShopForms";
import ShopImages from "./ShopImages";

// icons
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

// schemas
import {
	productSchema,
	productSchemaName,
	productSchemaDescription,
	productSchemaStock,
	productSchemaPrice,
	productSchemaCategory,
} from "../../../../schemas/shopSch";

// types
import { StandarResponse } from "../../../../types/responses/StandarResponse";
import { ResponseError } from "../../../../types/responses/ResponseError";

const ShopModalFormUpdate: FC<ProductModalFormUpdateProps> = ({
	open,
	openProductModalForm,
	reloadPage,
	productToEdit,
	productId,
}) => {
	const { UserInfo } = useContext(UserContex);
	const { loading, response, succes, setSucces } = useFetch(
		`${API_URL}/product`,
		"PUT"
	);

	const [Error, setError] = useState<ResponseError>({
		status: 200,
		message: "",
		error: false,
	});
	const [Form, setForm] = useState<ProductData>({
		payload: {
			id: "",
			name: "",
			description: "",
			stock: 0,
			price: 0,
			fk_category: "",
		},
		error: {
			name: false,
			description: false,
			stock: false,
			price: false,
			fk_category: false,
		},
	});

	const validateForm = async (): Promise<boolean> => {
		const NameValid = await productSchemaName.isValid({
			name: Form.payload.name,
		});
		const DescriptionValid = await productSchemaDescription.isValid({
			description: Form.payload.description,
		});
		const StockValid = await productSchemaStock.isValid({
			stock: Form.payload.stock,
		});
		const PriceValid = await productSchemaPrice.isValid({
			price: Form.payload.price,
		});
		const CategoryValid = await productSchemaCategory.isValid({
			fk_category: Form.payload.fk_category,
		});

		setForm({
			...Form,
			error: {
				name: !NameValid,
				description: !DescriptionValid,
				stock: !StockValid,
				price: !PriceValid,
				fk_category: !CategoryValid,
			},
		});

		return await productSchema.isValid(Form.payload);
	};

	const sendData = async () => {
		const valid = await validateForm();
		if (!valid) return;
		if (UserInfo === null) return;

		const data: StandarResponse | null = await response(
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${UserInfo.token}`,
				},
			},
			JSON.stringify(Form.payload)
		);

		if (data === null) {
			setError({
				status: 500,
				message: "Error, Intenta mas tarde",
				error: true,
			});
			return;
		}

		if (data.status === 200) {
			openProductModalForm(false);
			reloadPage();
		} else if (data.status === 400 || data.status === 401) {
			setError({
				status: data.status,
				message: "Error, Credenciales invalidas",
				error: true,
			});
		} else {
			setError({
				status: data.status,
				message: "Error, Intenta mas tarde",
				error: true,
			});
		}
	};

	useEffect(() => {
		if (!productToEdit) return;
		if (!open) return;

		setForm({
			payload: {
				id: productToEdit.id,
				name: productToEdit.name,
				description: productToEdit.description,
				stock: productToEdit.stock,
				price: productToEdit.price,
				fk_category: productToEdit.fk_category,
			},
			error: {
				name: false,
				description: false,
				stock: false,
				price: false,
				fk_category: false,
			},
		});
	}, [productToEdit, open]);

	return (
		<>
			<ModalLoading open={loading} />
			<SnakeBarInfo
				open={Error.error}
				message={Error.message}
				severity="error"
				handleClose={() => setError({ ...Error, error: false })}
			/>
			<SnakeBarInfo
				open={succes}
				message="Producto actualizado con exito"
				severity="success"
				handleClose={() => setSucces(false)}
			/>
			<ModalError
				open={Error.error}
				message={Error.message}
				setError={() => setError({ ...Error, error: false })}
			/>
			<Dialog
				open={open}
				keepMounted={false}
				onClose={() => openProductModalForm(false)}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
				maxWidth="md"
				scroll="paper"
				fullWidth
			>
				<DialogTitle className="flex justify-between">
					Actualizar Producto
					<IconButton
						aria-label="Cerrar ventana"
						onClick={() => openProductModalForm(false)}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<div className="flex flex-col gap-5">
						<SalesForms productForm={Form} setProductForm={setForm} />
						<ShopImages productId={productId} />
					</div>
				</DialogContent>
				<DialogActions>
					<Button
						color="success"
						size="small"
						variant="contained"
						endIcon={<SaveAsIcon />}
						onClick={sendData}
					>
						Actualizar
					</Button>
					<Button
						color="info"
						size="small"
						variant="contained"
						endIcon={<CancelIcon />}
						onClick={() => {
							openProductModalForm(false);
						}}
					>
						Cancelar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ShopModalFormUpdate;
