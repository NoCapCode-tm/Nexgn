import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MemberSidebar from "../components/MemberSidebar";
import MemberTopbar from "../components/MemberTopbar";
import MemberStatCard from "../components/MemberStatCard";
import DocumentRow from "../../admin/components/DocumentRow";
import MemberMobileNavbar from "../components/MemberMobileNavbar";
import { Search, Bell, UserCircle, Menu } from "lucide-react";
import { useWindowWidth } from "../components/useWindowWidth";
import "../css/MemberDashboard.css"; // Scoped CSS Overrides

const stats = [
  {
    label: "Total Documents",
    value: "128",
    trend: "12%",
    trendUp: true,
  },
  {
    label: "Pending",
    value: "32",
    trend: "8%",
    trendUp: true,
    trendColor: "green",
  },
  {
    label: "Signed",
    value: "84",
    trend: "18%",
    trendUp: true,
  },
  {
    label: "Expired",
    value: "12",
    trend: "3%",
    trendUp: false,
  },
];

const documents = [
  {
    title: "Project Proposal",
    note: "Send it to client",
    signers: "Jane Doe",
    signedAt: "—",
    owner: "Me",
    status: "Pending",
  },
  {
    title: "Policy Acknowledgement Form",
    note: "Please sign before 12th",
    signers: "Charlie Brown",
    signedAt: "April 10, 2026",
    owner: "Me",
    status: "Signed",
  },
  {
    title: "NDA Agreement",
    note: "Review and approve",
    signers: "Bob Jones",
    signedAt: "April 08, 2026",
    owner: "Me",
    status: "Signed",
  },
  {
    title: "NDA Agreement",
    note: "Review and approve",
    signers: "Bob Jones",
    signedAt: "—",
    owner: "Me",
    status: "Expired",
  },
  {
    title: "NDA Agreement",
    note: "NDA with vendor...",
    signers: "Alice Smith",
    signedAt: "—",
    owner: "Me",
    status: "Pending",
  },
];

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 3"/>
    <path d="M12 17V7M12 7L7 12M12 7L17 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function MemberDashboard() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { isMobile } = useWindowWidth();
  const navigate = useNavigate();

  return (
    <div className="layout member-theme">
      {mobileNavOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Responsive Layout */}
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
          <span className="mobile-topbar__title">Dashboard</span>
          <div className="mobile-topbar__icons">
            <button className="topbar__icon-btn mobile-topbar__search-btn">
              <Search size={18} color="#FF0915" strokeWidth={1.5} />
            </button>
            <button className="topbar__icon-btn">
              <Bell size={18} color="#FF0915" strokeWidth={1.5} />
            </button>
            <button className="topbar__icon-btn">
              <UserCircle size={20} color="#FF0915" strokeWidth={1.5} />
            </button>
          </div>
        </header>

        <MemberTopbar />

        <div className="mobile-page-header">
          <div className="mobile-page-header__row">
            <div>
              <h1 className="topbar__title">Dashboard</h1>
              <p className="topbar__sub">Overview Of your document signing activity</p>
            </div>
            <button className="topbar__upload tablet-upload-btn" onClick={() => navigate("/member-sign-yourself")}>
              <UploadIcon />
              Upload Doc
            </button>
          </div>
          <div className="mobile-page-header__divider" />
        </div>

        <section className="stats-grid">
          {stats.slice(0, isMobile ? 2 : 4).map((s, idx) => {
            const displayTrendColor = isMobile && idx === 0 ? "red" : s.trendColor;
            return <MemberStatCard key={s.label} {...s} trendColor={displayTrendColor} />;
          })}
        </section>

        <div className="mobile-cta-row">
          <button className="mobile-cta mobile-cta--primary" onClick={() => navigate("/member-sign-yourself")}>
            Sign Yourself
          </button>
          <button className="mobile-cta mobile-cta--outline" onClick={() => navigate("/member-request-signature")}>
            Request Signature
          </button>
        </div>

        <section className="docs-section">
          <h2 className="docs-section__title">Recent Documents</h2>
          <div className="docs-table__header desktop-table-header">
            <span>Title</span>
            <span>Note</span>
            <span>Signers</span>
            <span>Signed At</span>
            <span>Owner</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          <div className="docs-table">
            {documents.map((doc, idx) => (
              <DocumentRow key={idx} {...doc} />
            ))}
          </div>
        </section>
      </div>
      <MemberMobileNavbar />
    </div>
  );
}
