import { debounce } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import agent from "../api/agent";

type UseMapParams = {
	value: unknown;
	onChange: (value: unknown) => void;
};

export function useMap({ value, onChange }: UseMapParams) {
	const [loading, setLoading] = useState(false);
	const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		if (value && typeof value === "object" && "lugar" in value) {
			setInputValue(((value as { lugar?: string }).lugar ?? "").toString());
		} else {
			setInputValue((value ?? "").toString());
		}
	}, [value]);

	const fetchSuggestions = useMemo(
		() =>
			debounce(async (query: string) => {
				if (!query || query.length < 3) {
					setSuggestions([]);
					return;
				}

				setLoading(true);

				try {
					const res = await agent.get(`/maps/search?query=${query}`);
					setSuggestions(res.data);
				} catch (e) {
					console.error("Error fetching suggestions:", e);
				} finally {
					setLoading(false);
				}
			}, 500),
		[]
	);

	useEffect(() => {
		return () => {
			fetchSuggestions.clear();
		};
	}, [fetchSuggestions]);

	const handleChange = (nextValue: string) => {
		onChange(nextValue);
		fetchSuggestions(nextValue);
	};

	const handleSelect = (location: LocationIQSuggestion) => {
		const ciudad = location.address?.city || location.address?.village || location.address?.town;
		const lugar = location.display_name;
		const latitud = Number(location.lat);
		const longitud = Number(location.lon);

		setInputValue(lugar);
		onChange({ ciudad, lugar, latitud, longitud });
		setSuggestions([]);
	};

	return {
		loading,
		suggestions,
		inputValue,
		handleChange,
		handleSelect,
	};
}
