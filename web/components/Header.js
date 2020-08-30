import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import SVG from "react-inlinesvg";
import styles from "./Header.module.css";
import HamburgerIcon from "./icons/Hamburger";

const Header = (props) => {
  const [showNav, setShowNav] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const hideMenu = () => setShowNav(false);
    router.events.on("routeChangeComplete", hideMenu);
    return () => {
      router.events.off("routeChangeComplete", hideMenu);
    };
  }, []);

  const handleMenuToggle = () => setShowNav(!showNav);

  const renderLogo = (logo) => {
    if (!logo || !logo.asset) {
      return null;
    }

    if (logo.asset.extension === "svg") {
      return <SVG src={logo.asset.url} className={styles.logo} />;
    }

    return <img src={logo.asset.url} alt={logo.title} className={styles.logo} />;
  };

  const { title = "Missing title", navItems, logo } = props;
  return (
    <div className={styles.root} data-show-nav={showNav}>
      <h1 className={styles.branding}>
        <Link
          href={{
            pathname: "/LandingPage",
            query: {
              slug: "/",
            },
          }}
          as="/"
          prefetch
        >
          <a title={title}>{renderLogo(logo)}</a>
        </Link>
      </h1>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          {navItems &&
            navItems.map((item) => {
              const { slug, title, _id } = item;
              const isActive =
                router.pathname === "/LandingPage" && router.query.slug === slug.current;
              return (
                <li key={_id} className={styles.navItem}>
                  <Link
                    href={{
                      pathname: "/LandingPage",
                      query: { slug: slug.current },
                    }}
                    as={`/${slug.current}`}
                    prefetch
                  >
                    <a data-is-active={isActive ? "true" : "false"}>{title}</a>
                  </Link>
                </li>
              );
            })}
        </ul>
        <button className={styles.showNavButton} onClick={handleMenuToggle}>
          <HamburgerIcon className={styles.hamburgerIcon} />
        </button>
      </nav>
    </div>
  );
};

export default Header;
