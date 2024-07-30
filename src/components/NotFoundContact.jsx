const NotFoundContact = () => {
  return (
    //h-screen in tailwindCSS means height=100vh in css
    <div className="flex h-[80vh] items-center justify-center gap-4">
      <div>
        <img src="/Handscontact.png" alt="No-contacts" />
      </div>
      <h3 className="text-2xl font-semibold text-white">Contact Not Found</h3>
    </div>
  );
};

export default NotFoundContact;
