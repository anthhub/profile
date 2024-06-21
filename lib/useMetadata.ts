import { Repo } from "@/pages/api/metadata/index.js";
import { useEffect, useState } from "react";

export default function useMetadata() {
  const [repo, setRepo] = useState<{ string: Repo[] }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/metadata")
      .then(async (resp) => {
        setRepo(await resp.json());
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { repo, loading };
}
