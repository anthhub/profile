import React, { useEffect, useState } from "react";

import styles from "./index.module.css";
import useMetadata from "@/lib/useMetadata";
import { Repo } from "@/pages/api/metadata";
import Tips from "../Tips";

const colors = [
  "#f50",
  "#2db7f5",
  "#87d068",
  "#108ee9",
  "#fcaf17",
  "#f36c21",
  "#b2d235",
  "#ef5b9c",
  "#c77eb5",
];

function getColor() {
  const i = Math.round(Math.random() * (colors.length - 1));
  return colors[i];
}

export default function Article() {
  const { repo, loading } = useMetadata();

  console.log({ repo });

  useEffect(() => {
    const hash = (location.hash || "").replace(/^\#/, "");
    if (!loading || !hash) {
      return;
    }

    const home = document.querySelector(`.${styles.home}`) as HTMLElement;

    setTimeout(() => {
      const dom = document.querySelector("#" + hash) as HTMLElement;
      if (!home || !dom) {
        return;
      }

      home.scrollTo(0, dom?.offsetTop - 50);
    }, 100);
  }, [loading]);

  return (
    <div className={styles.article}>
      {repo &&
        Object.keys(repo).map((key) => {
          const arr = repo[key as keyof typeof repo] as Repo[];
          return (
            <div className={styles.paragraph} key={key}>
              <h1>{key}</h1>
              <ol className={styles.list}>
                {!loading &&
                  arr?.map((item: Repo) => (
                    <MyItemBlock item={item} key={item.name} />
                  ))}
              </ol>
            </div>
          );
        })}

      <Tips />
    </div>
  );
}

interface ItemBlockProps {
  item: Repo;
}

const ItemBlock: React.FC<ItemBlockProps> = ({ item }) => {
  const [over, setOver] = useState(false);

  const onMouseOver = () => {
    if (document.body.clientWidth <= 1000) {
      return;
    }
    setOver(true);
  };

  const onMouseLeave = () => {
    if (document.body.clientWidth <= 1000) {
      return;
    }
    setOver(false);
  };

  const onToggle = () => {
    setOver((over) => !over);
  };

  return (
    <li
      id={item.name.replaceAll(" ", "")}
      key={item.name}
      className={styles.item}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onToggle}
    >
      {item.over && (
        <div
          className={over ? `${styles.over} ${styles.show}` : styles.over}
          style={{ background: `url(${item.over}) center/cover no-repeat` }}
          onClick={onMouseLeave}
        ></div>
      )}
      <p>
        <h2>
          {item.github ? (
            <a
              className={styles.articleTitle}
              href={item.github}
              title="go to github"
              target="_blank"
            >
              {item.name}
            </a>
          ) : (
            item.name
          )}
        </h2>
      </p>
      <p>{item?.tags?.map((tag) => <MyTag tag={tag} key={tag} />)}</p>
      <p>
        <a
          href={item?.url || ""}
          title="go to website"
          target={item?.url ? "_blank" : ""}
        >
          <ul className={styles.descUl}>
            {item?.desc?.map((desc) => (
              <li key={desc}>
                <p className={styles.desc}>{desc}</p>
              </li>
            ))}
            {item?.over && (
              <li key={"desc-over"}>
                <p className={styles.descOver}>{"点我! 点我! 有惊喜!!!"}</p>
              </li>
            )}
          </ul>
        </a>
      </p>
    </li>
  );
};

const MyItemBlock = React.memo(ItemBlock);

interface TagProps {
  tag: string;
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  return (
    <span className={styles.tag} style={{ background: getColor() }}>
      {tag}
    </span>
  );
};

const MyTag = React.memo(Tag);
