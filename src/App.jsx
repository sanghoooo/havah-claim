import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Mobile from "./components/Mobile";
import { IS_MOBILE } from "./utils/const";
import { Toaster } from "react-hot-toast";
import ClaimError from "./components/ClaimError";
import Congratulation from "./components/Congratulation";
import Maintenance from "./components/Maintenance";

function App() {
	if (IS_MOBILE) {
		return <Mobile />;
	}

	return (
		<div className="App">
			<Toaster
				reverseOrder={false}
				containerStyle={{
					top: 60 + 16,
				}}
				toastOptions={{
					style: {
						maxWidth: 400,
					},
					className: "toast",
					success: {
						iconTheme: {
							primary: "#16D992",
						},
					},
					error: {
						iconTheme: {
							primary: "#DE1836",
						},
					},
				}}
			/>
			<Header />
			<Content />
			<Footer />
			<ClaimError />
			<Congratulation />
			<Maintenance />
		</div>
	);
}

export default App;
