import { Navbar, Welcome, Footer, Services, Transactions } from "./components";
import videoBG from "../images/Blue Dark Gradient Animated bg.mp4";
import spaceBG from "../images/Space Animation 1.mp4";
import { TransactionProvider } from "./context/TransactionContext";

const App = () => (
  <div className="min-h-screen relative">
    {/* Background Video */}
    <video
      src={spaceBG}
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover -z-10"
    />

    {/* Main Content */}

    <div className="relative z-10">
      <Navbar />
      <TransactionProvider>
        <Welcome />
      </TransactionProvider>

    </div>
    <Services />
    <Transactions />
    <Footer />
  </div>
);

/*
const App = () => (
  <div className="min-h-screen">
    <div className=".gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    <Services />
    <Transactions />
    <Footer />
  </div>
);
*/

export default App;