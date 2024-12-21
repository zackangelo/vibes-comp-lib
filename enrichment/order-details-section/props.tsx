interface Summary {
	lineItems: Array<{
		label: string;
		value: string;
		subtext?: string;
	}>;
	totalLabel?: string;
	total: string;
}

interface Address {
	name?: string;
	street1: string;
	street2?: string;
	city: string;
	state: string;
	zipcode?: string;
	country?: string;
}

interface Method {
	id: string;
	name: string;
	status: string;
}

interface ShipmentLineItem {
	id: string;
	title: string;
	subtitle?: string;
	price: string;
	href: string;
	image?: { src: string; alt: string };
	quantity: number;
	metadata?: Array<{ label: string; value: string }>;
}

interface Shipment {
	id: string;
	title: string;
	address: Address;
	addressLabel?: string;
	method: Method;
	methodLabel?: string;
	lineItems: ShipmentLineItem[];
}

interface Order {
	id: string;
	title: string;
	status: string;
	statusColor?: "success" | "warning" | "danger" | "info";
	date: string;
	shipments: Shipment[];
	summary: Summary;
}

interface Props {
	order: Order;
	prevHref?: string;
}
