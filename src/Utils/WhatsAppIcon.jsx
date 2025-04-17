import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import whatsappLogo from "../assets/whatsapp-logo.png";
import logo from "../assets/logo.png";

const WhatsAppIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isBubbleHidden, setIsBubbleHidden] = useState(false);
  const phoneNumber = "254720222249";

  useEffect(() => {
    const savedState = localStorage.getItem("whatsappBubbleHidden");
    if (savedState) {
      setIsBubbleHidden(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("whatsappBubbleHidden", JSON.stringify(isBubbleHidden));
  }, [isBubbleHidden]);

  const toggleChat = () => {
    setIsOpen(!isOpen); 
  };
  const hideBubble = () => {
    setIsBubbleHidden(true);
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
      setMessage("");
    } else {
      window.open(`https://wa.me/${phoneNumber}`, "_blank");
    }
    setIsOpen(false);
  };

  const WhatsAppSVG = () => <img src={whatsappLogo} alt="" className="h-12" />;

  if (isBubbleHidden) {
    return (
      <button
        onClick={() => setIsBubbleHidden(false)}
        className="fixed bottom-4 right-4 z-[9000] bg-transparent text-white p-0 rounded-full shadow-xl hover:bg-[#128C7E] transition-all hidden lg:block"
        aria-label="Show WhatsApp chat"
      >
        <WhatsAppSVG />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-[9000] flex flex-col items-end hidden lg:block">
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 w-[300px] md:w-[320px] lg:w-[350px] animate-fade-in-up">
          <div className="bg-[#128C7E] p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3 shadow-md">
                <img src={logo} alt="" className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">WhatsApp Chat</h3>
                <p className="text-green-100 text-xs">Typically replies within an hour</p>
              </div>
            </div>
            <button 
              onClick={toggleChat} 
              className="text-white hover:text-green-200 transition-colors p-1 rounded-full hover:bg-[#0E6E5C]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-[#ECE5DD] p-4 h-72 overflow-y-auto">
            <div className="bg-white p-3.5 rounded-xl rounded-tl-none shadow-sm max-w-[80%] mb-4">
              <p className="text-gray-800 text-sm leading-relaxed">👋 Hi there! How can we help you today?</p>
              <p className="text-gray-400 text-xs text-right mt-2">10:30 AM</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-[#F0F0F0] flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."  
              className="flex-1 border border-gray-300 rounded-full py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#25D366] text-sm font-medium text-black bg-white"
            />
            <button
              type="submit"
              className="bg-[#25D366] text-white p-2.5 rounded-full hover:bg-[#128C7E] transition-colors"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={toggleChat}
        className="text-white p-0 rounded-full shadow-xl hover:bg-[#128C7E] transition-all flex items-center justify-center z-[9999]"
        aria-label="Toggle WhatsApp chat"
      >
        <WhatsAppSVG />
      </button>
    </div>
  );
};

export default WhatsAppIcon;
