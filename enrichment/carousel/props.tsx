interface CarouselProps extends React.ComponentPropsWithoutRef<"div"> {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	setApi?: (api: CarouselApi) => void;
	carouselScrollbarLabel?: string;
}
