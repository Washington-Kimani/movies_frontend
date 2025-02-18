import MainApp from "./mainapp/MainApp.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";

function App() {

  return (
    <>
        <AuthProvider>
            <MainApp />
        </AuthProvider>
    </>
  )
}

export default App
