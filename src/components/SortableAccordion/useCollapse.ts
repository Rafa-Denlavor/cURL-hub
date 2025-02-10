import axios from "axios";
import { useState } from "react";

export function useCollapse() {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runCurl = async (command: string) => {
    try {
      setError(null);
      const payload = {
        command,
      };

      const res = await axios.post(
        "https://curl-hub.vercel.app/api/run-curl",
         // "http://localhost:3000/api/run-curl",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setError(err?.message ?? "Erro ao fazer a requisição");
    }
  };

//   console.log(response);

  return { runCurl, response, error };
}
