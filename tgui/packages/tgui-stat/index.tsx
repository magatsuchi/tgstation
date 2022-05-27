import { createRenderer } from 'tgui/renderer';
import { Box, Button, Flex } from 'tgui/components';
import { Color } from 'common/color';
import { scale } from 'common/math';

// Styles
import './styles/main.scss';

let status_tab_parts = ["Loading.."];
let current_tab = "Status";
let networkQuality = 1;

const renderApp = createRenderer(() => {
  return (
    <Box className="StatBrowser">
      <div className="Ping">
        <Box id="Ping__text" />
        <Box id="Ping__indicator" />
      </div>
      <Flex justify="flex-end">
        <Flex.Item>
          <Button>Admin</Button>
          <Button>OOC</Button>
        </Flex.Item>
      </Flex>
    </Box>
  );
});

const tweenPing = () => {
  return Color.lookup(networkQuality, [
    new Color(220, 40, 40),
    new Color(220, 200, 40),
    new Color(60, 220, 40),
  ]).toString();
};

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

  Byond.sendMessage("Set-Tab", { tab: current_tab });

  renderApp();

  Byond.subscribeTo("update_stat", ({ global_data, ping_info, other_str }) => {
    let ping = document.getElementById("Ping__text");
    let ping_ind = document.getElementById("Ping__indicator");

    if (ping !== null && ping_ind !== null) {
      networkQuality = 1 - scale(ping_info.current, 50, 200);

      ping_ind.style.backgroundColor = tweenPing();
      ping.textContent = ping_info.current; 
    }
  });
};

setupApp();
