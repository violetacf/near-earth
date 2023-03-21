import './ObjectsDisplay.css';
import PreviousFuture from './DisplayPreviousFuture';
import { Link } from 'react-router-dom';

export default function ObjectsDisplay({ objectsReceived, numberOfElements }) {
  if (numberOfElements === 0) {
    return (
      <div className="text-intro-click-more">
        <p>Here we will display the objects, click on them for more info.</p>
      </div>
    );
  } else {
    const array = Object.values(objectsReceived);
    // console.log('objects received array', array);
    const newArray = array.flat();
    // console.log('newArr', newArray);
    return (
      <div>
        <p className="text-intro-click-more">
          Found {newArray.length} elements:
        </p>

        <div className="elements-container">
          {newArray.map((element) => (
            <Link
              to={{
                pathname: `/learn-more-element/${element.id}`,
              }}
            >
              <div key={element.id} className="element-container">
                <div>
                  <PreviousFuture
                    id={element.id}
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
                      <>
                        <b>dangerous!!</b>
                      </>
                    ) : (
                      <>
                        <b>not dangerous.</b>
                      </>
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
