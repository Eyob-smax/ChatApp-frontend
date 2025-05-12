import React, { useEffect } from "react";
import { getPreviousMessages } from "../../service/api.js";

export default function useGetAllMessage(setMessages) {
  useEffect(() => {
    (async () => {
      const result = await getPreviousMessages();
      const mapped = result.map((item) => ({
        ...item,
        isUser:
          item.username ===
          JSON.parse(sessionStorage.getItem("user_data")).username,
      }));
      setMessages(mapped);
    })();
  }, [setMessages]);
}
