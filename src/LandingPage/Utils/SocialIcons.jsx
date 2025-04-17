import { FaLinkedin, FaInstagram, FaXTwitter, FaYoutube, FaTiktok, FaFacebook } from "react-icons/fa6"

const SocialIcons = () => {
  const socialLinks = [
    {
      icon: <FaLinkedin size={22} />,
      url: "https://www.linkedin.com/company/godigitalafrica/",
      label: "LinkedIn",
      hoverClass: "hover:bg-[#0077B5]",
      color: "#0077B5",
    },
    {
      icon: <FaXTwitter size={22} />,
      url: "https://x.com/GoAfricadigital",
      label: "X",
      hoverClass: "hover:bg-black",
      color: "#000",
    },
    {
      icon: <FaFacebook size={22} />,
      url: "https://web.facebook.com/AfricaGoDigital",
      label: "Facebook",
      hoverClass: "hover:bg-[#1877F2]",
      color: "#1877F2",
    },
    {
      icon: <FaInstagram size={22} />,
      url: "https://www.instagram.com/godigitalafrica.ke/",
      label: "Instagram",
      hoverClass: "hover:bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB]",
      color: "linear-gradient(45deg, #fd5949, #d6249f, #285AEB)",
    },
    {
      icon: <FaYoutube size={22} />,
      url: "https://www.youtube.com/@Godigitalafrica",
      label: "YouTube",
      hoverClass: "hover:bg-[#FF0000]",
      color: "#FF0000",
    },
  ]
  
  // Function to handle opening social media links
  const handleSocialClick = (url) => {
    // Check if we're on mobile to possibly open native apps
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Map for mobile deep links (could be expanded based on your needs)
    const deepLinks = {
      "linkedin.com": { ios: `linkedin://`, android: `linkedin://` },
      "instagram.com": { ios: `instagram://`, android: `instagram://` },
      "x.com": { ios: `twitter://`, android: `twitter://` },
      "facebook.com": { ios: `fb://`, android: `fb://` },
      "youtube.com": { ios: `youtube://`, android: `youtube://` }
    };
    
    // Try to open in native app first on mobile, fall back to browser
    if (isMobile) {
      // Find which platform the URL belongs to
      const platform = Object.keys(deepLinks).find(p => url.includes(p));
      
      if (platform) {
        const deepLink = /iPhone|iPad|iPod/i.test(navigator.userAgent) 
          ? deepLinks[platform].ios 
          : deepLinks[platform].android;
        
        // Try opening app first, with fallback to browser
        setTimeout(() => {
          window.location.href = url; // Fallback if app doesn't open
        }, 500);
        window.location.href = deepLink;
        return;
      }
    }
    
    // Default behavior: open in new tab
    window.open(url, '_blank');
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-6 md:mt-0">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          onClick={(e) => {
            e.preventDefault();
            handleSocialClick(social.url);
          }}
          aria-label={social.label}
          className={`
            relative group flex items-center justify-center 
            w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
            text-white transition-all duration-300
            hover:text-white hover:shadow-lg hover:-translate-y-1
            ${social.hoverClass}
          `}
        >
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: typeof social.color === "string" ? social.color : "currentColor",
              boxShadow: `0 0 20px ${typeof social.color === "string" ? social.color : "currentColor"}40`,
            }}
          ></span>
          
          <span className="relative z-10">{social.icon}</span>
          
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            {social.label}
          </span>
        </a>
      ))}
    </div>
  )
}

export default SocialIcons