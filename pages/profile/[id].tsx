import Title from '../../components/title'
import { useDispatch } from 'react-redux'
import { User } from '../../types/core';
import { getUserData } from 'api/user';
import { GetServerSideProps, NextPage } from 'next'
import { setUserData } from 'state/action/user.action';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface ProfilePageProps {
  userData: User
}

const ProfilePage: NextPage<ProfilePageProps> = ({ userData }) => {
  const dispatch = useDispatch()
  const { user, error } = useUser();
  dispatch(setUserData(userData))

  if (error) return <div>{error.message}</div>;

  return (
    <div className='container'>
      <Title title="Profile" />
      <h1>Collab Profile</h1>
      { user && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        )
      }
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


