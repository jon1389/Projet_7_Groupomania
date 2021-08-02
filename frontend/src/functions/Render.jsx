import { useState } from "react";

export default function Render() {
	const [rerender, setRerender] = useState();
	return setRerender(!rerender);
}
