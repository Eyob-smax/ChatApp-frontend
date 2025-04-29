import React, { useEffect, useState } from "react";

import { addMessages } from "../../service/api.js";

export default function useSendMessage(data) {
  const [result, setResult] = useState({});
  useEffect(() => {
    (async () => {
      if (!data) {
        return;
      }
      const sendData = await addMessages(data);
      setResult(sendData);
    })();
  }, [data]);
  return result;
}
