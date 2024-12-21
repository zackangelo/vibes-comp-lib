interface Props<A extends Address> {
	title?: string;
	addresses: A[];
	minimumAddressCount?: number;
	defaultAddress?: DefaultAddressConfiguration;
	addressAction: Action<State<A>, FormData>;
	editLabel?: string;
	deleteLabel?: string;
	updateLabel?: string;
	createLabel?: string;
	showAddFormLabel?: string;
	setDefaultLabel?: string;
	cancelLabel?: string;
	firstNameLabel?: string;
	lastNameLabel?: string;
	companyLabel?: string;
	phoneLabel?: string;
	addressLine1Label?: string;
	addressLine2Label?: string;
	addressLevel1Label?: string;
	addressLevel2Label?: string;
	countryLabel?: string;
	postalCodeLabel?: string;
}
