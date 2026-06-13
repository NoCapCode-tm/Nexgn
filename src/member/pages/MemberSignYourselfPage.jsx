import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MemberSidebar from "../components/MemberSidebar";
import MemberMobileNavbar from "../components/MemberMobileNavbar";
import MemberSignYourself from "../components/MemberSignYourself";
import { Search, Bell, UserCircle, Menu } from "lucide-react";
import { useWindowWidth } from "../components/useWindowWidth";
import "../../admin/css/Dashboard.css";
import "../css/MemberSignYourself.css";

export default function MemberSignYourselfPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { isMobile } = useWindowWidth();
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = location.pathname === '/member-request-signature' ? 'request' : 'sign';

  const handleTabChange = (tab) => {
    navigate(tab === 'request' ? '/member-request-signature' : '/member-sign-yourself');
  };

  return (
    <div className="layout member-theme member-sign-yourself-page">
      {mobileNavOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileNavOpen(false)} />
      )}
      
      <div className={`mobile-sidebar-wrapper ${mobileNavOpen ? "mobile-sidebar-wrapper--open" : ""}`}>
        <MemberSidebar />
      </div>
      
      <div className="desktop-sidebar-wrapper">
        <MemberSidebar />
      </div>

      <div className="main">
        {/* Mobile Navigation */}
        <header className="mobile-topbar">
          <button className="mobile-topbar__hamburger" onClick={() => {
            if (!isMobile) {
              setMobileNavOpen(true);
            }
          }}>
            <Menu size={22} color="#1a1a2e" />
          </button>
          <span className="mobile-topbar__title">Signers</span>
          <div className="mobile-topbar__icons">
            <button className="topbar__icon-btn mobile-topbar__search-btn" onClick={(e) => e.preventDefault()}>
              <Search size={18} color="#FF0915" strokeWidth={1.5} />
            </button>
            <button className="topbar__icon-btn" onClick={(e) => e.preventDefault()}>
              <Bell size={18} color="#FF0915" strokeWidth={1.5} />
            </button>
            <button className="topbar__icon-btn" onClick={(e) => e.preventDefault()}>
              <UserCircle size={20} color="#FF0915" strokeWidth={1.5} />
            </button>
          </div>
        </header>

        <div className="mobile-page-header">
          <h1 className="topbar__title">
            {activeTab === 'sign' ? 'Sign Yourself' : 'Create Signature Request'}
          </h1>
          <p className="topbar__sub">
            {activeTab === 'sign' ? 'Create and sign a document where you are the signer' : 'Send a document for signing or sign it yourself'}
          </p>
        </div>
        <hr className="mobile-header-divider" />

        <div className="topbar desktop-topbar">
          <div className="topbar__top-row">
            <div className="topbar__icons">
              <button className="topbar__icon-btn" aria-label="Search" onClick={(e) => e.preventDefault()}>
                <Search size={20} color="currentColor" strokeWidth={2} />
              </button>
              <button className="topbar__icon-btn" aria-label="Notifications" onClick={(e) => e.preventDefault()}>
                <Bell size={20} color="currentColor" strokeWidth={2} />
              </button>
              <button className="topbar__icon-btn" aria-label="Profile" onClick={(e) => e.preventDefault()}>
                <UserCircle size={20} color="currentColor" strokeWidth={2} />
              </button>
            </div>
          </div>
          <div className="topbar__bottom-row">
            <div>
              <div className="topbar__title">
                {activeTab === 'sign' ? 'Sign Yourself' : 'Create Signature Request'}
              </div>
              <div className="topbar__sub">
                {activeTab === 'sign' ? 'Create and sign a document where you are the signer' : 'Send a document for signing or sign it yourself'}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE TABS */}
        <div className="mobile-tabs-container">
          <button
            className={`tab-btn ${activeTab === 'sign' ? 'tab-btn--active' : 'tab-btn--inactive'}`}
            onClick={() => handleTabChange('sign')}
          >
            Sign Yourself
          </button>
          <button
            className={`tab-btn ${activeTab === 'request' ? 'tab-btn--active' : 'tab-btn--inactive'}`}
            onClick={() => handleTabChange('request')}
          >
            Request Signature
          </button>
        </div>

        <MemberSignYourself activeTab={activeTab} handleTabChange={handleTabChange} />

      </div>
      <MemberMobileNavbar />
    </div>
  );
}
