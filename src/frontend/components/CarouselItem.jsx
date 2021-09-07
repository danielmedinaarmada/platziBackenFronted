import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { postFavorite, dropFavorite } from "../actions";
import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png'
import removeIcon from '../assets/static/remove-icon.png'

const CarouselItem = (props) => {
  const { id, cover, title, year, contentRating, duration, isList, slug, source, myList, user, _id } = props;
  const handleSetFavorite = () => {
    const movieExist = myList.find(movie => movie.id === id);
    
    if (!movieExist) {
      const movie = { id, cover, title, year, contentRating, duration, isList, slug, source, _id};
      props.postFavorite(user, movie);
    }
  }
  const handleDeleteFavorite = (itemId) => {
    props.dropFavorite( _id, itemId);
  };
  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={cover} alt={title} />
      <div className="carousel-item__details">
        <div>
          <Link to={`/player/${id}`}>
            <img className="carousel-item__details--img" src={playIcon} alt="Play Icon" />
          </Link>
          {!isList ? (
            <img
              className="carousel-item__details--img"
              src={plusIcon}
              alt="Reproducir"
              onClick={handleSetFavorite}
            />
          ) :
            (
              <img
                className="carousel-item__details--img"
                src={removeIcon}
                alt="Quitar de mi lista"
                onClick={() => handleDeleteFavorite(id)}
              />
            )
          }
        </div>
        <p className="carousel-item__details--title">{title}</p>
        <p className="carousel-item__details--subtitle">{`${year} ${contentRating} ${duration}`}</p>
      </div>
    </div>
  );
}

CarouselItem.propTypes = {
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
  cover: PropTypes.string,
  dropFavorite: PropTypes.func,
  postFavorite: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    user: state.user,
  };
};

const mapDispatchToProps = {
  postFavorite,
  dropFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);

