import { GetCollabLink } from 'helpers/routeHelper';
import { useState, useEffect, useRef } from 'react';

const CollabLinkClipBoard = ({ slug }) => {

    const textRef = useRef(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        if (textRef.current) {
            navigator.clipboard.writeText(GetCollabLink(textRef.current.value));
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
    };

    return (
        <div className="clipboard-container">
            <div >
                Share your collaboration link {" "}
                <div className="clipboard-text-cnt">
                    <span className="clipboard-text">{slug}</span>
                    <div className="copy-btn" onClick={handleCopyClick}>
                        {isCopied ? 'Copied!' : 'Copy'}
                    </div>
                </div>
                {" "}  to kickstart creative partnerships on Wondor, whether with fellow artists, friends, or family members.
            </div>
            <input
                type="text"
                ref={textRef}
                defaultValue={slug}
                style={{
                    opacity: 0,
                    position: "absolute",
                    pointerEvents: "none",
                }}
            />
        </div>
    );
};

export default CollabLinkClipBoard;
