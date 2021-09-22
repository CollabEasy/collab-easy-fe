import { User } from 'types/model';




interface ProfilePageProps {
    userData: User
}
const EditProfile: React.FC<ProfilePageProps> = ({ userData }) =>{

    return (
        <div className="edit-profile">
            <h1>Edit Profile User</h1>
        </div>
    );
}

export default EditProfile;