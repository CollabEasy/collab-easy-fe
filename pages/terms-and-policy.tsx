import { NextPage } from 'next'
import { Button } from "antd";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import Title from 'components/title'

const TermsAndPolicy: NextPage<{}> = () => {
  const { toDiscover } = useRoutesContext();
  return (
    <div className='footer_termsContainer'>
      <div className="footer_termsSectionContainer">
        <h1>Terms & Conditions</h1>
        <p>
          When we say “Wondor”, “Company”, “we”, “our”, or “us” in this document,
          we are referring to wondor.art a product built by us.
          When we say “Services”, we mean any product created and maintained in as part of Wondor.
        </p>
      </div>

      <div className="footer_termsSectionContainer">
        <h5>Terms</h5>
        <p>
          By accessing the Wondor, you are agreeing to be bound by these terms of service, all applicable laws
          and regulations, and agree that you are responsible for compliance with any applicable local laws.
          If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          The materials contained in this website are protected by applicable copyright and trademark law.
        </p>
      </div>
      <div className="footer_termsSectionContainer">
        <h5>Disclaimer</h5>
        <p>
          The materials on Wondor's website are provided on an 'as is' basis.
          Wondor makes no warranties, expressed or implied, and hereby disclaims and negates
          all other warranties including, without limitation, implied warranties or conditions of
          merchantability, fitness for a particular purpose, or non-infringement of intellectual
          property or other violation of rights. Further, Wondor does not warrant or make any
          representations concerning the accuracy, likely results, or reliability of the use of the
          materials on its website or otherwise relating to such materials or on any sites linked to
          this site.
        </p>
      </div>
      <div className="footer_termsSectionContainer">
        <h5>Limitation</h5>
        <p>
        </p>
      </div>
      <div className="footer_termsSectionContainer">
        <h5>Accuracy</h5>
        <p>
          The materials appearing on Wondor's website could include technical, typographical, or photographic errors.
          Wondor does not warrant that any of the materials on its website are accurate, complete or current.
          Wondor may make changes to the materials contained on its website at any time without notice.
          However Wondor does not make any commitment to update the materials.
        </p>
      </div>
      <div className="footer_termsSectionContainer">
        <h5>Abuse</h5>
        <p>
          We reserve the right to take action in response to reported abuse of our services.
          This action may include - but is not limited to - the deletion of user data or
          other account details. Abuse may include - but is not limited to - any action
          which is illegal under the city, state, or federal laws where you are currently present.
          This includes copyright infringement under the DMCA or any activity which we deem disruptive.
        </p>
      </div>
      <div className="footer_termsSectionContainer">
        <h5>Modification</h5>
        <p>
          Wondor may revise these terms of service for its website at any time without notice.
          By using this website you are agreeing to be bound by the then current version of
          these terms of service.
        </p>
      </div>
      <div className="footer_termsSectionContainer">
        <h5>Governing Law</h5>
        <p>
        </p>
      </div>
      <div className="footer_termsSectionContainer">
        <h5>Contact Us</h5>
        <p>
          If you have any questions or suggestions about my Privacy Policy, do not hesitate to Contact Us.
        </p>
      </div>
      <div className="footer_termsSectionContainer">
        <Button type="primary">
          <Link
            href={routeToHref(toDiscover())}
            passHref
          >Explore Wondor</Link>
        </Button>
      </div>
    </div>
  )
}

export default TermsAndPolicy