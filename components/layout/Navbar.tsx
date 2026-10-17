"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { navItems } from "./nav-data";
import { products } from "@/data/products";
import styles from "./Navbar.module.css";

const MAX_SUGGESTIONS = 8;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const { totalItems } = useQuoteCart();
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLFormElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.tags?.some((t) => t.toLowerCase().includes(q)),
        )
      : products;
    return list.slice(0, MAX_SUGGESTIONS);
  }, [query]);

  function goToProduct(category: string, slug: string) {
    setSuggestionsOpen(false);
    setQuery("");
    router.push(`/products/${category}/${slug}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    setSuggestionsOpen(false);
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
  }

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
    setMobileSection(null);
    setSuggestionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setOpen(false);
        setSuggestionsOpen(false);
      }
    }
    function onClick(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
      if (!searchRef.current?.contains(event.target as Node)) setSuggestionsOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/" || pathname.startsWith("/about");
    return pathname.startsWith(href);
  }

  function hoverOpen(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }

  function hoverClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner} ref={navRef}>
        <Link href="/" className={styles.logo} aria-label="GiantzFly home">
          <span className={styles.logoTop}>
            <img
              src="/logo.jpeg"
              alt=""
              aria-hidden="true"
              width={953}
              height={560}
              className={styles.logoMark}
            />
          </span>
                      <span className={styles.logoName}>GiantzFly Exim LLP</span>

          <span className={styles.logoDivider} aria-hidden="true" />
          <span className={styles.logoTagline}>Connecting Global Markets</span>
        </Link>

        <div className={styles.navRight}>
        <form
          className={styles.searchRow}
          onSubmit={handleSearch}
          role="search"
          ref={searchRef}
        >
          <div className={styles.searchBox}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search products, spices, dry fruits…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSuggestionsOpen(true)}
              aria-label="Search products"
              autoComplete="off"
            />
            {suggestionsOpen && (
              <div className={styles.suggestions} role="listbox">
                {suggestions.length === 0 ? (
                  <p className={styles.noSuggestions}>No products found.</p>
                ) : (
                  suggestions.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={styles.suggestionItem}
                      role="option"
                      onClick={() => goToProduct(p.category, p.slug)}
                    >
                      <span className={styles.suggestionName}>{p.name}</span>
                      <span className={styles.suggestionMeta}>{p.origin}</span>
                    </button>
                  ))
                )}
              </div>
            )}
            <button type="submit" className={styles.searchBtn} aria-label="Search">
              <Search size={16} aria-hidden="true" />
            </button>
          </div>
        </form>

        <div className={styles.navBottomRow}>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const expanded = openMenu === item.label;
            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.link} ${active ? styles.active : ""}`}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <div
                key={item.href}
                className={styles.navItem}
                onMouseEnter={() => hoverOpen(item.label)}
                onMouseLeave={hoverClose}
              >
                <Link
                  href={item.href}
                  className={`${styles.link} ${styles.linkWithMenu} ${
                    active ? styles.active : ""
                  }`}
                  aria-expanded={expanded}
                  aria-haspopup="true"
                  onFocus={() => hoverOpen(item.label)}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`${styles.chev} ${expanded ? styles.chevOpen : ""}`}
                    aria-hidden="true"
                  />
                </Link>

                <div
                  className={`${styles.dropdown} ${expanded ? styles.dropdownOpen : ""}`}
                  role="menu"
                  aria-label={item.label}
                >
                  <div className={styles.dropdownGrid}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={styles.dropdownLink}
                        role="menuitem"
                      >
                        <strong>{child.label}</strong>
                        <small>{child.note}</small>
                      </Link>
                    ))}
                  </div>
                  <Link href={item.href} className={styles.dropdownAll}>
                    View {item.label.toLowerCase()} overview
                  </Link>
                </div>
              </div>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <Link href="/quote-cart" className={styles.quoteBtn}>
            Quote Cart
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </Link>
          <button
            className={styles.menuToggle}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        </div>
        </div>
      </div>

      {open && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileInner}>
            {navItems.map((item) =>
              item.children ? (
                <div key={item.href} className={styles.mobileGroup}>
                  <button
                    type="button"
                    className={styles.mobileGroupBtn}
                    aria-expanded={mobileSection === item.label}
                    onClick={() =>
                      setMobileSection((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`${styles.chev} ${
                        mobileSection === item.label ? styles.chevOpen : ""
                      }`}
                    />
                  </button>
                  {mobileSection === item.label && (
                    <div className={styles.mobileSublist}>
                      <Link href={item.href} className={styles.mobileSublink}>
                        {item.label} overview
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={styles.mobileSublink}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileLink} ${
                    isActive(item.href) ? styles.activeMobile : ""
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link href="/quote-cart" className={styles.mobileCTA}>
              Quote Cart {totalItems > 0 ? `(${totalItems})` : ""}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
