import {localStorage} from "../utils";
import {Button} from "../components/ui/Button";

export default function Page() {

	const setItem = () => localStorage.setItem("id", "123");
	// const getItem = localStorage.getItem("id");
	
	return (
		<div>
			<h1>{"title"}</h1>
			<Button onClick={setItem}>
				save
			</Button>
		</div>
	);
}
