import React, { useState } from 'react';
import './Profile.css';
import Section from '../Section/Section';
import { useAuth } from '../../hooks/useAuth';
import Header from '../Header/Header';
import ProfileFooter from './ProfileFooter/ProfileFooter';

const Profile = () => {
  const { user, signOut, updateUserProfile } = useAuth();
  const [isEditMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
  });

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
    setEditMode(false);
    updateUserProfile(profileForm);
  };

  return (
    <>
      <Header />
      <main>
        <Section className="profile">
          <div className="profile__info">
            <h1 className="profile__great">Привет, {user.name}!</h1>
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
                  />
                ) : (
                  <span className="profile__value">{user.name}</span>
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
                  />
                ) : (
                  <span className="profile__value">{user.email}</span>
                )}
              </li>
            </ul>
          </div>
        </Section>
      </main>
      <ProfileFooter
        signOut={signOut}
        onClickEdit={handleChangeEditMode}
        editMode={isEditMode}
        onClickSave={handleSave}
        onClickCancel={handleCancel}
      />
    </>
  );
};

export default Profile;
