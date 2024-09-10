interface HeaderOptions {
	store: ItemStore[];
}

interface ItemStore {
	name: string;
	path: string;
	icon: JSX.Element;
}
