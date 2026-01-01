import { useState } from "react";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";

type FormStatus = "idle" | "loading" | "success" | "error";

export function useContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return; // prevent double submit
    setStatus("loading");

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("access_key", WEB3FORMS_KEY);
      console.log("key", WEB3FORMS_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = await response.json();

      if (response.ok || result.success === true) {
        setStatus("success");
        event.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return { handleSubmit, status };
}
