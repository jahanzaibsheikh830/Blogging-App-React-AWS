import Router from "./component/router/router.jsx";
import Amplify from "aws-amplify";
import SetupSubscription from "./component/adminDashboard/subscriptions";
import aws_xports from "./aws-exports";
Amplify.configure(aws_xports);
function App() {
  return (
    <div>
      <SetupSubscription />
      <Router />
    </div>
  );
}

export default App;
