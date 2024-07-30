import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import Modal from './Modal';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
//to ensure that empty contacts data is not sent on backend,we use yup package
import * as Yup from 'yup';
const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
});
const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  //function to handle data and send to backend
  const AddContact = async (contact) => {
    try {
      const contactRef = collection(db, 'contacts');
      //addDoc function to send data
      await addDoc(contactRef, contact);
      onClose();
      toast.success('Contact Added Successfully');
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      //jo bhi contact hoga firebase se check hoga and then update
      const contactRef = doc(db, 'contacts', id);
      //addDoc function to send data
      await updateDoc(contactRef, contact);
      onClose();
      toast.success('Contact Updated Successfully');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    //create form,add data and send to backend/firebase
    //external library formik used to handle form inputs
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          //formik supports yup package
          //to display error message,errormessage tag is used
          validationSchema={contactSchemaValidation}
          //takes initial values input
          initialValues={
            isUpdate
              ? { name: contact.name, email: contact.email }
              : { name: '', email: '' }
          }
          //on submitting,data to be sent to backend
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateContact(values, contact.id) : AddContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border"></Field>
              <div className="text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name="email" className="h-10 border"></Field>
              <div className="text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button className="self-end rounded-md border bg-orange px-3 py-1.5">
              {isUpdate ? 'Update' : 'Add'} contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
