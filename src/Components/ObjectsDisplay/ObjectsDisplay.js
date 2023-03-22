import './ObjectsDisplay.css';
import { Link } from 'react-router-dom';
import DangerOrSafe from './DangerOrSafe';
import Lottie from 'lottie-react';
import telescopeSearch from './../../Images/telescope-animation.json';

export default function ObjectsDisplay({
  loading,
  objectsReceived,
  numberOfElements,
}) {
  if (numberOfElements === 0 || loading === true) {
    return (
      <div className="text-intro-click-more">
        {loading === true ? (
          <div className="loading-search">
            <div>
              <p className="loading-msg">
                Grabbing the telescope, please wait...
              </p>
            </div>
            <div>
              <Lottie
                aria-label="telescope animation"
                className="telescope-search"
                animationData={telescopeSearch}
                height={200}
                width={200}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    const array = Object.values(objectsReceived);
    const newArray = array.flat();
    return (
      <div>
        <p className="text-intro-click-more">
          Found {newArray.length} elements, select an object to see more
          information about it:
        </p>

        <div className="elements-container">
          {newArray.map((element) => (
            <div key={element.id} className="element-container">
              <Link
                key={element.id}
                to={{
                  pathname: `/learn-more-element/${element.id}`,
                }}
              >
                <div>
                  <DangerOrSafe
                    dangerous={element.is_potentially_hazardous_asteroid}
                  />
                </div>
                <div className="info-container">
                  <h1>{element.name}</h1>
                  <p>
                    {' '}
                    Its diameter is between{' '}
                    {element.estimated_diameter.meters.estimated_diameter_min.toFixed(
                      2
                    )}{' '}
                    and{' '}
                    {element.estimated_diameter.meters.estimated_diameter_max.toFixed(
                      2
                    )}{' '}
                    m.
                  </p>
                  <p>
                    {' '}
                    This element is{' '}
                    {element.is_potentially_hazardous_asteroid ? (
                      <b>dangerous!!</b>
                    ) : (
                      <b>not dangerous.</b>
                    )}
                  </p>
                  <p>
                    {' '}
                    This element is{' '}
                    <b>
                      {element.is_sentry_object
                        ? 'sentry object.'
                        : 'not a sentry object.'}
                    </b>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
