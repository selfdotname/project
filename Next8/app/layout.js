import "@/css/global.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Next App</title>
      <body>
        {children}
      </body>
    </html>
  );
}
