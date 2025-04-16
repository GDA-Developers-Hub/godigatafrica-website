import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  User,
  MessageCircle,
  NotebookPen,
  FileText,
  Settings,
  LogOut,
  Menu,
  Trophy,
  Briefcase,
  Newspaper,
  Send,
  Mail,
  Users,
  BookOpen,
  MessageSquare,
  Inbox,
  Layers,
  UserPlus,
  UserCircle,
} from "lucide-react";
import "../Styles/sidebar.css";

export default function AdminSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const largeScreen = window.innerWidth >= 1024;
      setIsLargeScreen(largeScreen);
      
      // Automatically close mobile sidebar on larger screens
      if (largeScreen) {
        setIsMobileOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsMobileOpen((prev) => !prev);
  const handleLinkClick = () => {
    setIsMobileOpen(false);
    if (isLargeScreen) {
      setIsExpanded(false);
    }
  };
  const handleLogout = () => console.log("Logging out...");

  const menuItems = [
    { 
      to: "dashboard", 
      icon: <Home className="h-5 w-5 ml-3" style={{color: '#3b82f6'}}/>, 
      label: "Dashboard" 
    },
    { 
      to: "agent", 
      icon: <UserCircle className="h-5 w-5 ml-3" style={{color: '#f43f5e'}}/>, 
      label: "Agent Management" 
    },
    { 
      to: "messages", 
      icon: <MessageCircle className="h-5 w-5 ml-3" style={{color: '#10b981'}}/>, 
      label: "Messages"
    },
    { 
      to: "employee", 
      icon: <UserPlus className="h-5 w-5 ml-3" style={{color: '#f43f5e'}}/>,
      label: "Employee Management"
    },
    { 
      to: "proposals", 
      icon: <NotebookPen className="h-5 w-5 ml-3" style={{color: '#f43f5e'}}/>, 
      label: "Proposals" 
    },
    { 
      to: "blog", 
      icon: <Newspaper className="h-5 w-5 ml-3" style={{color: '#6366f1'}}/>, 
      label: "Blog" 
    },
    { 
      to: "news", 
      icon: <Send className="h-5 w-5 ml-3" style={{color: '#8b5cf6'}}/>, 
      label: "News" 
    },
    { 
      to: "applications", 
      icon: <Inbox className="h-5 w-5 ml-3" style={{color: '#f97316'}}/>, 
      label: "Job Applications" 
    },
    { 
      to: "subscribers", 
      icon: <Mail className="h-5 w-5 ml-3" style={{color: '#14b8a6'}}/>, 
      label: "Subscribers" 
    },
    { 
      to: "newsletter", 
      icon: <Layers className="h-5 w-5 ml-3" style={{color: '#ef4444'}}/>, 
      label: "Newsletter Admin" 
    },
    { 
      to: "reviews", 
      icon: <MessageSquare className="h-5 w-5 ml-3" style={{color: '#22c55e'}}/>, 
      label: "Reviews" 
    },
    { 
      to: "case-studies", 
      icon: <BookOpen className="h-5 w-5 ml-3" style={{color: '#a855f7'}}/>, 
      label: "Case Studies" 
    },
    // { 
    //   to: "team", 
    //   icon: <Users className="h-5 w-5 ml-3" style={{color: '#0ea5e9'}}/>, 
    //   label: "Team" 
    // },
    { 
      to: "consultations", 
      icon: <FileText className="h-5 w-5 ml-3" style={{color: '#f59e0b'}}/>, 
      label: "Consultations" 
    },
    { 
      to: "awards", 
      icon: <Trophy className="h-5 w-5 ml-3" style={{color: '#d946ef'}}/>, 
      label: "Awards" 
    },
    { 
      to: "careers", 
      icon: <Briefcase className="h-5 w-5 ml-3" style={{color: '#6d28d9'}}/>, 
      label: "Careers" 
    },
    { 
      to: "admins", 
      icon: <User className="h-5 w-5 ml-3" style={{color: '#ec4899'}}/>, 
      label: "Admins" 
    },
    { 
      to: "settings", 
      icon: <Settings className="h-5 w-5 ml-3" style={{color: '#64748b'}}/>, 
      label: "Settings" 
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button - Always Visible */}
      <button 
        className="fixed top-4 left-4 z-30 lg:hidden text-gray-400 bg-gray-800 p-2 rounded-full shadow-lg" 
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`h-screen flex flex-col justify-between bg-gray-900 text-gray-200 border-r border-gray-800 overflow-auto shadow-xl fixed lg:relative transition-all duration-300 z-20 
          ${isMobileOpen || isExpanded ? "w-[250px]" : "w-[80px]"} 
          ${isMobileOpen ? "left-0" : "-left-[80px] lg:left-0"}`}
        onMouseEnter={() => isLargeScreen && setIsExpanded(true)}
        onMouseLeave={() => isLargeScreen && setIsExpanded(false)}
      >
        {/* Sidebar Menu */}
        <div className="flex flex-1 flex-col justify-between">
          <ul className="flex flex-col mt-5 space-y-2">
            {/* Sidebar Title */}
            <li className="justify-center text-xl font-bold hidden items-center lg:flex mb-4 px-3">
              <LayoutDashboard className="text-3xl text-cyan-400 animate-pulse mr-2" />
              {isExpanded && <h4>DASHBOARD</h4>}
            </li>

            {menuItems.map(({ to, icon, label }) => {
              const isActive = location.pathname === to; 

              return (
                <li key={to} className="group relative">
                  <Link
                    to={to} 
                    onClick={handleLinkClick}
                    className={`flex items-center h-12 px-3 rounded-lg transition-all duration-300 ${
                      isActive ? "bg-cyan-700 text-white" : "hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <span className="flex-shrink-0 w-10">{icon}</span>
                    <span className={`ml-3 ${isMobileOpen || isExpanded ? 'block' : 'hidden lg:hidden'}`}>
                      {label}
                    </span>
                    {!(isMobileOpen || isExpanded) && (
                      <span className="bg-gray-800 rounded-md text-sm text-white -translate-y-1/2 absolute group-hover:opacity-100 left-full opacity-0 px-3 py-1 top-1/2 transform">
                        {label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}

            {/* Logout Button */}
            <li className="group mt-auto relative">
              <Link 
                to="logout" 
                onClick={handleLogout}  
                className="flex h-12 rounded-lg text-left w-full duration-300 hover:bg-gray-800 hover:text-white items-center px-3 transition-all"
              >
                <span className="flex-shrink-0 w-10">
                  <LogOut className="h-5 w-5 ml-3" style={{color: '#ef4444'}} />
                </span>
                <span className={`ml-3 ${isMobileOpen || isExpanded ? 'block' : 'hidden lg:hidden'}`}>
                  Logout
                </span>
                {!(isMobileOpen || isExpanded) && (
                  <span className="bg-gray-800 rounded-md text-sm text-white -translate-y-1/2 absolute group-hover:opacity-100 left-full opacity-0 px-3 py-1 top-1/2 transform">
                    Logout
                  </span>
                )}
              </Link>       
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}