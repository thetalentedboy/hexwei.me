import { useEffect, useRef } from "react";

export function useUpdateEffect(effect: Function, dependencies: any) {
	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted.current) {
			effect();
		} else {
			isMounted.current = true;
		}
	}, dependencies);
}
