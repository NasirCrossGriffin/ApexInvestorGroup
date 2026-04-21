import { useState, useRef, useEffect } from 'react'
import './styles/NewPortfolioEntry.css'
import { uploadToS3 } from '../middleware/s3';
import { allPortfolioEntries, newPortfolioEntry } from '../middleware/portfolio';

function NewPortfolioEntry ({
  toggleVisibility, setPortfolioEntries
}: {
  toggleVisibility: React.Dispatch<React.SetStateAction<Boolean>>,
  setPortfolioEntries: React.Dispatch<React.SetStateAction<Array<Object>>>;
}) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadedFilePath, setUploadedFilePath] = useState<string | null>(null);

    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [hidden, setHidden] = useState<boolean>(true);

    const [newEntry, setNewEntry] = useState<Object | null>(null);


    const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e : React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Cleanup object URL on unmount or change
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    const acquireEntries = async ()  => {
      const Entries = await allPortfolioEntries();
      if (Entries.length > 0) setPortfolioEntries(Entries)
    }; acquireEntries();       
  
    if (newEntry) {
      toggleVisibility(false);
    }
  }, [newEntry])

  useEffect(() => {
    handleNewEntry();
  }, [uploadedFilePath])

  const isValidTitle = (title: string): boolean => {
    return title.trim().length > 0;
  };

  const isValidBody = (body: string): boolean => {
    return body.trim().length > 0;
  };

  const isValidDate = (date: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;

    if (!regex.test(date)) return false;

    const [month, day, year] = date.split("-").map(Number);
    const parsed = new Date(year, month - 1, day);

    return (
      parsed.getFullYear() === year &&
      parsed.getMonth() === month - 1 &&
      parsed.getDate() === day
    );
  };

  const isValidHidden = (hidden: boolean): boolean => {
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

  const handleFileUpload = async () => {
    if (imageFile === null) return;

    try {
      console.log("try entered");
      const newUpload = await uploadToS3(imageFile); 
      console.log(newUpload);
      setUploadedFilePath(newUpload.url);
    } catch (err) {
      console.log(err) 
    }
  }

  const handleNewEntry = async () => {
    console.log(uploadedFilePath)
    if (uploadedFilePath === null) return;

    console.log(isFormValid(title, body, date, hidden));
    if (isFormValid(title, body, date, hidden) === false) return

    const newEntry = {
        title : title,
        body : body,
        path : uploadedFilePath,
        date : date,
        hidden : hidden,
    }

    try {
      const portfolioEntry = await newPortfolioEntry(newEntry); 
      console.log(portfolioEntry);
      setNewEntry(portfolioEntry);

    } catch (err) {
      return 
    }
  }

  const createNewEntry = async () => {
    try {
      await handleFileUpload();
    } catch(err) {
      console.log(err);
      return;
    }
  }

  return (
    <>        
      <div className='Background' onClick={() => toggleVisibility(false)}></div>
      <div className='NewEntry'>
        <div className='ImageContainer'>
          <div className='NewEntryPhoto'>
            {imagePreview ? (
              <img
                  src={imagePreview}
                  alt="Preview"
                  className="NewEntryPhotoImg"
              />
              ) : null}
          </div>
          
          <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
          >
              Upload Image
          </button>
        </div>
        
        <div className='ContentInformation'>
            <label htmlFor="title">Title</label>
            <input name="title" onChange={(e) => {setTitle(e.target.value)}}/>
            <label htmlFor="date">Date (Format: MM-DD-YYYY)</label>
            <input name="date" onChange={(e) => {setDate(e.target.value)}}/>
            <label htmlFor="body">Text Body</label>
            <textarea name="body" onChange={(e) => {setBody(e.target.value)}}/>
            <label htmlFor="hidden">Hidden</label>
            <select name="hidden" 
              id="hidden" 
              onChange={(e) => setHidden(e.target.value === "true")}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
        </div> 

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect} />

          <button className='Submit' onClick={async () => {await createNewEntry()}}>Submit</button>
      </div>
    </>
  )
}

export default NewPortfolioEntry;
