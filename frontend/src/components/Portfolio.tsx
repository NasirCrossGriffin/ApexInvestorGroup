import { useState, useEffect } from 'react'
import './styles/Portfolio.css'
import { allPortfolioEntries } from '../middleware/portfolio.tsx';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import ViewEntry from './ViewEntry.js';


function Portfolio() {
  const [entries, setEntries] = useState<Array<any>>([])
  const [toggleView, setToggleView] = useState<Boolean>(false);
  const [entryId, setEntryId] = useState<string>("");

  useEffect(() => {
      const getEntries = async () => {
        const allEntries =  await allPortfolioEntries();
        setEntries(allEntries);
      }; getEntries();
  }, [])


  const entryClicked = (e : React.MouseEvent<HTMLDivElement>) => {
    setEntryId(e.currentTarget.id);
    setToggleView(true);
  }

  return (
    <>
      <div className="Home">
        <div className='Overlay'>
          <div className='OverlayLogo'>
            <img src='/Trinity_Portfolio_Logo.png' />
          </div>
          <div className='OverlayBottom'>
            <p>
              Portfolio
            </p>
          </div>
        </div>
          <div className='HomeContent'>
            <div className='PortfolioHero'>
              <img src='/Trinity_Hero.png' />
            </div>
          </div>
        </div>
      <div className='Portfolio'>
        {
          entries ? 
          <div className='Masonry'> 
           <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                gutterBreakPoints={{350: "12px", 750: "16px", 900: "24px"}}
            >
              
                <Masonry gutter="24px"
                  itemStyle={{
                    width: "100%",
                    display: "block",
                    breakInside: "avoid",
                }}>
                    {
                      entries.map((entry, index) => (
                        !entry.hidden ?
                          <div className='Entry' key={index} id={entry._id} onClick={(e) => {entryClicked(e)}}>
                            <img src={entry.path} className='EntryImage'/> 
                          </div>
                        : null 
                      ))
                    }
                </Masonry>
            </ResponsiveMasonry>
            </div> : null
        }
        </div>
      {toggleView ? <ViewEntry id={entryId} toggleVisibility={setToggleView} /> : null}
    </>
  )
}

export default Portfolio;
