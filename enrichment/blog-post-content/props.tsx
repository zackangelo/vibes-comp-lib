interface Tag {
	label: string;
	link: {
		href: string;
		target?: string;
	};
}

interface Image {
	src: string;
	alt: string;
}

interface Props {
	title: string;
	author?: string;
	date: string;
	tags?: Tag[];
	content: string;
	image?: Image;
	className?: string;
	breadcrumbs?: Breadcrumb[];
}
