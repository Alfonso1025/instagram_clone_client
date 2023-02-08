import Root from "./src/Root";
import { AuthContextProvider } from "./src/Context/AuthContext";
const App : React.FC = ()=> {

  
  return (
    <AuthContextProvider>
            <Root/>
    </AuthContextProvider>
      
  );
}

export default App
