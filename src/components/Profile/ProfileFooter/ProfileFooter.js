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
}) => (
  <footer className="profile-footer">
    {editMode ? (
      <>
        <Button onClick={onClickSave}>Сохранить</Button>
        <Button danger={true} onClick={onClickCancel}>
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
};

export default ProfileFooter;
