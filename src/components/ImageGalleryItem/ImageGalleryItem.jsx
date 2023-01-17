import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { Item, ItemImage } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';


const GalleryItem = ({ largeImageURL, webformatURL, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  return (
    <Fragment>
      <Item onClick={toggleModal}>
        <ItemImage src={webformatURL} alt={user} loading="lasy" />
      </Item>

      {isOpen && (
        <Modal closeModal={toggleModal}>
          <img src={largeImageURL} alt={user} />
        </Modal>
      )}
    </Fragment>
  );
};

export default GalleryItem;

GalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
};