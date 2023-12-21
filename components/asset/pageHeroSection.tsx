import React from 'react';

const HeroSection = ({
    heading,
    paragaraph,
}) => {
    return (
        <div className="heroContent">
            <div className="row align-items-center">
                <div className="col-md-12">
                    <div className="section-title text-md-center">
                        <h2 className="common-h2-style">
                            {heading}
                        </h2>
                        <p className="common-p-style" style={{ width: "100%" }}>
                            {paragaraph}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
