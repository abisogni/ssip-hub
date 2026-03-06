import Script from "next/script";

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script src="https://endeavor.zone/script/init/4616b1cc-ba4f-4059-bb1b-8c9a8938e192/" strategy="afterInteractive" />
    </>
  );
}
