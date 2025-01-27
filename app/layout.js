import { Outfit, Ovo, Oswald } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "./config/ReactQueryClientProvider";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});

const oswald = Oswald({
  subsets: ["latin"], weight:["700"]
})

export const metadata = {
  title: "LinguaLens",
  description: "단순 언어 번역을 넘어서 이미지 텍스트 번역 및 음성 출력까지 해주는 다용도 번역 프로젝트 입니다.",
  icons: {
    icon: '/images/tr-logo.png',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth ">
      <head>
      <link rel="icon" href="/images/tr-logo.png" />
      </head>
      <body
        className={`${outfit.className}${oswald.className}  ${ovo.className} `}
      >
        <ReactQueryClientProvider>
        {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
