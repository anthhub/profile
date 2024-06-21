import React, { useEffect, useState, useRef } from "react";
import styles from "./index.module.css";

export default function Tips() {
  const timer = useRef<any>();
  const [color, setColor] = useState(randomHexColor);
  useEffect(() => {
    timer.current = setInterval(() => {
      setColor(randomHexColor());
    }, 1000);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <div className={styles["tips"]}>
      <a
        href="https://github.com/anthhub"
        className={styles["icon"]}
        target="_blank"
      >
        <small style={{ color }}>
          更多项目源码, 请移步 GitHub, 或者面基[奸笑]...
        </small>
      </a>
    </div>
  );
}

function randomHexColor() {
  return (
    "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  );
}
