import Header from "../components/Header";
import { useEffect } from "react";
import Lenis from 'lenis';
function MainLayout({children})
{
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,        // thời gian easing
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => lenis.destroy()
    }, [])
    return (
        <>
            <Header />
            {children}
        </>
    )
}
export default MainLayout;