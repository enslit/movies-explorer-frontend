import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import Section from '../Section/Section';
import Header from '../Header/Header';
import ProfileFooter from './ProfileFooter/ProfileFooter';
import PropTypes from 'prop-types';
import CurrentUserContext from '../../context/CurrentUserContext';
import useToast from '../../hooks/useToast';

const Profile = ({ handleSignOut, handleUpdateProfile }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActiveSaveButton, setActiveSaveButton] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const toast = useToast();

  const changeInput = (e) => {
    setProfileForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    setIsSubmitting(true);
    handleUpdateProfile(profileForm)
      .then(() => {
        setEditMode(false);
      })
      .catch((error) => {
        toast(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (
      currentUser.name !== profileForm.name ||
      currentUser.email !== profileForm.email
    ) {
      setActiveSaveButton(true);
    } else {
      setActiveSaveButton(false);
    }
  }, [currentUser, profileForm]);

  return (
    <>
      <Header />
      <main>
        <Section className="profile">
          <div className="profile__info">
            <h1 className="profile__great">Привет, {currentUser.name}!</h1>
            <ul className="profile__data-list">
              <li className="profile__field">
                <span className="profile__label">Имя</span>
                {isEditMode ? (
                  <input
                    required
                    minLength={3}
                    className="profile__input"
                    value={profileForm.name}
                    onChange={changeInput}
                    name="name"
                    disabled={isSubmitting}
                  />
                ) : (
                  <span className="profile__value">{currentUser.name}</span>
                )}
              </li>
              <li className="profile__field">
                <span className="profile__label">E-mail</span>
                {isEditMode ? (
                  <input
                    required
                    type="email"
                    className="profile__input"
                    value={profileForm.email}
                    onChange={changeInput}
                    name="email"
                    disabled={isSubmitting}
                  />
                ) : (
                  <span className="profile__value">{currentUser.email}</span>
                )}
              </li>
            </ul>
          </div>
        </Section>
      </main>
      <ProfileFooter
        signOut={handleSignOut}
        onClickEdit={handleChangeEditMode}
        editMode={isEditMode}
        onClickSave={handleSave}
        onClickCancel={handleCancel}
        isActiveSaveButton={isActiveSaveButton}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

Profile.propTypes = {
  handleUpdateProfile: PropTypes.func,
  handleSignOut: PropTypes.func,
};

export default Profile;
