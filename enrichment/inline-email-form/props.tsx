export interface Props {
	className?: string;
	placeholder?: string;
	submitLabel?: string;
	action: Action<
		{ lastResult: SubmissionResult | null; successMessage?: string },
		FormData
	>;
}
