import { MotionConfig } from 'motion/react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Stats from './components/Stats'
import Badges from './components/Badges'
import Portfolio from './components/Portfolio'
import WhyUs from './components/WhyUs'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Badges />
        <Services />
        <Portfolio />
        <WhyUs />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
