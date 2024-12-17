export default function RootLayout({ children }) {
  return (
    <main style={{backgroundColor:'#F9F9F9' , minHeight:'100vh'}}>
      <div>{children}</div>
    </main>
  );
}
