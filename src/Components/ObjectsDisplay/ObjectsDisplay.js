import './ObjectsDisplay.css';
import meteor from './../../Images/meteor.png';
import dangerous from './../../Images/save-me.png';

export default function ObjectsDisplay({ objectsReceived, numberOfElements }) {
  //   function onClick(element) {
  //     alert(
  //       'Maximun diameter in km:',
  //       element.estimated_diameter.kilometers.estimated_diameter_max
  //     );
  //   }
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
        <p>There are {newArray.length} elements found:</p>
        {newArray.map((element) => (
          <div key={element.id}>
            <img
              className="meteor-image"
              alt="Meteor to click on"
              src={meteor}
              // onClick={onClick}
            ></img>
            <h1>Name: {element.name}</h1>
            <p>
              {' '}
              Minimum diameter:{' '}
              {element.estimated_diameter.meters.estimated_diameter_min} m
            </p>
            <p>
              Maximum diameter:{' '}
              {element.estimated_diameter.meters.estimated_diameter_max} m
            </p>
            <p>
              {' '}
              This element is{' '}
              {element.is_potentially_hazardous_asteroid ? (
                <div>
                  <b>dangerous</b>{' '}
                  <img
                    className="dangerous-image"
                    alt="Earth holding a save me sign"
                    src={dangerous}
                  ></img>
                </div>
              ) : (
                'not dangerous'
              )}
              .
            </p>
            <p>
              {' '}
              This element is{' '}
              <b>
                {element.is_sentry_object
                  ? 'sentry object'
                  : 'not a sentry object'}
              </b>
              .
            </p>
          </div>
        ))}
      </div>
    );
  }
}
