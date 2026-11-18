import { AppRouter } from "./router/AppRouter";
import { AppProviders } from "./state-management/AppProviders";

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
