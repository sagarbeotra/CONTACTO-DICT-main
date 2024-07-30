import { deleteDoc, doc } from 'firebase/firestore';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import { db } from '../config/firebase';
import AddAndUpdateContact from './AddAndUpdateContact';
import useDisclouse from '../hooks/useDisclouse';
import { toast } from 'react-toastify';

const ContactCard = ({ contact }) => {
  const deleteContact = async (id) => {
    try {
      //deleteDoc-to delete a contact from database
      //passing a doc reference to delete
      //contactRef=collection(db,"contacts");
      await deleteDoc(doc(db, 'contacts', id));
      //using toastify package to show pop-up
      toast.success('Contact Deleted Successfully');
    } catch (error) {
      console.log(error);
    }
  };
  //creating custom hook so that not to type
  //isOpen,onOpen,onClose states again and again as in app.jsx
  const { isOpen, onOpen, onClose } = useDisclouse();
  return (
    <>
      <div
        key={contact.id}
        className="flex items-center justify-between rounded-lg bg-yellow p-2"
      >
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-5xl text-orange" />
          <div className="">
            <h1 className="font-medium">{contact.name}</h1>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            className="text-purple cursor-pointer"
            onClick={() => deleteContact(contact.id)}
          />
        </div>
      </div>
      <AddAndUpdateContact
        //contact as a prop passed bcz data to be shown in form before updating
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
