import React from "react";

import styles from "./index.module.css";
import Article from "@/components/Article";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <div className={`${styles.page} ${styles.home}`}>
      <Carousel />
      <div className={styles.center}>
        <Article />
      </div>
    </div>
  );
}
