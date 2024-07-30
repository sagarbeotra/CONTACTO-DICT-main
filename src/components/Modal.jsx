/*Modal-library of react which is a dialog pop-up box where we will
create a form to save contacts on the backend*/
import { RxCross1 } from 'react-icons/rx';
import { createPortal } from 'react-dom';
//children-refers to the content inside modal.jsx
const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    //we should use portals while creating modals bcx of
    //relative/absolute positions in css,problem is faced
    //using portals,the modal is rendered in doc under a separate div id
    //if not using portals,then it would be rendered in div id root only in index.html
    //and due to certain properties of absolute/relative,some problems would be faced
    <>
      {isOpen && (
        //blur the background using backdrop-blur
        <div
          //display:grid;
          //place-items:center;
          className="absolute top-0 z-40 grid h-screen w-screen place-items-center backdrop-blur"
        >
          <div className="relative z-50 m-auto min-h-[200px] min-w-[80%] bg-white p-4">
            <div className="flex justify-end">
              <RxCross1 onClick={onClose} className="text-xl" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal-root')
  );
};
export default Modal;
