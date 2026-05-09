import { useEffect, useRef, useState} from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import './App.css'
import './components/Landing.tsx'
import './components/Navbar.tsx'
import Landing from './components/Landing.tsx';
import Portfolio from './components/Portfolio.tsx'
import Navbar from './components/Navbar.tsx';
import Admin from './components/Admin.tsx';
import AdminLogin from './components/AdminLogin.tsx';
import Foreclosure from './components/Foreclosure.tsx';
import Footer from './components/Footer.tsx';
import PrivacyPolicy from './components/PrivacyPolicy.tsx';
import TermsOfUse from './components/TermsOfUse.tsx';
import RealEstateDisclaimer from './components/RealEstateDisclaimer.tsx';
import AccessibilityStatement from './components/AccessibilityStatement.tsx';
import ContactPage from './components/Contact.tsx';

function App() {
  const [scrollTarget, setScrollTarget] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const lastScrollY = useRef(0);
  const [passedFirstScreen, setPassedFirstScreen] = useState(false);
  const [orientation, setOrientation] = useState<string | null>(null);

  useEffect(() => {
    function determineOrientation() {
      window.innerWidth > window.innerHeight ? setOrientation('landscape') : setOrientation('portrait')
    }

    const isBrowserFullscreen = () => {
        return (
            window.outerWidth === window.screen.availWidth &&
            window.outerHeight === window.screen.availHeight
        );
    };

    const setHeight = () => {
        const height = window.visualViewport?.height ?? window.innerHeight;

        console.log(height);

        document.documentElement.style.setProperty("--app-height", `${height}px`);
    };
  
    const setWidth = () => {
        const width = window.visualViewport?.width ?? window.innerWidth;

        console.log(width);

        document.documentElement.style.setProperty("--app-width", `${width}px`);
    };

    const setPageHeight = () => {
        const pageHeight = document.documentElement.scrollHeight;

        document.documentElement.style.setProperty(
            "--page-height",
            `${pageHeight}px`
        );

        console.log(pageHeight);
    };

    const resetPageHeight = () => {
      document.documentElement.style.setProperty(
          "--page-height",
          `${0}px`
      );
      
      console.log(document.documentElement.style.getPropertyValue(
          "--page-height"
      ));
    };
  
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setHeight();
        setWidth();
        resetPageHeight();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPageHeight();
            determineOrientation();
          })
        });
      });
    });

    function handleViewportChange() {
        // Let mobile Chrome finish resizing after orientation/UI changes
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setHeight();
            setWidth();
            resetPageHeight();
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setPageHeight();
                determineOrientation();
              })
            });
          });
        });
      }
  
    window.screen.orientation.addEventListener("change", (event) => {
        handleViewportChange();
    });

    document.addEventListener("fullscreenchange", () => {
      handleViewportChange();
      console.log("fullscreen")
    });

    let previousFullscreen = isBrowserFullscreen();

    window.addEventListener("resize", () => {
      const currentFullscreen = isBrowserFullscreen();
  
      if (currentFullscreen !== previousFullscreen) {
          previousFullscreen = currentFullscreen;
          console.log("browser fullscreen changed");
          handleViewportChange();
      }
    });

    const resizeObserver = new ResizeObserver(() => {
        resetPageHeight();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPageHeight();
            determineOrientation();
          })
        });
    });

    resizeObserver.observe(document.body);

    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    let maxSeenHeight = window.visualViewport?.height || window.innerHeight;

    const setMobileAppHeight = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;

      // Only grow height, never shrink it
      if (currentHeight > maxSeenHeight) {
        maxSeenHeight = currentHeight;

        document.documentElement.style.setProperty(
          "--app-height",
          `${maxSeenHeight}px`
        );
      }
    };

    if (isMobile) {
      setMobileAppHeight();

      setTimeout(setMobileAppHeight, 300);
      setTimeout(setMobileAppHeight, 800);
      setTimeout(setMobileAppHeight, 1500);

      window.visualViewport?.addEventListener("resize", setMobileAppHeight);
      window.addEventListener("orientationchange", () => {
        maxSeenHeight = 0;
        setTimeout(setMobileAppHeight, 500);
      });

      return () => {
        window.visualViewport?.removeEventListener("resize", setMobileAppHeight);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;

      if (scrollY > screenHeight) {
        setPassedFirstScreen(true);
      } else {
        setPassedFirstScreen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ignore tiny movements (prevents jitter)
      if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;

      if (currentScrollY < lastScrollY.current) {
        // scrolling up
        setIsScrollingUp(true);
      } else {
        // scrolling down
        setIsScrollingUp(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return (
    <>
      <BrowserRouter>
        <Navbar passedFirstScreen={passedFirstScreen} isScrollingUp={isScrollingUp} setScrollTarget={setScrollTarget} setSearchQuery={setSearchQuery}/>
        <Routes>
                <>
                    <Route path="/" element={<Navigate to="/Home" />} />
                    <Route path="/Home" element={<Landing scrollTarget={scrollTarget}/>} />
                    <Route path="/Foreclosure" element={<Foreclosure scrollTarget={scrollTarget}/>} />
                    <Route path="/Portfolio" element={<Portfolio />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-use" element={<TermsOfUse />} />
                    <Route path="/real-estate-disclaimer" element={<RealEstateDisclaimer />} />
                    <Route path="/accessibility" element={<AccessibilityStatement />} />
                    <Route path="/contact" element={<ContactPage />} />
                </>
        </Routes>
        <Footer setScrollTarget={setScrollTarget} />
      </BrowserRouter>
    </>
  )
}

export default App
