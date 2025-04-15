import { FaLinkedin, FaInstagram, FaXTwitter, FaYoutube, FaTiktok } from "react-icons/fa6"

const SocialIcons = () => {
  const socialLinks = [
    {
      icon: <FaLinkedin size={22} />,
      url: "#",
      label: "LinkedIn",
      hoverClass: "hover:bg-[#0077B5]",
      color: "#0077B5",
    },
    {
      icon: <FaInstagram size={22} />,
      url: "#",
      label: "Instagram",
      hoverClass: "hover:bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB]",
      color: "linear-gradient(45deg, #fd5949, #d6249f, #285AEB)",
    },
    {
      icon: <FaXTwitter size={22} />,
      url: "#",
      label: "Twitter",
      hoverClass: "hover:bg-black",
      color: "#000",
    },
    {
      icon: <FaYoutube size={22} />,
      url: "#",
      label: "YouTube",
      hoverClass: "hover:bg-[#FF0000]",
      color: "#FF0000",
    },
    {
      icon: <FaTiktok size={22} />,
      url: "#",
      label: "TikTok",
      hoverClass: "hover:bg-black",
      color: "#000",
    },
  ]

  return (
    <div className="flex items-center justify-center gap-3 mt-6 md:mt-0">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
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

