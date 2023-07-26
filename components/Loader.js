const Loader = ({ show }) => {
  return show ? (
    <div className="animate-spin rounded-full border-blue-300 border-t-blue-500 border-8 h-8 w-8 md:max-w-4xl mx-4 md:mx-auto"></div>
  ) : null;
};

export default Loader;
