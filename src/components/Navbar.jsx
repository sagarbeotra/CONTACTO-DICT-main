const Navbar = () => {
  return (
    //text in tailwind equivalent to text-size in css
    <div className="my-4 flex h-[60px] items-center justify-center gap-2 rounded-lg bg-white text-xl font-medium">
      <img src="/fire.svg" alt="firebase" />
      <h1>Firebase Contact App</h1>
    </div>
  );
};

export default Navbar;
