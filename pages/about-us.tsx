import { NextPage } from 'next'
import Image from "next/image";
import headerImg from "public/images/aboutUsheader.png";

const GetInspired: NextPage<{}> = () => {
  return (
    <div className="footer_aboutUsContainer">
      <div className="footer_aboutUsHeaderPictureContainer">
        <Image
          layout="responsive"
          objectFit="contain"
          src={headerImg}
          alt="Landing page" />

      </div>
      <div className="footer_aboutUsHeaderTextContainer">
        <div className="catext-center">
          <div >
            <h5 className="card-title">What is Nous Care?</h5>
          </div>
          <div className="card-body">
            <p className="card-text text-left">
              Content creators are spread out on various social media platforms - some on instagram, others on youtube,
              and we are here to help you discover these creators so that you can work with them on your next big thing.
              Search for the art category to find the artists whose work most inpire you to work with them.
              Take your time, explore the site, checkout different artists,
              and in the end, feel confident in the content you create by collaborating with them.
              This site is an attempt to help all of the artists in their journey to find the artists they would want to collaborate with.
              We’ll continually strive to offer tools that serve you towards this end.
              Why? For lots of reasons, but mainly and simply, because when it comes to you - <strong>we care</strong>.
            </p>
          </div>
          <div className="card text-left">
            <div className="card-header">
              <h5 className="card-title">Why Nous Care?</h5>
            </div>
            <div className="card-body">
              <p className="card-text">Decisions related to our health are amongst the most important that we make. Naturally,
                they are difficult decisions, and for many reasons, but partly because there are so many possible solutions
                scattered throughout the internet. Clicking through Google to find all these options is cumbersome,
                and some options would likely still be missed. We have tried to gather, in one place, all the companies
                offering online healthcare services. Each company is analyzed according to a number of parameters, such
                as price and where they offer services, and all this information is shared freely, in a convenient user interface.
                Thus, users can see all their possible options in one view, and ultimately make a wise decision about the things
                that matter most. </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default GetInspired