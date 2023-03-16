import meteor from './../../Images/meteor.png';
import './ObjectsDisplay.css';

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
        <div>
          <p>
            {newArray.map((element) => (
              <div>
                <img
                  className="meteor-image"
                  alt="meteor to click on"
                  src={meteor}
                  // onClick={onClick}
                ></img>
                <h1>Name: {element.name}</h1>
                <p>
                  {' '}
                  Maximum diameter:{' '}
                  {
                    element.estimated_diameter.kilometers.estimated_diameter_max
                  }{' '}
                  km
                </p>
                <p>
                  {' '}
                  This element is{' '}
                  <b>
                    {element.is_potentially_hazardous_asteroid
                      ? 'dangerous'
                      : 'not dangerous'}
                  </b>
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
          </p>
        </div>
      </div>
    );
  }
}
