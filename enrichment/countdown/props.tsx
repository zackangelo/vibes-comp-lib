interface Default {
	type: "default";
	images?: string[];
}

interface Full {
	type: "full";
	backgroundImage: string;
}

interface Split {
	type: "split";
	image: string;
}

interface Banner {
	type: "banner";
}

interface Props {
	title: string;
	targetDate: Date;
	variant: Default | Full | Split | Banner;
}
