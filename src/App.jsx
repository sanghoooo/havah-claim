import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Mobile from "./components/Mobile";
import { IS_MOBILE } from "./utils/const";
import { Toaster } from "react-hot-toast";
import Congratulation from "./components/Congratulation";

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
			<Congratulation />
		</div>
	);
}

export default App;
