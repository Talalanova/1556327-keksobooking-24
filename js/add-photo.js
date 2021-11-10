const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housePhotoChooser = document.querySelector('#images');
const housePhotoPreview = document.querySelector('.ad-form__photo');

const showAvatarPreview = () => {
  avatarFileChooser.addEventListener('change', () => {
    const file = avatarFileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });
};

const showHousePhotoPreview =() => {
  housePhotoChooser.addEventListener('change', () => {
    const file = housePhotoChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const housePhotoImg = document.createElement('img');
      housePhotoPreview.appendChild(housePhotoImg);
      housePhotoImg.style.height = '70px';
      housePhotoImg.style.width = '70px';
      housePhotoImg.src = URL.createObjectURL(file);
    }
  });
};

export {showAvatarPreview,showHousePhotoPreview,avatarPreview,housePhotoPreview};


