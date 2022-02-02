import { extendTheme } from "@chakra-ui/react";
import { DividerStyles as Divider } from "./componenets/dividerStyles";
import { ButtonStyles as Button } from "./componenets/buttonStyles"
const customTheme = extendTheme({
	colors: {
		primary: {
			red: "#e53238",
			blue: "#0064d3",
			yellow: "#f5af02",
			green: "#86b817"
		}
	},
	components: {
		Divider,
		Button
	}
});

export default customTheme;
