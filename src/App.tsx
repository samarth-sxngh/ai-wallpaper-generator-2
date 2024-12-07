import TypingTaglines from './components/TypingTaglines';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a192f] text-white">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-4">
          From Text to Texture:<br />
          Craft Your Perfect<br />
          Wallpaper
        </h1>
        <p className="text-xl text-pink-500 mb-8">Transform Words into Art</p>
        
        <TypingTaglines />
        
        <div className="mt-8">
          <input
            type="text"
            placeholder="Describe your perfect wallpaper..."
            className="w-full max-w-2xl px-4 py-3 rounded-lg bg-[#112240] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button className="mt-4 px-8 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-medium transition-colors">
            Generate
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
