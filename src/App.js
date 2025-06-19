import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import Recent from "./pages/RecentPage";
import About from "./pages/AboutPage";
import Favorite from "./pages/FavoritePage";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/recent" element={<Recent />} />
					<Route path="/about" element={<About />} />
					<Route path="/favorites" element={<Favorite />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
