import './ObjectsDisplay.css';
// import meteor from './../../Images/meteor.png';
import dangerous from './../../Images/save-me.png';
import safe from './../../Images/safe.png';
import PreviousFuture from './DisplayPreviousFuture';

export default function ObjectsDisplay({
  objectsReceived,
  numberOfElements,
  endDate,
  startDate,
}) {
  if (numberOfElements === 0) {
    return (
      <div>
        <p>Here we will display the objects, click on them for more info</p>
      </div>
    );
  } else {
    console.log('objects received', objectsReceived);
    const array = Object.values(objectsReceived);
    console.log('objects received array', array);
    const newArray = array.flat();
    console.log('newArr', newArray);
    return (
      <div>
        <p>Found {newArray.length} elements:</p>
        <div className="elements-container">
          {newArray.map((element) => (
            <div key={element.id} className="element-container">
              <div>
                <PreviousFuture
                  id={element.id}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
              <div className="info-container">
                <h1>Name: {element.name}</h1>
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
                      <b>dangerous!!</b>{' '}
                      <img
                        className="safe-dangerous-image"
                        alt="Earth holding a save me sign"
                        src={dangerous}
                      ></img>
                    </>
                  ) : (
                    <>
                      <b>not dangerous.</b>{' '}
                      <img
                        className="safe-dangerous-image"
                        alt="Earth is safe"
                        src={safe}
                      ></img>
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
          ))}
        </div>
      </div>
    );
  }
}
