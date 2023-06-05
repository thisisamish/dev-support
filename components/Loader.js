const Loader = ({ show }) => {
  return show ? (
    <div className="animate-spin rounded-full border-blue-300 border-t-blue-500 border-8 h-8 w-8"></div>
  ) : null;
};

export default Loader;
