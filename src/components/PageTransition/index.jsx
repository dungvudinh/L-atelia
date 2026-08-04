// components/PageTransition.jsx
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../assets/images/logo.png'

function PageTransition({ children }) {
    const location = useLocation()
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [displayLocation, setDisplayLocation] = useState(location)

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
            // Bắt đầu transition: show overlay
            setIsTransitioning(true)

            const timer = setTimeout(() => {
                // Sau khi overlay hiện xong → đổi page content
                setDisplayLocation(location)

                // Sau thêm 600ms → ẩn overlay
                setTimeout(() => {
                    setIsTransitioning(false)
                }, 600)
            }, 600)

            return () => clearTimeout(timer)
        }
    }, [location])

    return (
        <>
            {/* Page content — render theo displayLocation */}
            <div key={displayLocation.pathname}>
                {children}
            </div>

            {/* Overlay transition */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        key="page-transition"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: '#fff',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <motion.img
                            src={logo}
                            alt="Logo"
                            animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [0.95, 1, 0.95],
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            style={{ width: '80px' }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default PageTransition