import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './styles/Landing.css';
import './styles/Landing-Mobile.css';


function Landing({
  scrollTarget
}: {
  scrollTarget: number;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(0)

  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const processSectionRef = useRef<HTMLDivElement | null>(null);
  const caseStudiesRef = useRef<HTMLDivElement | null>(null);
  const foreclosureRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  const imageRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const firstVideoRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cloudOneRef = useRef<HTMLDivElement | null>(null);
  const cloudTwoRef = useRef<HTMLDivElement | null>(null);
  const apartmentRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

    const whySubtext = useRef<HTMLHeadingElement | null>(null);

  const whyMainHeading = useRef<HTMLHeadingElement | null>(null);
  const whyCopy = useRef<HTMLDivElement | null>(null);
  const aboutHeading = useRef<HTMLDivElement | null>(null);
  const aboutCopy = useRef<HTMLDivElement | null>(null);
  const processMainHeading = useRef<HTMLSpanElement | null>(null);
  const processAnalysis = useRef<HTMLSpanElement | null>(null);
  const cashOffer = useRef<HTMLSpanElement | null>(null);
  const marketAnalysis = useRef<HTMLSpanElement | null>(null);
  const caseStudiesHeading = useRef<HTMLSpanElement | null>(null);
  const clientName = useRef<HTMLDivElement | null>(null);
  const propertyAddress = useRef<HTMLDivElement | null>(null);
  const caseStudyTestimony = useRef<HTMLDivElement | null>(null);
  const facingForeclosure = useRef<HTMLDivElement | null>(null);
  const foreclosureImage = useRef<HTMLDivElement | null>(null);



  const houseAsset = useRef<HTMLDivElement | null>(null);
  const caseStudyHouseAsset = useRef<HTMLDivElement | null>(null);

  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const firstChevron = useRef<HTMLDivElement | null>(null);
  const secondChevron = useRef<HTMLDivElement | null>(null);
  const thirdChevron = useRef<HTMLDivElement | null>(null);
  const fourthChevron = useRef<HTMLDivElement | null>(null);
  

  gsap.registerPlugin(ScrollTrigger);

  const [messageSent, setMessageSent] = useState<null | string>(null);

  // Observing states
  const [observingHome, setObservingHome] = useState(false);
  const [observingAbout, setObservingAbout] = useState(false);
  const [observingProfession, setObservingProfession] = useState(false);
  const [observingImage, setObservingImage] = useState(false);
  const [observingContact, setObservingContact] = useState(false);
  const [observingFirstVideo, setObservingFirstVideo] = useState(false);

  const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_API_LEAD_CAPTURE_DEV : import.meta.env.VITE_API_LEAD_CAPTURE_PROD;
  
  const location = useLocation();
  const navigate = useNavigate();

  const sectionRefs = [homeRef, aboutRef, processSectionRef, foreclosureRef, caseStudiesRef, servicesRef];

  useEffect(() => {
    if (scrollTarget === undefined) return;

    requestAnimationFrame(() => {
      sectionRefs[scrollTarget]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [location.key, scrollTarget]);


  useEffect(() => {
    const ctx = gsap.context(() => {
      
      window.innerWidth >= window.innerHeight ? gsap.set(cloudOneRef.current, {
        autoAlpha: 1,
        y: 500,
      }) : gsap.set(cloudOneRef.current, {
        autoAlpha: 1,
        y: 860,
      })

      gsap.set(cloudTwoRef.current, {
        autoAlpha: 0.5,
        y: 1200,
      });

      gsap.set(apartmentRef.current, {
        autoAlpha: 1,
        y: 200,
      });

      gsap.to(cloudOneRef.current, {
        autoAlpha: 1,
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: homeRef.current,
          start: "top top",
          end: "+=200",
          scrub: true,
        }
      });

      gsap.to(cloudTwoRef.current, {
        autoAlpha: 1,
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: homeRef.current,
          start: "top top",
          end: "+=700",
          scrub: true,
        }
      });
      
      gsap.to(apartmentRef.current, {
        autoAlpha: 1,
        y: -500,
        ease: "none",
        scrollTrigger: {
          trigger: homeRef.current,
          start: "top top",
          end: "+=700",
          scrub: true,
        }
      });

      gsap.set(headingRef.current, {
        autoAlpha: 1,
        scale: 1,
      });

      gsap.to(headingRef.current, {
        autoAlpha: 0,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: homeRef.current,
          start: "top top",
          end: "+=200",
          scrub: true,
        }
      });

      gsap.to(whySubtext.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: whySubtext.current,
          start: "top 80%",
          end: "top 30%",
        }
      });

      gsap.to(whyMainHeading.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: whyMainHeading.current,
          start: "top 80%",
          end: "top 30%",
        },
      });

      gsap.to(whyCopy.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: whyMainHeading.current,
          start: "top 80%",
          end: "top 30%",
        },
      });

      gsap.to(aboutHeading.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: aboutHeading.current,
          start: "top 80%",
          end: "top 30%",
        },
      });

      gsap.to(aboutCopy.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: aboutCopy.current,
          start: "top 80%",
          end: "top 30%",
        },
      });

      gsap.to(processMainHeading.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: processMainHeading.current,
          start: "top 80%",
          end: "top 30%",
        },
      });

      gsap.to(processAnalysis.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: processAnalysis.current,
          start: "top 80%",
          end: "top 30%",
        },
      });

      gsap.to(cashOffer.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: cashOffer.current,
          start: "top 80%",
          end: "top 30%",
        },
      });

      gsap.to(marketAnalysis.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: marketAnalysis.current,
          start: "top 80%",
          end: "top 30%",
        },
      });

      gsap.to(caseStudiesHeading.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: caseStudiesHeading.current,
          start: "top 80%",
          end: "top 30%",
        },
      });

      gsap.to(clientName.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: clientName.current,
          start: "top 80%",
          end: "top 30%",
        },
      });

      gsap.to(propertyAddress.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: propertyAddress.current,
          start: "top 80%",
          end: "top 30%",
        },
      });

      gsap.to(caseStudyTestimony.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: caseStudyTestimony.current,
          start: "top 80%",
          end: "top 30%",
        },
      });

      gsap.set(houseAsset.current, {
        autoAlpha: 1,
        clipPath: "inset(0 100% 0 0)",
      });

      gsap.to(houseAsset.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: houseAsset.current,
          start: "top 50%",
          once: true,
        },
      });

      gsap.set(caseStudyHouseAsset.current, {
        autoAlpha: 1,
        clipPath: "inset(0 100% 0 0)",
      });

      gsap.to(caseStudyHouseAsset.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: caseStudyHouseAsset.current,
          start: "top 50%",
          once: true,
        },
      });

      gsap.to(facingForeclosure.current, {
        backgroundPosition: "0% 0",
        ease: "none",
        scrollTrigger: {
          trigger: facingForeclosure.current,
          start: "top 80%",
          end: "top 30%",
        },
      });

      gsap.set(foreclosureImage.current, {
        autoAlpha: 1,
        clipPath: "inset(0 100% 0 0)",
      });

      gsap.to(foreclosureImage.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: foreclosureImage.current,
          start: "top 50%",
          once: true,
        },
      });

      const chevrons = [
        firstChevron.current,
        secondChevron.current,
        thirdChevron.current,
        fourthChevron.current,
      ].filter(Boolean) as HTMLDivElement[];

      const overlays = chevrons.map((chevron) =>
        chevron.querySelector(".ChevronOverlay")
      ) as HTMLDivElement[];

      gsap.set(chevrons, {
        scale: 0.50,
        transformOrigin: "center center",
      });

      gsap.set(overlays, {
        opacity: 0.8,
      });

      const starts = ["top 45%", "top 35%", "top 25%", "top 15%"];

      chevrons.forEach((chevron, index) => {
        gsap.to(chevron, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: starts[index],
          },
        });

        gsap.to(overlays[index], {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: starts[index],
          },
        });
      });
    });

    return () => ctx.revert();
    
  }, []);

  const caseStudies = [
    {
      Address : "Philadelphia, PA",
      Client : "Ellen Gore",
      Testimony : `Ellen's mother had passed away, she was stuck with the property.
      Apex Investor Group paid all legal fees and opened an estate to allow her
      to close a sale.`
    },

    {
      Address : "313 E Washington Ave",
      Client : "Newtown, PA",
      Testimony : `Stacy was struggling to afford her monthly rate, she was under water
      on her loan. Apex Investor Group deployed equity into the property and assisted
      her in selling the home at market value.`
    }
  ]

  function navigateToForeclosure() {
    window.scrollTo(0, 0); 
    navigate(`/foreclosure`, { replace: true });
  }

  return (
    <>
    <div className='LandingPage'>
      <div className='Skyline'><div className='SkylineImage'><img src='/Skyline.png' /></div></div>
      <div
        className='Home'
        ref={homeRef}
        data-section="home"
      >
        <div className='Section1'>
          <div className='Apartment' ref={apartmentRef}><img src='/Apartment.png' /></div>
          <div className='Heading' ref={headingRef}>
            <h1>Invest at the Apex</h1>
            <h2>Quick. Secure. Property investors</h2>
            <button onClick={() => {window.open(`${BASE_URL}/lead/buy`, '_blank')}}>{"Find Properties →"}</button>
          </div>
        </div>
        <div className='CloudLayer1' ref={cloudOneRef}><img src={window.innerWidth >= window.innerHeight ? '/CloudLayer1.png' : '/CloudLayer1_mobile.png'}/></div>
        <div className='CloudLayer2' ref={cloudTwoRef}><img src={window.innerWidth >= window.innerHeight ? '/CloudLayer2.png' : '/CloudLayer2_mobile.png'}/></div>
        <div className='Section2'>
          <div className='WhyApex'>
            <h2 className='WhySubtext' ref={whySubtext}>Why Apex</h2>
            <div className='WhyHeadings'>
              <h1 className='MainHeading' ref={whyMainHeading}>We'll buy it all</h1>
              <h2 className='SubHeading'>Any House. Any Condition. Any Price</h2>
            </div>
            <div className='WhyCopy' ref={whyCopy}>
              We buy properties in any condition and handle situations most buyers won’t touch. 
              Whether you’re dealing with foreclosure, inherited property, major repairs, or just need a clean exit, 
              our team moves quickly to understand your situation and give you real options. We evaluate each property 
              based on its condition, location, and current market demand, allowing us to present a fair, data-backed 
              cash offer without the guesswork. No agents, no showings, and no drawn-out timelines. If it makes sense 
              for you, we can close on your timeline, often in as little as 7–14 days. No fees, no commissions, and no 
              pressure. Our goal is simple: give you a straightforward solution, clear communication, and a process that 
              actually works in your favor.
            </div>
            <div className='HouseAsset' ref={houseAsset}>
              <img src='/house1.png' />
            </div>

            <div className='ApexStats'>
              <div className='Stat'>
                <h1>20</h1>
                <h2>Monthly Properties</h2>
              </div>

              <div className='Stat'>
                <h1>6</h1>
                <h2>Week Closings</h2>
              </div>

              <div className='Stat'>
                <h1>2</h1>
                <h2>Years In Business</h2>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div className="About" ref={aboutRef}>
        <div className='AboutHeading' ref={aboutHeading}><h1>Taking Real-Estate To The Apex</h1></div>
        <div className='Chevrons'>
          <div className='ChevronCont' ref={firstChevron}>
            <div className='Chevron'>
              <div className='ChevronOverlay'></div>
              <img src='/House2.jfif' />
            </div>
          </div>

          <div className='ChevronCont' ref={secondChevron}>
            <div className='Chevron'>
              <div className='ChevronOverlay'></div>
              <img src='/House3.jpg' />
            </div>
          </div>

          <div className='ChevronCont' ref={thirdChevron}>
            <div className='Chevron'>
              <div className='ChevronOverlay'></div>
              <img src='/House4.png' />
            </div>
          </div>

          <div className='ChevronCont' ref={fourthChevron}>
            <div className='Chevron'>
              <div className='ChevronOverlay'></div>
              <img src='/House5.jpeg' />
            </div>
          </div>
        </div>
        <div className='AboutCopy'><h2 ref={aboutCopy}>Our experienced team provides unmatched 
          expertise throughout the property journey. 
          We make the process easy, handling every detail precisely.</h2>
        </div>
      </div>

      <div className='Process' ref={processSectionRef}>
        <div className='ProcessMainHeading'>
          <span ref={processMainHeading}>Top Tier<br/> <span>Real Estate</span></span>
          <button onClick={() => {window.open(`${BASE_URL}/lead`, '_blank')}}>Start Your Search →</button>
        </div>
        <div className='ProcessCopy'>
          <h2>Steps:</h2>
          <div className='ProcessList'>
            <div className='ProcessStep'>
              <div className='StepMarker'><span>➤</span></div>
              <span ref={processAnalysis}>Property Analysis. <span>
                Our team performs a complete 
                analysis of your property to determine 
                the best rent amount, assisting you in 
                maximizing your income while remaining 
                competitive in the market.</span>
              </span>
            </div>

            <div className='ProcessStep'>
              <div className='StepMarker'><span>➤</span></div>
              <span ref={cashOffer}>Cash Offer. <span>
                Our team performs a complete 
                analysis of your property to determine 
                the best rent amount, assisting you in 
                maximizing your income while remaining 
                competitive in the market.</span>
              </span>
            </div>

            <div className='ProcessStep'>
              <div className='StepMarker'><span>➤</span></div>
              <span ref={marketAnalysis}>Market Analysis and Price Strategy. <span>
                We adjust rental rates based on market trends 
                to keep a competitive edge. By analyzing comparable 
                properties, occupancy, concessions, and demand, we 
                determine proper timing and price we can pay for 
                your property.</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='ForeclosureSection' ref={foreclosureRef}>
        <div className='ForeclosureHeading'>
          <span ref={facingForeclosure}>Facing Foreclosure?<br/><span>We can help</span></span>
          <button onClick={() => {navigateToForeclosure()}}>Learn More →</button>
        </div>

        <div className='ForeclosureImage' ref={foreclosureImage}><img src='/house8.webp'/></div>

      </div>

      <div className='SectionDividerProcess'></div>

      <div className='CaseStudies' ref={caseStudiesRef}>
        <div className='CaseStudiesMainHeading'><span ref={caseStudiesHeading}>We have helped others<br /><span>We can help you too</span></span></div>

        <div className='CaseStudyImage' ref={caseStudyHouseAsset}>
          <img src="/House6.jpg"/>
        </div>

        <div className='CaseStudyContainer'>
          <div className='CaseStudySelector'>
            {
              caseStudies.map((caseStudy, index) => (
                <button onClick={() => {setSelectedCaseStudy(index)}}>
                  <span>{index}</span>
                </button>
              ))
            }
          </div>

          <div className='CaseStudy'>
            <div className='ClientName' ref={clientName}>{caseStudies[selectedCaseStudy].Client}</div>
            <div className='PropertyAddress' ref={propertyAddress}>{caseStudies[selectedCaseStudy].Address}</div>

            <div className='CaseStudyTestimony'><span ref={caseStudyTestimony}>{caseStudies[selectedCaseStudy].Testimony}</span></div>

          </div>
        </div>
      </div>

      <div className='SectionDividerCaseStudies'></div>

      <div className='ActionSection' ref={servicesRef}>
        <div className='ActionHeader'>
          <div className='ActionSubheading'><h2>Services</h2></div>
          <div className='ActionHeading'><span>How Apex<br/><span>Can Help You</span></span></div>
        </div>

        <a className='ActionContent' onClick={() => {window.open(`${BASE_URL}/lead/buy`, '_blank')}}>
          <div className="ActionOverlay"></div>
          <div className='ActionImage'>
            <img src="/House3.jpg"/>
          </div>
          <div className='ActionMarker'>1</div>
          <div className='ActionSubheading'>
            <h2>Become a partner and invest with us 
              and become the first to see any opportunities 
              we may have.</h2>
          </div>
          <div className='CallToAction' ><span>Buy</span></div>
        </a>

        <a className='ActionContent' onClick={() => {window.open(`${BASE_URL}/lead/sell`, '_blank')}}>
          <div className="ActionOverlay"></div>
          <div className='ActionImage'>
            <img src="/House4.png"/>
          </div>
          <div className='ActionMarker'>2</div>
          <div className='ActionSubheading'>
            <h2>Skip the repairs, delays, and uncertainty through a team that 
              knows how to solve problems and get you out clean.</h2>
          </div>
          <div className='CallToAction' ><span>Sell</span></div>
        </a>

        <a className='ActionContent' onClick={() => {window.open(`${BASE_URL}/lead/invest`, '_blank')}}>
          <div className="ActionOverlay"></div>
          <div className='ActionImage'>
            <img src="/House5.jpeg"/>
          </div>
          <div className='ActionMarker'>3</div>
          <div className='ActionSubheading'>
            <h2>Looking to put capital to work? 
              We structure real estate opportunities 
              designed to create returns while keeping 
              things simple and transparent.</h2>
          </div>
          <div className='CallToAction' ><span>Invest</span></div>
        </a>

        <a className='CallToActionSection'>
          <div className='CallToActionCopy'>
            <h2>Our certified agents guide you through
              every stage of real estate with expert
              knowledge and reliable support.
            </h2>
            <button onClick={() => {window.open(`${BASE_URL}/lead`, '_blank')}}>Get Started With Apex →</button>
          </div>
        </a>
      </div>

      <div className='FinalSection'>
            <div className='FinalBackground'>
              <img src='/House7.jpg'/>
            </div>
            <div className='Overlay'></div>
            <div className='FinalCallToAction'>
              <h1>Reach The Apex. We’ll Help You Get There.</h1>
              <button onClick={() => {window.open(`${BASE_URL}/lead`, '_blank')}}>Let's Get Started →</button>
            </div>
      </div>
      </div>
    </>
  );
}

export default Landing;
