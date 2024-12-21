interface StickySidebarLayoutProps {
	className?: string;
	sidebar: React.ReactNode;
	children: React.ReactNode;
	containerSize?: "md" | "lg" | "xl" | "2xl";
	sidebarSize?: "1/4" | "1/3" | "1/2" | "small" | "medium" | "large";
	sidebarPosition?: "before" | "after";
}
