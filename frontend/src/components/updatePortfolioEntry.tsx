import { useState, useRef, useEffect } from 'react'
import './styles/NewPortfolioEntry.css'
import { allPortfolioEntries, deletePortfolioEntry, getPortfolioEntry, updatePortfolioEntry } from '../middleware/portfolio';

function UpdatePortfolioEntry ({
  toggleVisibility, setPortfolioEntries, id
}: {
  toggleVisibility: React.Dispatch<React.SetStateAction<Boolean>>, id : string,
  setPortfolioEntries: React.Dispatch<React.SetStateAction<Array<Object>>>;
}) {
    const [imagePreview] = useState<string | null>(null);
    const [uploadedFilePath, setUploadedFilePath] = useState<string | null>(null);
    const [selectedEntry, setSelectedEntry] = useState<any>({});
    const [updatedEntry, setUpdatedEntry] = useState<null | any>(null);

    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [hidden, setHidden] = useState<boolean>(true);

    const titleInputRef = useRef<HTMLInputElement | null>(null);
    const bodyTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const dateInputRef = useRef<HTMLInputElement | null>(null);
    const hiddenSelectRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    const acquireEntries = async ()  => {
          const Entries = await allPortfolioEntries();
          if (Entries.length > 0) setPortfolioEntries(Entries)
        }; acquireEntries();       
      
        if (updatedEntry) {
          toggleVisibility(false);
        }
  }, [updatedEntry]);

  // Cleanup object URL on unmount or change
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    const setTheEntry = async () => {setSelectedEntry(await getPortfolioEntry(id))};
    setTheEntry();
  }, [id]);

  useEffect(() => {
    if (titleInputRef.current !== null) {
        titleInputRef.current.value = selectedEntry.title;
        setTitle(selectedEntry.title);
    }

    if (bodyTextAreaRef.current !== null) {
        bodyTextAreaRef.current.value = selectedEntry.body;
        setBody(selectedEntry.body);
    }

    if (dateInputRef.current !== null) {
        dateInputRef.current.value = formatDate(new Date(selectedEntry.date));
        setDate(formatDate(new Date(selectedEntry.date)));
    }

    if (hiddenSelectRef.current !== null) {
        hiddenSelectRef.current.value = selectedEntry.hidden;
        setHidden(selectedEntry.hidden);
    }

    setUploadedFilePath(selectedEntry.path)
  }, [selectedEntry]);

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 0-based
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
};


  const isValidTitle = (title: string): boolean => {
    console.log(title.trim().length > 0);
    return title.trim().length > 0;
  };

  const isValidBody = (body: string): boolean => {
    console.log(body.trim().length > 0);
    return body.trim().length > 0;
  };

  const isValidDate = (date: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;

    if (!regex.test(date)) return false;

    const [month, day, year] = date.split("-").map(Number);
    const parsed = new Date(year, month - 1, day);

    console.log(
      parsed.getFullYear() === year &&
      parsed.getMonth() === month - 1 &&
      parsed.getDate() === day
    )

    return (
      parsed.getFullYear() === year &&
      parsed.getMonth() === month - 1 &&
      parsed.getDate() === day
    );
  };

  const isValidHidden = (hidden: boolean): boolean => {
    console.log(typeof hidden === "boolean")
    return typeof hidden === "boolean";
  };

  const isFormValid = (
    title: string,
    body: string,
    date: string,
    hidden: boolean
  ): boolean => {
    return (
      isValidTitle(title) &&
      isValidBody(body) &&
      isValidDate(date) &&
      isValidHidden(hidden)
    );
  };

    const handleUpdateEntry = async () => {
        console.log(title)
        console.log(body)
        console.log(date)
        console.log(typeof hidden)
        console.log(uploadedFilePath)
        if (isFormValid(title, body, date, hidden) === false) return

        const newEntry = {
            title : title,
            body : body,
            path : uploadedFilePath,
            date : date,
            hidden : hidden,
        };

        try {
            console.log("Try entered");
            const portfolioEntry = await updatePortfolioEntry(newEntry, id); 
            console.log(portfolioEntry);
            setUpdatedEntry(portfolioEntry);
        } catch (err) {
            console.log(err)
            return 
        }
    }

    const deleteEntry = async () => {
        const deletedEntry = await deletePortfolioEntry(id);
        setUpdatedEntry(deletedEntry);
    }


  return (
    <>        
      <div className='Background' onClick={() => toggleVisibility(false)}></div>
      <div className='NewEntry'>
        <div className='ImageContainer'>
          <div className='NewEntryPhoto'>
              <img
                  src={selectedEntry.path}
                  alt="Preview"
                  className="NewEntryPhotoImg"
              />
          </div>

        </div>
        
        <div className='ContentInformation'>
            <label htmlFor="title">Title</label>
            <input ref={titleInputRef} name="title" onChange={(e) => {setTitle(e.target.value)}}/>
            <label htmlFor="date">Date (Format: MM-DD-YYYY)</label>
            <input name="date" ref={dateInputRef} onChange={(e) => {setDate(e.target.value)}}/>
            <label htmlFor="body">Text Body</label>
            <textarea name="body" ref={bodyTextAreaRef} onChange={(e) => {setBody(e.target.value)}}/>
            <label htmlFor="hidden">Hidden</label>
            <select name="hidden" 
              id="hidden" 
              ref={hiddenSelectRef}
              onChange={(e) => setHidden(e.target.value === "true")}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
        </div> 

        <button
            type="button"
            className="Submit"
            onClick={handleUpdateEntry}
        >
            Update
        </button>
        <button
            type="button"
            className="Delete"
            onClick={() => {deleteEntry()}}
        >
            Delete
        </button>
      </div>
    </>
  )
}

export default UpdatePortfolioEntry;
