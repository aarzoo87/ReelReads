import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import Recent from "./pages/RecentPage";
import About from "./pages/AboutPage";
import Favorite from "./pages/FavoritePage";
import Collection from "./pages/CollectionPage";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/recent" element={<Recent />} />
					<Route path="/about" element={<About />} />
					<Route path="/favorites" element={<Favorite />} />
					<Route path="/collections" element={<Collection />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
