import { useEffect } from 'react';

export default function ChatWidget() {
  useEffect(() => {
    // 1. Prevent duplicate initializations
    if (document.getElementById('n8n-chat-script') || document.querySelector('.n8n-chat')) {
      return;
    }

    // 2. Inject n8n stylesheet
    const link = document.createElement('link');
    link.id = 'n8n-chat-style';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    document.head.appendChild(link);

    // 3. Inject script and initialize
    const script = document.createElement('script');
    script.id = 'n8n-chat-script';
    script.type = 'module';
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      createChat({
        webhookUrl: 'https://nishan45.app.n8n.cloud/webhook/60fca804-1008-4ec3-ae5b-faed946030f4/chat',
        initialMessages: [
          'Welcome to the AARA Media Mission Production Desk! 🎬',
          'I am your AI production assistant. How can I help you draft your next cinema project?'
        ],
        i18n: {
          en: {
            title: 'AARA Studio Assistant',
            subtitle: 'Active Production AI Desk',
            inputPlaceholder: 'Start scripting or ask a question...',
          }
        }
      });
    `;
    document.body.appendChild(script);

    return () => {
      // Cleanup links and scripts on unmount if necessary
      const loadedLink = document.getElementById('n8n-chat-style');
      if (loadedLink) loadedLink.remove();
      const loadedScript = document.getElementById('n8n-chat-script');
      if (loadedScript) loadedScript.remove();
      
      // Clean up injected DOM elements from body
      const chatWidgetContainer = document.querySelector('.n8n-chat');
      if (chatWidgetContainer) chatWidgetContainer.remove();
      const chatTrigger = document.querySelector('.chat-toggle');
      if (chatTrigger) chatTrigger.remove();
    };
  }, []);

  return null;
}
