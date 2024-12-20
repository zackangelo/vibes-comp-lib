interface Props {
	invert?: boolean;
	theme?: "light" | "dark" | "system";
	position?: Position;
	hotkey?: string[];
	richColors?: boolean;
	expand?: boolean;
	duration?: number;
	gap?: number;
	visibleToasts?: number;
	closeButton?: boolean;
	toastOptions?: ToastOptions;
	className?: string;
	style?: React.CSSProperties;
	offset?: string | number;
	dir?: "rtl" | "ltr" | "auto";
	/**
	 * @deprecated Please use the `icons` prop instead:
	 * ```jsx
	 * <Toaster
	 *   icons={{ loading: <LoadingIcon /> }}
	 * />
	 * ```
	 */
	loadingIcon?: React.ReactNode;
	icons?: ToastIcons;
	containerAriaLabel?: string;
	pauseWhenPageIsHidden?: boolean;
	cn?: CnFunction;
}
