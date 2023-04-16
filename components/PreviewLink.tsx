import Link from "next/link";
import { Fragment, useState } from "react";

type LinkProps = {
  href: string;
  children: React.ReactNode;
};

const PreviewLink = ({ href, children }: LinkProps) => {
  const [keyDownCommandKey, setKeyDownCommandKey] = useState(false);
  const [mouseOverLink, setMouseOverLink] = useState(false);
  const [mouseOverIframe, setMouseOverIframe] = useState(false);
  const [mousePointerX, setMousePointerX] = useState(0);
  const [mousePointerY, setMousePointerY] = useState(0);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  return (
    <Fragment>
      <Link
        href={href}
        className="relative nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:from-font]"
        onMouseEnter={(e) => {
          if (e.metaKey) {
            setKeyDownCommandKey(true);
          }
          setMouseOverLink(true);
          if (e.target instanceof HTMLAnchorElement) {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            console.log(rect);
            setMousePointerX(e.clientX - rect.x);
            setMousePointerY(e.clientY - rect.y + rect.height);
          }
        }}
        onMouseLeave={(e) => {
          setTimeout(() => {
            if (!e.metaKey) {
              setKeyDownCommandKey(false);
            }
            setMouseOverLink(false);
          }, 500);
        }}
      >
        {children}
        {keyDownCommandKey &&
          (mouseOverLink || mouseOverIframe) &&
          !isIframeLoaded && (
            <div
              className={`z-10 absolute border border-gray-300 border-solid shadow-lg bg-body dark:bg-body-dark dark:border-gray-600`}
              style={{
                borderRadius: "5%",
                top: mousePointerY,
                left: mousePointerX,
                width: "500px",
                height: "500px",
              }}
            ></div>
          )}
        {keyDownCommandKey && (mouseOverLink || mouseOverIframe) && (
          <>
            <iframe
              title={String(children)}
              src={href}
              width={500}
              height={500}
              loading="lazy"
              sandbox="allow-scripts allow-popups allow-same-origin allow-top-navigation-by-user-activation"
              className={`absolute border border-gray-300 border-solid shadow-lg bg-body dark:bg-body-dark dark:border-gray-600 ${
                isIframeLoaded ? "block" : "block"
              }`}
              style={{
                borderRadius: "5%",
                top: mousePointerY,
                left: mousePointerX,
              }}
              onMouseEnter={(e) => {
                if (e.metaKey) {
                  setKeyDownCommandKey(true);
                }
                setMouseOverIframe(true);
              }}
              onMouseLeave={(e) => {
                setTimeout(() => {
                  if (!e.metaKey) {
                    setKeyDownCommandKey(false);
                  }
                  setMouseOverIframe(false);
                  if (!mouseOverLink) {
                    setIsIframeLoaded(false);
                  }
                }, 500);
              }}
              onLoad={() => {
                setTimeout(() => {
                  setIsIframeLoaded(true);
                }, 100);
              }}
            ></iframe>
          </>
        )}
      </Link>
    </Fragment>
  );
};

export default PreviewLink;
