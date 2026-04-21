import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './styles/Foreclosure.css';
import './styles/Foreclosure-Mobile.css';

function Foreclosure({
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
  const professionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const firstVideoRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cloudOneRef = useRef<HTMLDivElement | null>(null);
  const cloudTwoRef = useRef<HTMLDivElement | null>(null);
  const apartmentRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const shortTermList = useRef<HTMLDivElement | null>(null);
  const longTermList = useRef<HTMLDivElement | null>(null);
  const apexOptionsList = useRef<HTMLDivElement | null>(null);

    const whySubtext = useRef<HTMLHeadingElement | null>(null);

  const whyMainHeading = useRef<HTMLHeadingElement | null>(null);
  const aboutHeading = useRef<HTMLDivElement | null>(null);
  const aboutCopy = useRef<HTMLDivElement | null>(null);
  const OptionsMainHeading = useRef<HTMLSpanElement | null>(null);
  const processAnalysis = useRef<HTMLSpanElement | null>(null);
  const cashOffer = useRef<HTMLSpanElement | null>(null);
  const marketAnalysis = useRef<HTMLSpanElement | null>(null);
  const caseStudiesHeading = useRef<HTMLSpanElement | null>(null);
  const clientName = useRef<HTMLDivElement | null>(null);
  const propertyAddress = useRef<HTMLDivElement | null>(null);
  const caseStudyTestimony = useRef<HTMLDivElement | null>(null);

  const houseAsset = useRef<HTMLDivElement | null>(null);
  const caseStudyHouseAsset = useRef<HTMLDivElement | null>(null);

  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const firstChevron = useRef<HTMLDivElement | null>(null);
  const secondChevron = useRef<HTMLDivElement | null>(null);
  const thirdChevron = useRef<HTMLDivElement | null>(null);
  const fourthChevron = useRef<HTMLDivElement | null>(null);


const facingForeclosure = useRef<HTMLHeadingElement | null>(null);
const foreclosureMainHeading = useRef<HTMLHeadingElement | null>(null);
const foreclosureCopy = useRef<HTMLDivElement | null>(null);
const firstHouseAsset = useRef<HTMLDivElement | null>(null);

const defaultSubtext = useRef<HTMLHeadingElement | null>(null);
const defaultHeading = useRef<HTMLHeadingElement | null>(null);
const defaultCopy = useRef<HTMLDivElement | null>(null);
const secondHouseAsset = useRef<HTMLDivElement | null>(null);

const shortTermHeading = useRef<HTMLSpanElement | null>(null);
const mortgageReinstatement = useRef<HTMLSpanElement | null>(null);
const forebearance = useRef<HTMLSpanElement | null>(null);
const repaymentPlan = useRef<HTMLSpanElement | null>(null);

const longTermHeading = useRef<HTMLSpanElement | null>(null);
const mortgageModification = useRef<HTMLSpanElement | null>(null);
const shortSale = useRef<HTMLSpanElement | null>(null);
const deedInLieu = useRef<HTMLSpanElement | null>(null);

const apexHeading = useRef<HTMLSpanElement | null>(null);
const homeRetention = useRef<HTMLSpanElement | null>(null);
const sixMonth = useRef<HTMLSpanElement | null>(null);
const equityProgram = useRef<HTMLSpanElement | null>(null);
const leaseProgram = useRef<HTMLSpanElement | null>(null);
const subToOffer = useRef<HTMLSpanElement | null>(null);
const overageClaim = useRef<HTMLSpanElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);

  const [messageSent, setMessageSent] = useState<null | string>(null);

  // Observing states
  const [observingHome, setObservingHome] = useState(false);
  const [observingAbout, setObservingAbout] = useState(false);
  const [observingProfession, setObservingProfession] = useState(false);
  const [observingImage, setObservingImage] = useState(false);
  const [observingContact, setObservingContact] = useState(false);
  const [observingFirstVideo, setObservingFirstVideo] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const sectionRefs = [homeRef, aboutRef, professionRef, contactRef];

    const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_API_LEAD_CAPTURE_DEV : import.meta.env.VITE_API_LEAD_CAPTURE_PROD;


  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Force mute both ways (attribute + property behavior)
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;

    // Attempt play; if blocked, it will reject (normal on mobile)
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        // Autoplay blocked; you can optionally show a custom play overlay here
      }
    };

    // Try immediately and again when enough data is ready
    tryPlay();
    v.addEventListener("canplay", tryPlay);

    return () => v.removeEventListener("canplay", tryPlay);
  }, []);


  useEffect(() => {
    if (scrollTarget === undefined) return;

    requestAnimationFrame(() => {
      sectionRefs[scrollTarget]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [location.key, scrollTarget]);

  // Intersection Observer
  useEffect(() => {
    const sections: Array<{
    key: "home" | "about" | "profession" | "image" | "contact" | "firstVideo";
    ref: React.RefObject<HTMLDivElement | null>;
    }> = [
      { key: "home", ref: homeRef },
      { key: "about", ref: aboutRef },
      { key: "firstVideo", ref: firstVideoRef },
      { key: "profession", ref: professionRef },
      { key: "image", ref: imageRef },
      { key: "contact", ref: contactRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key = entry.target.getAttribute("data-section");
          const isVisible = entry.isIntersecting;

          switch (key) {
            case "home":
              setObservingHome(isVisible);
              break;
            case "about":
              setObservingAbout(isVisible);
              break;
            case "profession":
              setObservingProfession(isVisible);
              break;
            case "image":
              setObservingImage(isVisible);
              break;
            case "contact":
              setObservingContact(isVisible);
              break;
            case "firstVideo":
              setObservingFirstVideo(isVisible);
	      videoRef.current?.play();
              break;
            default:
              break;
          }
        }
      },
      {
        // tweak as desired:
        threshold: 0.25, // 25% visible = "observed"
        root: null,
        rootMargin: "0px 0px -10% 0px", // makes it feel more natural as you scroll down
      }
    );

    // Observe only if the element exists
    for (const s of sections) {
      if (s.ref.current) observer.observe(s.ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const navigateToPortfolio = () => {
    navigate(`/Portfolio`, { replace: true });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
        gsap.to(facingForeclosure.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: facingForeclosure.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(foreclosureMainHeading.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: foreclosureMainHeading.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(foreclosureCopy.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: foreclosureCopy.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.set(firstHouseAsset.current, {
            autoAlpha: 1,
            clipPath: "inset(0 100% 0 0)",
        });

        gsap.to(firstHouseAsset.current, {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
            trigger: firstHouseAsset.current,
            start: "top 50%",
            once: true,
            },
        });

        gsap.to(defaultSubtext.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: defaultSubtext.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(defaultHeading.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: defaultHeading.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(defaultCopy.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: defaultCopy.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.set(secondHouseAsset.current, {
            autoAlpha: 1,
            clipPath: "inset(0 100% 0 0)",
        });

        gsap.to(secondHouseAsset.current, {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
            trigger: secondHouseAsset.current,
            start: "top 50%",
            once: true,
            },
        });

        gsap.to(shortTermHeading.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: shortTermHeading.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(mortgageReinstatement.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: mortgageReinstatement.current,
            start: "top 80%",
            end: "top 30%",
            }
        });
        
        gsap.to(forebearance.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: forebearance.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(repaymentPlan.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: repaymentPlan.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(longTermHeading.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: longTermHeading.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(mortgageModification.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: mortgageModification.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(shortSale.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: shortSale.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(deedInLieu.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: deedInLieu.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(apexHeading.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: apexHeading.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(homeRetention.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: homeRetention.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(sixMonth.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: sixMonth.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(equityProgram.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: equityProgram.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(leaseProgram.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: leaseProgram.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(subToOffer.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: subToOffer.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        gsap.to(overageClaim.current, {
            backgroundPosition: "0% 0",
            ease: "none",
            scrollTrigger: {
            trigger: overageClaim.current,
            start: "top 80%",
            end: "top 30%",
            }
        });

        const shortTermElements = shortTermList.current
        ? Array.from(
            shortTermList.current.querySelectorAll(".ForeclosureOption")
            ) as HTMLDivElement[]
        : [];

        gsap.set(shortTermElements, {
        x: -80,
        autoAlpha: 0,
        });

        shortTermElements.forEach((step) => {
        gsap.to(step, {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
            },
        });
        });

        const longTermElements = longTermList.current
        ? Array.from(
            longTermList.current.querySelectorAll(".ForeclosureOption")
            ) as HTMLDivElement[]
        : [];

        gsap.set(longTermElements, {
        x: -80,
        autoAlpha: 0,
        });

        longTermElements.forEach((step) => {
        gsap.to(step, {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
            },
        });
        });

        const apexOptionElements = apexOptionsList.current
        ? Array.from(
            apexOptionsList.current.querySelectorAll(".ForeclosureOption")
            ) as HTMLDivElement[]
        : [];

        gsap.set(apexOptionElements, {
        x: -80,
        autoAlpha: 0,
        });

        apexOptionElements.forEach((step) => {
        gsap.to(step, {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
            },
        });
        });


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

  return (
    <>
        <div className='ForeclosurePage'>
            <div className='ForeclosureHome'>
                <div className='WhyApex'>
                    <h2 className='WhySubtext' ref={facingForeclosure}>Facing Foreclosure?</h2>
                    <div className='WhyHeadings ForeclosureHeadings'>
                    <h1 className='MainHeading' ref={foreclosureMainHeading}>What Are My Options?</h1>
                    <h2 className='SubHeading'>Don't Worry. Don't Panic. We can help.</h2>
                    </div>
                    <div className='ForeclosureCopy' ref={foreclosureCopy}>
                        Facing foreclosure? Don't panic. We at Apex Investments understand the 
                        overwhelming pressure of saving your home. While government programs, 
                        lenders, and local agencies offer solutions, they might not always be 
                        the perfect fit. That's where Apex Investments comes in. We specialize 
                        in crafting unique strategies to help you navigate foreclosure and 
                        potentially keep your home that attorney may not be able to provide.
                        
                        <br/><br/>

                        Every situation is unique. The specific solutions available to prevent 
                        foreclosure depend on your loan details and current finances. We hope our 
                        website empowers you to make informed decisions based on your specific 
                        circumstances. Remember, taking action is crucial. While you explore your 
                        options, keep in mind that foreclosure timelines move quickly. The sooner 
                        you address the situation, the more time there is to explore your options 
                        and potentially save your home. This revision removes the pressure tactics
                         and emphasizes the importance of understanding your situation and acting 
                         promptly.
                    </div>
                    <div className='HouseAssetForeclosure' ref={firstHouseAsset}>
                    <img src='/House6.jpg' />
                    </div>    
                </div>
            </div>

            <div className='ForeclosureHome DefaultContainer'>
                <div className='WhyApex'>
                    <h2 className='WhySubtext' ref={defaultSubtext}>Thinking of defaulting?</h2>
                    <div className='WhyHeadings ForeclosureHeadings'>
                    <h1 className='MainHeading' ref={defaultHeading}>What Happens If I Default?</h1>
                    <h2 className='SubHeading'>We have better options for you</h2>
                    </div>
                    <div className='ForeclosureCopy' ref={defaultCopy}>
                        Missing a mortgage payment has serious consequences like 
                        damaging your credit, finances, and accelerating the mortgage. 
                        This report provides options for homeowners falling behind and 
                        basic mortgage knowledge. Understanding the system and your rights 
                        helps make good decisions when negotiating with lenders. 
                        Borrowers equipped with this analysis enter discussions from a 
                        position of strength.
                    </div>
                    <div className='HouseAssetForeclosure' ref={secondHouseAsset}>
                    <img src='/House7.jpg' />
                    </div>    
                </div>
            </div>

            <div className='ShortTermOptions'>
                <div className='OptionsMainHeading'>
                    <span ref={shortTermHeading}>Short Term/Temporary<br/> <span>Financial situation</span></span>
                    <button onClick={() => {window.open(`${BASE_URL}/lead/sell`, '_blank')}}>Explore →</button>
                </div>
                
                <div className='OptionsCopy'>
                    <h2>Options:</h2>
                    <div className='OptionsList' ref={shortTermList}>
                        <div className='ForeclosureOption'>
                            <div className='OptionMarker'><span>➤</span></div>
                            <span ref={mortgageReinstatement}>MORTGAGE REINSTATEMENT. <span>
                                If you have enough cash, you can “reinstate” 
                                your mortgage by making up all the missed payments 
                                plus fees and interest the lender/mortgage company 
                                charges you in one lump sum.
                            </span>
                            </span>
                        </div>

                        <div className='ForeclosureOption'>
                            <div className='OptionMarker'><span>➤</span></div>
                            <span ref={forebearance}>FORBEARANCE. <span>
                                A temporary period of time during which a regular monthly mortgage payment is reduced or suspended.
                            </span>
                            </span>
                        </div>

                        <div className='ForeclosureOption'>
                            <div className='OptionMarker'><span>➤</span></div>
                            <span ref={repaymentPlan}>REPAYMENT PLAN. <span>
                                A process in which a homeowner promises to pay down past due amounts on a mortgage while continuing to make regular monthly payments on a property.
                            </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='LongTermOptions'>
                <div className='OptionsMainHeading'>
                    <span ref={longTermHeading}>Long Term/Permanent<br/> <span>Financial situation</span></span>
                    <button onClick={() => {window.open(`${BASE_URL}/lead/sell`, '_blank')}}>Explore →</button>
                </div>
                
                <div className='OptionsCopy'>
                    <h2>Options:</h2>
                    <div className='OptionsList' ref={longTermList}>
                        <div className='ForeclosureOption'>
                            <div className='OptionMarker'><span>➤</span></div>
                            <span ref={mortgageModification}>MORTGAGE MODIFICATION. <span>
                                A modification is any change to the terms of your mortgage loan, 
                                including changes to the interest rate, loan balance, or loan term.
                            </span>
                            </span>
                        </div>

                        <div className='ForeclosureOption'>
                            <div className='OptionMarker'><span>➤</span></div>
                            <span ref={shortSale}>SHORT SALE. <span>
                                A short sale is the sale of a home for less than the balance remaining on your mortgage. 
                                If your mortgage company agrees to a short sale, you can sell your home and pay off all 
                                (or a portion of) your mortgage balance. Consider this option if you can no longer 
                                afford your home.
                            </span>
                            </span>
                        </div>

                        <div className='ForeclosureOption'>
                            <div className='OptionMarker'><span>➤</span></div>
                            <span ref={deedInLieu}>DEED-IN-LIEU OF FORECLOSURE. <span>
                                With a Deed-in-Lieu of Foreclosure (DIL), you transfer 
                                the ownership of your property to the owner of your mortgage 
                                in exchange for a release from your loan and payments.
                            </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='ApexOptions'>
                <div className='OptionsMainHeading'>
                    <span ref={apexHeading}>Apex<br/> <span>Options</span></span>
                    <button onClick={() => {window.open(`${BASE_URL}/lead/sell`, '_blank')}}>Explore →</button>
                </div>
                
                <div className='OptionsCopy'>
                    <h2>Options:</h2>
                    <div className='OptionsList' ref={apexOptionsList}>
                        <div className='ForeclosureOption ApexForeclosureOption'>
                            <div className='OptionMarker'><span>➤</span></div>
                            <span ref={homeRetention}>Home Retention Refinance Program. <span>
                                We refinance your mortgage, stop foreclosure, and lease 
                                your home back to you with a 36-month repurchase option. 
                                After 36 months, you can refinance, sell, or remain as a tenant.
                            </span>
                            </span>
                        </div>

                        <div className='ForeclosureOption ApexForeclosureOption'>
                            <div className='OptionMarker'><span>➤</span></div>
                            <span ref={sixMonth}>6-Month Option Agreement Plan. <span>
                                We stop foreclosure and cover your past-due balance, giving you 6 months to repurchase your home. 
                                Missing payments or failing to repurchase may result in equity loss.
                            </span>
                            </span>
                        </div>

                        <div className='ForeclosureOption ApexForeclosureOption'>
                            <div className='OptionMarker'><span>➤</span></div>
                            <span ref={equityProgram}>Equity Protection Program. <span>
                                We help protect your equity by covering missed payments and 
                                guiding the sale of your home. After costs and fees, you 
                                keep the remaining proceeds. Offers must be finalized within 60 days.
                            </span>
                            </span>
                        </div>

                        <div className='ForeclosureOption ApexForeclosureOption'>
                            <div className='OptionMarker'><span>➤</span></div>
                            <span ref={leaseProgram}>Lease Back Program. <span>
                                We catch up your payments and lease the property back to you, 
                                allowing you to stay in your home as a long-term tenant 
                                with no pressure to repurchase.
                          </span>
                            </span>
                        </div>

                        <div className='ForeclosureOption ApexForeclosureOption'>
                            <div className='OptionMarker'><span>➤</span></div>
                            <span ref={subToOffer}>Sub-To Offer. <span>
                                We take over your mortgage payments and stop 
                                foreclosure. You may qualify for up to $20,000 to 
                                assist with your transition. For more details, contact us today!
                            </span>
                            </span>
                        </div>

                        <div className='ForeclosureOption ApexForeclosureOption'>
                            <div className='OptionMarker'><span>➤</span></div>
                            <span ref={overageClaim}>Apex Overrage Claim. <span>
                                House already went to auction? Not a problem Apex 
                                transforms foreclosure setbacks into financial recovery 
                                opportunities. Our specialized team expertly locates 
                                and retrieves surplus funds remaining after property 
                                auctions, ensuring you reclaim every dollar you’re 
                                legally entitled to receive. We navigate the complex 
                                legal landscape so you don’t have to, turning potential 
                                loss into unexpected financial gain.</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>  
  );
}

export default Foreclosure;
