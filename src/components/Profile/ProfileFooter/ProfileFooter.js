import React from 'react';
import './ProfileFooter.css';
import Button from '../../Button/Button';
import PropTypes from 'prop-types';

const ProfileFooter = ({
  onClickEdit,
  signOut,
  editMode,
  onClickSave,
  onClickCancel,
  isActiveSaveButton,
  isSubmitting,
}) => (
  <footer className="profile-footer">
    {editMode ? (
      <>
        <Button
          onClick={onClickSave}
          disabled={!isActiveSaveButton || isSubmitting}
        >
          Сохранить
        </Button>
        <Button danger={true} onClick={onClickCancel} disabled={isSubmitting}>
          Отмена
        </Button>
      </>
    ) : (
      <>
        <Button onClick={onClickEdit}>Редактировать</Button>
        <Button danger={true} onClick={signOut}>
          Выйти из аккаунта
        </Button>
      </>
    )}
  </footer>
);

ProfileFooter.propTypes = {
  onClickEdit: PropTypes.func,
  onClickSave: PropTypes.func,
  signOut: PropTypes.func,
  editMode: PropTypes.bool,
  onClickCancel: PropTypes.func,
  isActiveSaveButton: PropTypes.bool,
  isSubmitting: PropTypes.bool,
};

export default ProfileFooter;
