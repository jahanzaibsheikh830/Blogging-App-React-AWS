import Router from "./component/router/router.jsx";
import Amplify from "aws-amplify";
import aws_xports from "./aws-exports";
Amplify.configure(aws_xports);
function App() {
  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
