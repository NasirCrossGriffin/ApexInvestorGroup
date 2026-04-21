import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './styles/Admin.css'
import NewPortfolioEntry from './NewPortfolioEntry';
import { allPortfolioEntries } from '../middleware/portfolio';
import UpdatePortfolioEntry from './updatePortfolioEntry';
import { check } from '../middleware/admin';

function Admin() {
  const [portfolioEntries, setPortfolioEntries] = useState<Array<Object>>([]);
  const [newEntryVisible, setNewEntryVisible] = useState<Boolean>(false);
  const [updateEntryVisible, setUpdateEntryVisible] = useState<Boolean>(false);
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);
  const [id, setId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const validateAdmin = async () => { 
      try {
        const validateAdmin = await check();

        if (validateAdmin) {
          setIsAdmin(true);
          return
        }

        console.log("Verification failed")
        navigate(`/admin/login`, { replace: true });
        return
      } catch(err) {
        console.log(err);
        setIsAdmin(false);
        navigate(`/admin/login`, { replace: true });
        return
      }
    }

    const acquireEntries = async () => {
      try {
        const entries = await allPortfolioEntries();
        if (isMounted) {
          setPortfolioEntries(entries);
        }
      } catch (err) {
        console.error(err);
      }
    };

    validateAdmin(); acquireEntries();

    return () => {
      isMounted = false;
    };
  }, [])

  const toggleUpdate = (e : React.MouseEvent<HTMLDivElement>) => {
    setId(e.currentTarget.id);
    console.log(id);
    setUpdateEntryVisible(true);
  }

  return (
    <>
        {newEntryVisible ? <NewPortfolioEntry toggleVisibility={setNewEntryVisible} setPortfolioEntries={setPortfolioEntries}/> : null}
        {updateEntryVisible ? <UpdatePortfolioEntry toggleVisibility={setUpdateEntryVisible} setPortfolioEntries={setPortfolioEntries} id={id}/> : null}
        
       {isAdmin ? <div className='ManageContent'>
            <div className='Title'>
                <h1>Manage Content</h1>
            </div>
            <div className='ContentGrid'>
              {
                portfolioEntries.map((entry : any, index : number) => (
                  <>
                      <div className="ContentContainer" key={index} id={entry._id} onClick={(e) => {toggleUpdate(e)}}>
                        <img src={entry.path} />
                      </div>
                  </>
                ))
              }
            </div>
            <button className="AddToPortfolio" onClick={() => {setNewEntryVisible(true)}}>Add To Portfolio</button>
        </div> : null}
    </>
  )
}

export default Admin;
