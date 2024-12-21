export interface Props {
	action: Action<
		{ lastResult: SubmissionResult | null; successMessage?: string },
		FormData
	>;
	image?: { src: string; alt: string };
	title: string;
	description?: string;
	placeholder?: string;
}
