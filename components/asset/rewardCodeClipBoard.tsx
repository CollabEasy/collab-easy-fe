import { GetRefferalLink } from 'helpers/routeHelper';
import { useState, useEffect, useRef } from 'react';

const RewardCodeClipBoard = ({ code }) => {

    const textRef = useRef(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        if (textRef.current) {
            navigator.clipboard.writeText(GetRefferalLink(textRef.current.value));
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
    };

    return (
        <div className="clipboard-container">
            <div >
                Share your referral code {" "}
                <div className="clipboard-text-cnt">
                    <span className="clipboard-text">{code}</span>
                    <div className="copy-btn" onClick={handleCopyClick}>
                        {isCopied ? 'Copied!' : 'Copy'}
                    </div>
                </div>
                {" "} with your friends. When they join Wondor, you both get 150 reward points for successful refferal.
            </div>
            <input
                type="text"
                ref={textRef}
                defaultValue={code}
                style={{
                    opacity: 0,
                    position: "absolute",
                    pointerEvents: "none",
                }}
            />
        </div>
    );
};

export default RewardCodeClipBoard;
