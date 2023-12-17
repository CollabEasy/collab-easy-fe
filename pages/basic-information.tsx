import Layout from "@/components/layout";
import Loader from "@/components/loader";
import NewUser from "@/components/modal/newUser";
import NewUserCategory from "@/components/newUserCategory";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import * as actions from "state/action";
import { CategoryEntry } from "types/states/category";

const mapStateToProps = (state: AppState) => {
  const user = state.user;
  const lastPathName = state.home.lastPathname;
  const isFetchingCategories = state.category.isFetchingCategories;
  const routeToMyWondor = state.home.routeToMyWondor;
  return { user, routeToMyWondor, isFetchingCategories, lastPathName };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAllCategories: () => dispatch(actions.getAllCategories()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const BasicInformation = ({
  user,
  routeToMyWondor,
  lastPathName,
  isFetchingCategories,
  getAllCategories,
}: Props) => {
  const router = useRouter();
  const totalSegments = 2;
  const [activeSegment, setActiveSegment] = useState(1);

  const GetApprovedCategories = (allCategories) => {
    const approvedCategories: Array<CategoryEntry> = [];
    let data = allCategories.length != 0 ? allCategories : [];
    data.sort((a, b) => b.artName - a.artName);
    data.forEach((category) => {
      if (category.approved) {
        let element = {
          id: category.id,
          artName: category.artName,
          slug: category.slug,
          description: category.description,
          approved: category.approved,
        };
        approvedCategories.push(element);
      }
    });
    return approvedCategories;
  };

  const getBasicInfoComponent = () => {
    return (
      <div
        className="basicInformation_container"
        style={{ paddingTop: "0px", paddingBottom: "4%" }}
      >
        <NewUser
          handleNext={() => {
            setActiveSegment(activeSegment + 1);
          }}
        />
      </div>
    );
  };

  const getArtCategoryComponent = () => {
    return (
      <div
        className="basicInformation_container"
        style={{ paddingTop: "0px", paddingBottom: "4%" }}
      >
        <NewUserCategory
          handleNext={() => {
            setActiveSegment(activeSegment + 1);
          }}
        />
      </div>
    );
  };

  function getComponentToRender() {
    if (activeSegment === 1) {
      return getBasicInfoComponent();
    }

    if (activeSegment === 2) {
      return getArtCategoryComponent();
    }
  }

  useEffect(() => {
    if (user.isFetchingUser) {
      return;
    }
    // if (!user.isLoggedIn || user.user === undefined) {
    //   router.push("/login");
    // }
  }, [user.isFetchingUser]);

  useEffect(() => {
    if (activeSegment > totalSegments) {
      if (lastPathName === "/" || lastPathName === undefined) {
        router.push("/my-wondor");
      }
      router.push(lastPathName);
    }
  }, [user.isLoggedIn, activeSegment]);

  return (
    <Layout
      title={"Basic Information | Wondor"}
      name={"description"}
      content={
        "Fill you basic information to increase reach and let more people find you."
      }
    >
      <>{user.isFetchingUser ? <Loader /> : getComponentToRender()}</>
    </Layout>
  );
};

export default connector(BasicInformation);
