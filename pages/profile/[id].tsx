import Title from 'components/title'
import { useDispatch } from 'react-redux'
import { User } from 'types/core';
import { getUserData } from 'api/user';
import { GetServerSideProps, NextPage } from 'next'
import { setUserData } from 'state/action/user.action';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface ProfilePageProps {
  userData: User
}

const ProfilePage: NextPage<ProfilePageProps> = ({ userData }) => {
  const dispatch = useDispatch()
  dispatch(setUserData(userData))

  return (
    <div className='container'>
      <Title title="Profile" />
      <h1>Collab Profile</h1>
      <p>{userData.firstName}</p>
      <p>{userData.lastName}</p>
      <p>{userData.email}</p>
      <p>{userData.userHandle}</p>
      <p>{userData.age}</p>
      <p>{userData.profilePicUrl}</p>
      <p>{userData.country}</p>
      <p>{userData.createdAt}</p>
      <p>{userData.phoneNumber}</p>
      <p>{userData.bio}</p>
      <p>{userData.updatedAt}</p>
      <p>{userData.timezone}</p>
      <p>{userData.lastActive}</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({
  req,
}) => {
  const user = await getUserData('1234')
  return {
    props: {
      userData: user
    } as ProfilePageProps,
  }
}

export default ProfilePage


