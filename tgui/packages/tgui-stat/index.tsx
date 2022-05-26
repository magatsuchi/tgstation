import { createRenderer } from 'tgui/renderer';
import { Box } from 'tgui/components';

// Styles
import './styles/main.scss';

let status_tab_parts = ["Loading.."];

const renderApp = createRenderer(() => {
  return (
    <Box id="statbrowser">
      <Box id="status" />
    </Box>
  );
});

const setupApp = () => {
  // Delay setup
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupApp);
    return;
  }

  // Make the panel visible
  Byond.winset('statbrowser', {
    'is-visible': true,
  });

  renderApp();

  Byond.subscribeTo('update_stat', ({ global_data, ping_str, other_str }) => {
    let status_tab = document.getElementById("status");
    if (status_tab === null) {
      return;
    }
    status_tab_parts = [ping_str];

    for (let part of global_data) {
      if (part !== null) {
        status_tab_parts.push(part);
      }
    }

    for (let part of other_str) {
      if (part !== null) {
        status_tab_parts.push(part);
      }
    }

    status_tab.textContent = "";

    for (let part of status_tab_parts) {
      if (part.trim() === "") {
        status_tab.appendChild(document.createElement("br"));
      } else {
        let box = document.createElement("div");
        box.textContent = part;
        status_tab.appendChild(box);
      }
    }
  });
};

setupApp();
