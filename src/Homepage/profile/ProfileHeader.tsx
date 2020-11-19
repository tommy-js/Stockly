import React, { useState, useEffect } from "react";
import SetBio from "../../resolvers/SetBio";
import SaveProfileImage from "../../resolvers/SaveProfileImage";
import BioCounter from "./BioCounter";
import { ProfileDropzone } from "./ProfileDropzone";
import edit from "../../images/edit.png";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../actions/actions";

interface Redux {
  profileImage: any;
  username: any;
  bio: any;
  onProfileImageSet: (profileImage: string) => void;
}

interface Props extends Redux {}

const ProfileHeader: React.FC<Props> = (props) => {
  const [profileImage, setProfileImage] = useState(props.profileImage);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(props.bio);
  const [editingProfileImage, setEditingProfileImage] = useState(false);

  function modEditing(isEdit: boolean) {
    setEditing(isEdit);
  }

  function returnEditing() {
    if (editing === true) {
      return (
        <div>
          <textarea
            id="bio_edit_textarea"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
          <SetBio bio={bio} modEditing={modEditing} />
          <BioCounter bio={bio} />
        </div>
      );
    } else {
      return (
        <div onClick={() => setEditing(true)}>
          <div id="left_container">
            <p id="bio_edit_textarea">{bio}</p>
          </div>
          <div id="right_container">
            <img id="bio_image" src={edit} />
          </div>
        </div>
      );
    }
  }

  function modifyImg(imgData: any) {
    setProfileImage(imgData);
  }

  function saveImage(img: string) {
    props.onProfileImageSet(img);
  }

  function renderDropzone() {
    if (editingProfileImage === true) {
      return (
        <div>
          <ProfileDropzone modifyImg={modifyImg} />
          <SaveProfileImage image={profileImage} saveImage={saveImage} />
        </div>
      );
    } else return null;
  }

  return (
    <div id="profile_header">
      <div id="profile_header_container">
        <div
          id="profile_image_container"
          onClick={() => setEditingProfileImage(!editingProfileImage)}
        >
          <img id="img_id" src={profileImage} />
        </div>
        <h2 id="profile_header_username">{props.username}</h2>
      </div>
      <div id="profile_bio_container">{returnEditing()}</div>
      {renderDropzone()}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
