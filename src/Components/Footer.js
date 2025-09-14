const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        <p className="mb-6">Questions? Call 000-800-919-1743</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex flex-col space-y-3">
            <a href="#" className="hover:underline">FAQ</a>
            <a href="#" className="hover:underline">Investor Relations</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Speed Test</a>
          </div>
          
          <div className="flex flex-col space-y-3">
            <a href="#" className="hover:underline">Help Centre</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Cookie Preferences</a>
            <a href="#" className="hover:underline">Legal Notices</a>
          </div>
          
          <div className="flex flex-col space-y-3">
            <a href="#" className="hover:underline">Account</a>
            <a href="#" className="hover:underline">Ways to Watch</a>
            <a href="#" className="hover:underline">Corporate Information</a>
            <a href="#" className="hover:underline">Only on Netflix</a>
          </div>
          
          <div className="flex flex-col space-y-3">
            <a href="#" className="hover:underline">Media Centre</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
        </div>
        
        <p className="text-sm">Netflix India</p>
        <p className="text-sm mt-4">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <a href="#" className="text-blue-500 hover:underline">Learn more.</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;