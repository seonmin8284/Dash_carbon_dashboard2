import React, { useState, createContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  ShoppingCart,
  MessageCircle,
  Info,
  Globe,
  FileText,
  Target,
  ChevronDown,
} from "lucide-react";

export const SidebarContext = createContext({ sidebarTab: null });

const Layout = ({ children }) => {
  const location = useLocation();
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [sidebarTab, setSidebarTab] = useState("chat");
  const [strategyDropdownOpen, setStrategyDropdownOpen] = useState(false);

  const navItems = [
    { path: "/", icon: Home, label: "ESG 대시보드" },
    { path: "/dashboard", icon: BarChart3, label: "현황 대시보드" },
    { path: "/report", icon: FileText, label: "AI 리포트 생성기" },
    { path: "/info", icon: Info, label: "프로그램 정보" },
  ];

  // ReportGenerator 페이지에서는 사이드바를 숨김
  const showSidebar = location.pathname !== "/report";

  // 탭 버튼 클릭 핸들러
  const handleSidebarTab = (tab) => {
    setSidebarTab((prev) => (prev === tab ? null : tab));
  };

  return (
    <SidebarContext.Provider value={{ sidebarTab }}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-lg hidden md:block">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <Globe className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">
                탄소배출권 통합 관리 시스템
              </h1>
            </div>

            <nav className="space-y-2">
              {/* ESG 대시보드 */}
              <Link
                to="/"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === "/" 
                    ? "bg-blue-100 text-blue-900" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">ESG 대시보드</span>
              </Link>

              {/* 현황 대시보드 */}
              <Link
                to="/dashboard"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === "/dashboard" 
                    ? "bg-blue-100 text-blue-900" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span className="font-medium">현황 대시보드</span>
              </Link>

              {/* 전략분석 드롭다운 */}
              <div className="relative">
                <button
                  onMouseEnter={() => setStrategyDropdownOpen(true)}
                  onMouseLeave={() => setStrategyDropdownOpen(false)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5" />
                    <span className="font-medium">전략 분석</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      strategyDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {strategyDropdownOpen && (
                  <div
                    className="absolute left-0 right-0 top-full bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    onMouseEnter={() => setStrategyDropdownOpen(true)}
                    onMouseLeave={() => setStrategyDropdownOpen(false)}
                  >
                    <Link
                      to="/strategy-analysis"
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Target className="h-5 w-5" />
                      <span className="font-medium">감축 전략</span>
                    </Link>
                    <Link
                      to="/strategy"
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span className="font-medium">구매 전략</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* 나머지 메뉴들 */}
              {navItems.slice(2).map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path 
                        ? "bg-blue-100 text-blue-900" 
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg md:hidden">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <Globe className="h-8 w-8" />
                  <h1 className="text-xl font-bold">
                    탄소배출권 통합 관리 시스템
                  </h1>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile Navigation */}
          <nav className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
            <div className="flex justify-around py-2">
              {/* ESG 대시보드 */}
              <Link
                to="/"
                className={`flex flex-col items-center py-2 px-3 text-xs ${
                  location.pathname === "/" 
                    ? "text-blue-600" 
                    : "text-gray-500"
                }`}
              >
                <Home className="h-5 w-5 mb-1" />
                <span>ESG 대시보드</span>
              </Link>

              {/* 현황 대시보드 */}
              <Link
                to="/dashboard"
                className={`flex flex-col items-center py-2 px-3 text-xs ${
                  location.pathname === "/dashboard" 
                    ? "text-blue-600" 
                    : "text-gray-500"
                }`}
              >
                <BarChart3 className="h-5 w-5 mb-1" />
                <span>현황 대시보드</span>
              </Link>

              {/* 모바일 전략분석 드롭다운 */}
              <div className="relative">
                <button
                  onClick={() => setStrategyDropdownOpen(!strategyDropdownOpen)}
                  className="flex flex-col items-center py-2 px-3 text-xs text-gray-500"
                >
                  <Target className="h-5 w-5 mb-1" />
                  <span>전략 분석</span>
                </button>

                {strategyDropdownOpen && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                    <Link
                      to="/strategy-analysis"
                      className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 text-gray-600 text-xs"
                      onClick={() => setStrategyDropdownOpen(false)}
                    >
                      <Target className="h-4 w-4" />
                      <span>감축 전략</span>
                    </Link>

                    <Link
                      to="/strategy"
                      className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 text-gray-600 text-xs"
                      onClick={() => setStrategyDropdownOpen(false)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>구매 전략</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* 나머지 메뉴들 */}
              {navItems.slice(2).map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center py-2 px-3 text-xs ${
                      location.pathname === item.path 
                        ? "text-blue-600" 
                        : "text-gray-500"
                    }`}
                  >
                    <Icon className="h-5 w-5 mb-1" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Main Content */}
          <main className="w-full px-4 py-6 pb-20 md:pb-6 transition-all duration-300">
            {children}
          </main>

          {/* Floating Chat Button */}
          <div className="fixed bottom-20 right-4 z-50">
            <button
              onClick={() => {
                // 채팅 페이지로 이동 또는 채팅 모달 열기
                window.location.href = "/chatbot";
              }}
              className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              title="AI 챗봇"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Layout;