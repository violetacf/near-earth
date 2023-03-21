import meteor from './../../Images/meteor.png';
import './ObjectsDisplay.css';
import { Link } from 'react-router-dom';

export default function PreviousFuture({ id }) {
  return (
    <div>
      <Link
        to={{
          pathname: `/learn-more-element/${id}`,
        }}
      >
        <img
          className="meteor-image"
          alt="Meteor to click on"
          src={meteor}
        ></img>
      </Link>
      <p>Click on the image to learn more about this element</p>
    </div>
  );
}
