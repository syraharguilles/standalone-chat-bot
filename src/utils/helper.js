export const getCurrentTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const uniqueIdGenerator = () => {
    let num = 1;
    return () => {
        return (num += 1);
    };
};
  
const uniqueId = uniqueIdGenerator();

export const botMessage = (message) => {
    if (message.type === "bot") {
        return true;
    }
    return false;
};
  
export const createChatMessage = (messageType, messageObjType, message, type) => {
    return {
        messageType: messageType,
        messageObjType: messageObjType,
        message: {
            messageTitle: message.Title,
            messageList: message.List,
        },
        type: type,
        id: uniqueId(),
    };
};
  
export const createChatBotMessage = (messageType, messageObjType, message, options) => {
    return {
        ...createChatMessage(messageType, messageObjType, message, "bot"),
        ...options,
        loading: true,
    };
};
  
export const createClientMessage = (messageType, messageObjType, message) => {
    return createChatMessage(messageType, messageObjType, message, "user");
};

export const createClientField = (messageType, messageObjType, message) => {
  return createChatMessage(messageType, messageObjType, message, "field");
};
  
  export const callIfExists = (func, ...args) => {
    if (func) {
      return func(...args);
    }
  };
  
  export const getObject = (object) => {
    if (typeof object === "object") return object;
    return {};
  };
  
  export const getWidgets = (config) => {
    if (config.widgets) {
      return config.widgets;
    }
    return [];
  };
  
  export const scrollIntoView = () => {
    const chatContainer = document.querySelector(
      ".vanilla-chatbot-kit-chat-message-container"
    );
  
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };
  
  export const validateProps = (config, MessageParser) => {
    const errors = [];
    if (!config.initialMessages) {
      errors.push(
        "Config must contain property 'initialMessages', and it expects it to be an array of chatbotmessages."
      );
    }
  
    const messageParser = new MessageParser();
    if (!messageParser["parse"]) {
      errors.push(
        "Messageparser must implement the method 'parse', please add this method to your object. The signature is parse(message: string)."
      );
    }
  
    return errors;
  };
  

if (typeof module !== 'undefined') {
    module.exports = {
        getCurrentTime,
        uniqueIdGenerator,
        botMessage,
        createChatMessage,
        createChatBotMessage,
        createClientMessage,
        createClientField
    };
}