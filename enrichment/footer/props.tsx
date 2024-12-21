interface Image {
	src: string;
	alt: string;
}

interface Link {
	href: string;
	label: string;
}

export interface Section {
	title?: string;
	links: Link[];
}

interface SocialMediaLink {
	href: string;
	icon: ReactNode;
}

interface ContactInformation {
	address?: string;
	phone?: string;
}

interface Props {
	logo?: Streamable<string | Image | null>;
	sections: Streamable<Section[]>;
	copyright?: Streamable<string | null>;
	contactInformation?: Streamable<ContactInformation | null>;
	paymentIcons?: Streamable<ReactNode[] | null>;
	socialMediaLinks?: Streamable<SocialMediaLink[] | null>;
	contactTitle?: string;
	className?: string;
	logoHref?: string;
	logoLabel?: string;
	logoWidth?: number;
}
