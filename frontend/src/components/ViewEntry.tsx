import { useState, useEffect } from 'react'
import './styles/ViewEntry.css'
import { getPortfolioEntry } from '../middleware/portfolio';

function ViewEntry ({
  toggleVisibility, id
}: {
  toggleVisibility: React.Dispatch<React.SetStateAction<Boolean>>, id : string;
}) {
    const [selectedEntry, setSelectedEntry] = useState<any>({});


  useEffect(() => {
    const setTheEntry = async () => {setSelectedEntry(await getPortfolioEntry(id))};
    setTheEntry();
  }, [id]);

  const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 0-based
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

  return (
    <>        
      <div className='ViewEntry'>
        <div className='Exit'><button onClick={() => {toggleVisibility(false)}}>X</button></div>
        <div className='ViewImageContainer'>
          <div className='ViewEntryPhoto'>
              <img
                  src={selectedEntry.path}
                  alt="Preview"
              />
          </div>
        </div>
        
        <div className='ViewContentInformation'>
            <h1 className="EntryTitle">{selectedEntry.title}</h1>
            <h2 className="EntryDate">{formatDate(new Date(selectedEntry.date))}</h2>
            <p className="EntryBody">{selectedEntry.body}</p>
        </div> 
        <div className='Pink_Butterflies'>
          <img
                  src="/Pink_Butterflies.png"
                  alt="Preview"
              />
        </div>
      </div>
    </>
  )
}

export default ViewEntry;
