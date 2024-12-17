import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <main style={{backgroundColor:'#F9F9F9' , minHeight:'100vh'}}>
      <div>
        <Toaster/>
        {children}
        </div>
    </main>
  );
}
