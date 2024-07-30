//bg-red-500 is a Tailwind CSS utility class.
//Tailwind CSS provides utility classes for various styles such as background color, margin, padding, font size, and more. In this case, bg-red-500 sets the background color of the <div> to a shade of red.
//bg- Prefix: This indicates that the class is setting a background color.
//red-500: This is the color and shade. Tailwind CSS uses a scale from 100 to 900 to define shades of a color, with 500 being a mid-range shade.
//AUTOMATIC CLASS SORTING WITH PRETTIER-with prettier plugin,the order of the classes remains same accd to the recommended class ordering
//FIRESTORE-firebase no-sql database where database can be managed by frontend
//while adding collection in database,document Auto ID(one data point created)given so that frontend does not fetch an empty array
//and some data is returned
import Navbar from './components/Navbar';
import { FiSearch } from 'react-icons/fi';
import { FaCirclePlus } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebase';
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse';
//to show successful addition/updation,we are showing pop-up at bottom using toastify package of react
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './components/NotFoundContact';
const App = () => {
  //firebase se data fetch, to be displayed
  const [contacts, setContacts] = useState([]);
  //custom hook creation to return isOpen,onOpen,onClose
  const { isOpen, onOpen, onClose } = useDisclouse();
  //The await operator is used to wait for a promise to settle
  //An async function is a function that returns a promise.
  //network call,(fetch data)
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, 'contacts');
        //to reload the server in real time and fast,use onSnapshot function
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);
  const filterContacts = (e) => {
    const Value = e.target.value;
    const contactsRef = collection(db, 'contacts');
    //to reload the server in real time and fast,use onSnapshot function
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(Value.toLowerCase())
      );
      setContacts(filteredContacts);
      return filteredContacts;
    });
  };
  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
              type="text"
              onChange={filterContacts}
              //whatever value is given multiply by 4 to get css value so height=40px
              //flex-grow= The item will grow to fill the available space
              className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>
          <div>
            <FaCirclePlus
              onClick={onOpen}
              className="cursor-pointer text-5xl text-white"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
