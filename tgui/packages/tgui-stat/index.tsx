import { createRenderer } from 'tgui/renderer';
import { Box } from 'tgui/components';
import { configureStore, StoreProvider } from 'tgui/store';
import { useLocalState } from 'tgui/backend';

const store = configureStore();

let current_tab = "Status";

const Component = (props, context) => {
  const [thing, setThing] = useLocalState(context, 'thing', 0);
  return (
    <Box
      onClick={() => setThing(thing +1)}
    >
      Hi!
    </Box>
  );
};

const renderApp = createRenderer(() => {
  return (
    <StoreProvider store={store}>
      <Component />
    </StoreProvider>
  );
});

const setupApp = () => {
  // Delay setup
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupApp);
    return;
  }

  // Re-render UI on store updates
  store.subscribe(renderApp);

  // Dispatch incoming messages as store actions
  Byond.subscribe((type, payload) => store.dispatch({ type, payload }));

  // Make the panel visible
  Byond.winset('statbrowser', {
    'is-visible': true,
  });

  // Set the initial tab
  Byond.sendMessage("Set-Tab", { tab: current_tab });

  renderApp();
};

setupApp();
