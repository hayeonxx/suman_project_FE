"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const NAV_ITEMS = [
  {
    label: "회사소개",
    href: "/company/ceo",
    submenu: [
      { label: "CEO 인사말", href: "/company/ceo" },
      { label: "기업 비전", href: "/company/vision" },
      { label: "연혁", href: "/company/history" },
      { label: "조직도", href: "/company/org" },
      { label: "CI", href: "/company/ci" },
      { label: "오시는 길", href: "/company/location" },
    ],
  },
  {
    label: "사업분야",
    href: "/business/service",
    submenu: [
      { label: "서비스 소개", href: "/business/service" },
      { label: "제품 소개", href: "/business/product" },
    ],
  },
  {
    label: "인재채용",
    href: "/careers/philosophy",
    submenu: [
      { label: "인재상", href: "/careers/philosophy" },
      { label: "채용공고", href: "/careers/notice" },
    ],
  },
  {
    label: "고객지원",
    href: "/support/faq",
    submenu: [
      { label: "FAQ", href: "/support/faq" },
      { label: "문의하기", href: "/support/contact" },
    ],
  },
];

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const isHovered = hoveredIndex !== null;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDir(currentScrollY > lastScrollY ? "down" : "up");
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  

  const isAtTop = lastScrollY === 0;
  const isVisible = scrollDir === "up" || isHovered;
  const isSolid = isHovered || (!isAtTop && scrollDir === "up"); 

  const bgColor = isSolid ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)";
  const textColor = isSolid ? "text-black" : "text-white";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full z-50"
        onMouseLeave={() => setHoveredIndex(null)}
        initial={false}
        animate={{
          y: isVisible ? 0 : -100,
          backgroundColor: bgColor,
          height: isHovered ? 120 : 64,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >

        {/* 메인 메뉴 영역 */}
        <div className={`w-full mx-auto px-[120px] py-3 flex justify-between items-center text-lg font-medium ${textColor}`}>
  
          {/* 로고 */}
          <div className = "flex-none">
            <Link href="/">
              <Image
                src="/images/logo_suman.png"
                alt="회사 로고"
                width={60}
                height={60}
                className="cursor-pointer"
              />
            </Link>
          </div>
          {/* 메인 메뉴 */}
          <nav className="flex flex-1 justify-center space-x-40 xl:space-x-40 lg:space-x-24 tracking-wide">

            {NAV_ITEMS.map((item, index) => (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredIndex(index)}
                className="hover:font-semibold"
              >
                <Link href={item.href}>
                  {item.label}
                </Link>
              </div>

            ))}
          </nav>

          {/* 언어 변경 */}
          <div className="flex-none flex items-center h-full">
            <LanguageSwitcher />
          </div>
        </div>

      {/* 서브 메뉴 */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="submenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full border-t border-gray-200 bg-white z-40"
          >
            <div className="max-w-full mx-auto px-[120px] py-4 flex justify-between items-start">
              <div className="w-[120px]" />

              <div className="flex justify-center flex-1 space-x-19 text-base text-gray-600 tracking-wide">
                {NAV_ITEMS.map((mainItem) => (
                  <div key={mainItem.label} className="flex flex-col items-start min-w-[150px]">
                    {mainItem.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="hover:font-medium py-1"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <div className="w-[60px]" /> 
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </motion.div>
    </AnimatePresence>
  );
}
