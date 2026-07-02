import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import gridBg from '../assets/grid-bg.svg'

export default function Layout() {
  const { pathname } = useLocation()
  const hideGrid = pathname.startsWith('/writing')

  return (
    <>
      {/* Fixed navbar */}
      <div className="fixed top-6 left-0 right-0 z-50 px-4">
        <Navbar />
      </div>

      {/* Page body — padded so content starts below the navbar */}
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden px-4 pt-[88px] pb-6">
        {!hideGrid && (
          <img
            src={gridBg}
            alt=""
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover object-center select-none [filter:var(--grid-filter)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_30%,transparent_100%)]"
          />
        )}
        <div className="relative z-10 flex flex-1 flex-col">
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  )
}
