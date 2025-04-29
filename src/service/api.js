const id = "https://eyoba.up.railway.app/";

async function getPreviousMessages() {
  try {
    const res = await fetch(`${id}/messages`);
    const result = await res.json();
    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }
    return result.messages;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.message,
    };
  }
}

async function addMessages(data) {
  const { username, message } = data;
  console.log(data);
  if (!username || !message) {
    return {
      success: false,
      message: "Incomplete data",
    };
  }
  try {
    const res = await fetch(`${id}/messages`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    const result = await res.json();
    if (!result.success) {
      return {
        message: result.message,
        success: false,
      };
    }
    return {
      success: result.success,
      result: "Message added to DB successfully!",
    };
  } catch (err) {
    console.log(err.message);
    return {
      message: err.message,
      success: false,
    };
  }
}

async function deleteMessageById(id) {
  !id ? "Incomplete data" : null;
  try {
    const res = await fetch(`${id}//delete-message/${id}`);
    const data = await res.json();
    if (!data.success) {
      return {
        message: data.message,
        success: data.success,
      };
    }

    return {
      message: data.message,
      success: data.success,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
}

async function deleteAllMessages(username) {
  try {
    const res = await fetch(`${id}/delete-all-messages`, {
      method: "DELETE",
      headers: {
        "content-tyep": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    if (!data.success) {
      return {
        message: data.message,
        success: data.success,
      };
    }

    return {
      message: data.message,
      success: data.success,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
}

async function editMessage(id, editedText) {
  !id || !editedText ? "Incomplete data" : null;

  try {
    const res = await fetch(`${id}/edit-message`, {
      method: "POST",
      headers: {
        "content-tyep": "application/json",
      },
      body: JSON.stringify({ id, editedText }),
    });

    const data = await res.json();
    if (!data.success) {
      return {
        message: data.message,
        success: data.success,
      };
    }

    return {
      message: data.message,
      success: data.success,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
}

async function reactToMessage(reaction, id) {
  !id || !reaction ? "Incomplete data" : null;
  try {
    const res = await fetch(`${id}/react-message`);
    const data = await res.json();
    if (!data.success) {
      return {
        message: data.message,
        success: data.success,
      };
    }

    return {
      message: data.message,
      success: data.success,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
}

export {
  getPreviousMessages,
  deleteMessageById,
  addMessages,
  deleteAllMessages,
  reactToMessage,
  editMessage,
};
