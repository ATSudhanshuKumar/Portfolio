import { About, Contact, Experience, Footer, Hero, Navbar, Projects, Skills } from './components'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-red-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
