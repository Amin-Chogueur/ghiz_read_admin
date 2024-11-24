"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import styles from "./header.module.css";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();
  const pathName = usePathname();
  async function logout() {
    try {
      const res = await axios.get("/api/logout");
      if (res.status === 200) {
        route.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      window.location.reload();
    }
  }
  return (
    <header className={styles.header}>
      <h2 className="text-lg text-primary font-bold">Ghiz Read</h2>
      <nav className={styles.largeScreenLinks}>
        <ul>
          <li>
            <Link
              className={pathName === "/" ? "bg-orange-700" : "bg-primary"}
              href={"/"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={pathName === "/books" ? "bg-orange-700" : "bg-primary"}
              href={"/books"}
            >
              Books
            </Link>
          </li>
          <li>
            <Link
              className={
                pathName === "/category" ? "bg-orange-700" : "bg-primary"
              }
              href={"/category"}
            >
              category
            </Link>
          </li>
        </ul>
      </nav>
      <button className={styles.logoutBtn} onClick={logout}>
        Logout
      </button>
      <nav
        className={`${isOpen ? styles.navBurgerOpen : styles.navBurgerClose}`}
      >
        <ul>
          <li className={pathName === "/" ? "bg-orange-700" : "bg-primary"}>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link
              className={pathName === "/books" ? "bg-orange-700" : "bg-primary"}
              href={"/books"}
              onClick={() => setIsOpen(false)}
            >
              Books
            </Link>
          </li>
          <li>
            <Link
              className={
                pathName === "/category" ? "bg-orange-700" : "bg-primary"
              }
              href={"/category"}
              onClick={() => setIsOpen(false)}
            >
              category
            </Link>
          </li>
          <button className={styles.logoutBtnBurger} onClick={logout}>
            Logout
          </button>
        </ul>
      </nav>

      <div className={styles.contrelorBurgerMenu}>
        {isOpen ? (
          <span className={styles.closeMenu} onClick={() => setIsOpen(false)}>
            ✖
          </span>
        ) : (
          <GiHamburgerMenu
            className={styles.openMenu}
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
